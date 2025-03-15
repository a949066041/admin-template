<script lang="ts" setup>
import type { AuthCode } from '@yy-admin/common-apis'
import { AuthApi } from '@yy-admin/common-apis'
import { useUserStore } from '@yy-admin/common-core'

defineOptions({
  name: 'LoginStatus',
})

const message = useMessage()
const userStore = useUserStore()
const loginCode = ref<AuthCode & { code?: string }>({
  uuid: '',
  img: '',
  code: '',
})

function handleGetCode() {
  AuthApi.code().then((res) => {
    loginCode.value = res
  })
}

onMounted(handleGetCode)

function handleToLogin() {
  userStore.loginAction({
    username: 'admin',
    password: '123456',
    uuid: loginCode.value.uuid,
    code: loginCode.value.code!,
  }).then(() => {
    userStore.getUserInfo(true).then(() => {
      message.success('登录成功')
    })
  })
}
</script>

<template>
  <div class=" h-12 leading-12 flex justify-end px-2 items-center">
    <n-tag :type="userStore.isLogin ? 'success' : 'error'" class=" mr-2">
      {{ userStore.isLogin ? '已登录' : '未登录' }}
    </n-tag>
    <template v-if="!userStore.isLogin">
      <n-input v-model:value="loginCode.code" class=" !w-[280px]">
        <template #prefix>
          <img :src="loginCode.img" @click="handleGetCode">
        </template>
        <template #suffix>
          <n-button type="primary" @click="handleToLogin">
            授权
          </n-button>
        </template>
      </n-input>
    </template>
    <n-button v-else type="primary" @click="userStore.logout">
      退出
    </n-button>
  </div>
</template>
