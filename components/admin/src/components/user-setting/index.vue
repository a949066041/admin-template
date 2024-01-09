<script lang="ts" setup>
import { UserApi } from '@yy-admin/common-apis'
import { useUserStore } from '@yy-admin/common-core'
import { computed, ref } from 'vue'
import { useAppConfigStore } from '../app-config/config'
import UserResetPwd from './components/reset-pwd.vue'
import EditUser from './components/edit-user.vue'
import UserLog from './components/user-log.vue'

defineOptions({
  name: 'UserSetting',
})

const { message } = useAppConfigStore()
const userResetPwd = ref<InstanceType<typeof UserResetPwd> | null>(null)
const userStore = useUserStore()
const infoList = computed(() => userStore.userValue
  ? [
      {
        label: '登录账号',
        value: userStore.userValue.username,
        icon: 'login',
      },
      {
        label: '用户昵称',
        value: userStore.userValue.nickName,
        icon: 'user1',
      },
      {
        label: '所属部门',
        value: userStore.userValue.phone,
        icon: 'dept',
      },
      {
        label: '手机号',
        value: userStore.userValue.phone,
        icon: 'phone',
      },
      {
        label: '用户邮箱',
        value: userStore.userValue.email,
        icon: 'email',
      },
      {
        label: '安全设置',
        value: [{ key: 'resetPwd', name: '修改密码' }],
        icon: 'anq',
      },
    ]
  : null)

function handleUploadAvatar(file: File, cb: (value: number) => void) {
  return UserApi.updateAvatar(file, cb).then(() => {
    message.success('上传成功')
    userStore.getUserInfo(true)
  })
}

function handleActionUserClick(key: string) {
  if (key === 'resetPwd')
    userResetPwd.value?.handleOpenModal()
}
</script>

<template>
  <n-grid :x-gap="12">
    <n-gi :span="6">
      <n-card
        title="个人信息"
        :segmented="{
          content: true,
          footer: 'soft',
        }"
      >
        <div class=" flex justify-center flex-col">
          <BaseUpload :action="handleUploadAvatar" class="  self-center">
            <template #default="{ open }">
              <n-avatar :size="88" :src="userStore.avatar" round alt="上传头像" class=" cursor-pointer" @click="open" />
            </template>
          </BaseUpload>
          <ul class="m-0 p-0">
            <li v-for="item of infoList" :key="item.icon" class=" list-none flex justify-between py-2 border-b-solid dark:border-b-dark border-b-gray-1  items-center text-sm">
              <div class=" flex items-center">
                <i :class="`i-custom:${item.icon}`" class=" w-4 h-4 flex text-gray-400 mr-1" />
                <span>{{ item.label }}</span>
              </div>
              <span v-if="Array.isArray(item.value)">
                <n-button v-for="btn of item.value" :key="btn.key" type="primary" quaternary @click="handleActionUserClick(btn.key)">{{ btn.name }}</n-button>
              </span>
              <span v-else>{{ item.value }}</span>
            </li>
          </ul>
        </div>
      </n-card>
    </n-gi>
    <n-gi :span="18">
      <n-card>
        <n-tabs type="line" animated>
          <n-tab-pane name="user" tab="用户资料">
            <EditUser />
          </n-tab-pane>
          <n-tab-pane name="log" tab="操作日志">
            <UserLog />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-gi>
  </n-grid>
  <UserResetPwd ref="userResetPwd" />
</template>
