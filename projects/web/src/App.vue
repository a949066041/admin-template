<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { LoginForm } from '@yy-admin/common-core'
import { code, login } from '@yy-admin/common-core'
import { message } from 'ant-design-vue'
import { encrypt } from '@yy-admin/common-utils'

const loginForm = ref<LoginForm>({
  username: '',
  password: '',
  code: '',
  uuid: '',
})
const codeImg = ref('')

function handleRefreshImg() {
  code().then(({ img, uuid }) => {
    codeImg.value = img
    loginForm.value.uuid = uuid
  })
}

onMounted(handleRefreshImg)

function handleLoadingAction() {
  login({ ...loginForm.value, password: encrypt(loginForm.value.password) as string }).then(() => {
    message.success('登录成功')
  })
}
</script>

<template>
  <a-form w-300px>
    <a-input v-model:value="loginForm.username" placeholder="请输入用户名" />
    <a-input v-model:value="loginForm.password" placeholder="请输入密码" />
    <a-input v-model:value="loginForm.code" placeholder="请输入验证码" />
    <img w-300px :src="codeImg" @click="handleRefreshImg">
    <a-button type="primary" @click="handleLoadingAction">
      登录
    </a-button>
  </a-form>
</template>
