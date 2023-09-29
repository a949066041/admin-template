<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAnimate, useToggle } from '@vueuse/core'
import type { LoginForm } from '@yy-admin/apis'
import { AuthApi } from '@yy-admin/apis'
import { useUserStore } from '@yy-admin/common-core'
import { Form } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { encrypt } from '@yy-admin/common-utils'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Login',
})

const keyframes = ref([
  { transform: 'translateX(-100%) scale(0.1)' },
  { transform: 'translateX(0) scale(1)' },
])

const section = ref<HTMLElement | null>(null)
useAnimate(section, keyframes, 800)
const router = useRouter()
const loginForm = ref<LoginForm>({
  username: 'admin',
  password: '123456',
  code: '',
  uuid: '',
})
const loginRules = ref<{ [P in keyof Partial<LoginForm>]: Rule[] }>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'change' },
  ],
})
const codeImg = ref('')

function handleRefreshImg() {
  AuthApi.code().then(({ img, uuid }) => {
    codeImg.value = img
    loginForm.value.uuid = uuid
  })
}

onMounted(handleRefreshImg)

const { validate, validateInfos } = Form.useForm(loginForm, loginRules)
const [loginLoading, toggleLoading] = useToggle()
function handleLoadingAction() {
  validate().then(async () => {
    toggleLoading(true)
    try {
      const userStore = useUserStore()
      await userStore.loginAction({ ...loginForm.value, password: encrypt(loginForm.value.password) as string })
      router.push('/')
    }
    catch {
      handleRefreshImg()
      toggleLoading(false)
    }
  })
}
</script>

<template>
  <div ref="section" mx-auto mt20vh rounded-10 w-800px overflow-hidden py8 px10 bg-light-2 shadow-xl>
    <section flex h-400px>
      <img src="./login.png" h-full>
      <a-form flex flex-col justify-evenly layout="vertical" :model="loginForm" ml5 flex-1 @submit="handleLoadingAction">
        <h1 mb0>
          用户登录
        </h1>
        <a-form-item v-bind="validateInfos.username" label="用户名">
          <a-input v-model:value="loginForm.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item v-bind="validateInfos.password" label="密码">
          <a-input-password v-model:value="loginForm.password" type="password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item v-bind="validateInfos.code" label="验证码">
          <a-row :gutter="10">
            <a-col :span="18">
              <a-input v-model:value="loginForm.code" placeholder="请输入验证码" @keyup.enter="handleLoadingAction" />
            </a-col>
            <a-col :span="6">
              <img w-full h-32px :src="codeImg" @click="handleRefreshImg">
            </a-col>
          </a-row>
        </a-form-item>
        <a-button type="primary" :loading="loginLoading" block @click="handleLoadingAction">
          登录
        </a-button>
      </a-form>
    </section>
  </div>
</template>
