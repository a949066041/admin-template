<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAnimate, useToggle } from '@vueuse/core'
import type { LoginForm } from '@yy-admin/common-apis'
import { AuthApi } from '@yy-admin/common-apis'
import { useUserStore } from '@yy-admin/common-core'
import type { FormInst, FormItemRule } from 'naive-ui'
import { encrypt } from '@yy-admin/common-utils'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Login',
})

const form = ref<FormInst | null>()
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
const loginRules = ref<{ [P in keyof Partial<LoginForm>]: FormItemRule[] }>({
  username: [
    { message: '请输入用户名', required: true },
  ],
  password: [
    { required: true, message: '请输入密码' },
  ],
  code: [
    { required: true, message: '请输入验证码' },
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

const [loginLoading, toggleLoading] = useToggle()
function handleLoadingAction() {
  form.value?.validate(async (err) => {
    if (!err) {
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
    }
  })
}
</script>

<template>
  <div ref="section" mx-auto mt20vh rounded-10 w-900px overflow-hidden py8 px10 bg-light-2 shadow-xl>
    <section flex h-400px>
      <img src="./login.png" class=" w-1/2">
      <n-form
        ref="form" class="flex flex-col justify-evenly  !ml-4  w-1/2 px-4"
        label-align="top" layout="vertical" :model="loginForm" :rules="loginRules" ml5 flex-1 @submit="handleLoadingAction"
      >
        <h1 mb0>
          用户登录
        </h1>
        <n-form-item label="用户名" prop="username">
          <n-input v-model:value="loginForm.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" prop="password">
          <n-input v-model:value="loginForm.password" type="password" show-password-on="mousedown" placeholder="请输入密码" />
        </n-form-item>
        <n-form-item label="验证码" prop="code">
          <n-grid>
            <n-gi :span="18">
              <n-input v-model:value="loginForm.code" placeholder="请输入验证码" @keyup.enter="handleLoadingAction" />
            </n-gi>
            <n-gi :span="6">
              <img class="w-full h-32px cursor-pointer" :src="codeImg" alt="code" @click="handleRefreshImg">
            </n-gi>
          </n-grid>
        </n-form-item>
        <n-button type="primary" :loading="loginLoading" block @click="handleLoadingAction">
          登录
        </n-button>
      </n-form>
    </section>
  </div>
</template>
