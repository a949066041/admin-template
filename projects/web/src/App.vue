<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { LoginForm } from '@yy-admin/common-core'
import { code, login } from '@yy-admin/common-core'
import { Form, message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { encrypt } from '@yy-admin/common-utils'

const loginForm = ref<LoginForm>({
  username: '',
  password: '',
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
  code().then(({ img, uuid }) => {
    codeImg.value = img
    loginForm.value.uuid = uuid
  })
}

onMounted(handleRefreshImg)

const { validate, validateInfos } = Form.useForm(loginForm, loginRules)
function handleLoadingAction() {
  validate().then(() => {
    login({ ...loginForm.value, password: encrypt(loginForm.value.password) as string }).then(() => {
      message.success('登录成功')
    })
  })
}
</script>

<template>
  <a-form :model="loginForm" w-300px>
    <a-form-item v-bind="validateInfos.username">
      <a-input v-model:value="loginForm.username" placeholder="请输入用户名" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.password">
      <a-input v-model:value="loginForm.password" placeholder="请输入密码" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.code">
      <a-input v-model:value="loginForm.code" placeholder="请输入验证码" />
      <img w-300px :src="codeImg" @click="handleRefreshImg">
    </a-form-item>
    <a-button type="primary" @click="handleLoadingAction">
      登录
    </a-button>
  </a-form>
</template>
