<script lang="ts" setup>
import { initFormObj, useCurdForm, useUserStore } from '@yy-admin/common-core'
import type { NaiveFormRules } from '@yy-admin/components-naive'
import type { IResetPwdData } from '@yy-admin/common-apis'
import { UserApi } from '@yy-admin/common-apis'
import { encrypt } from '@yy-admin/common-utils'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

defineOptions({
  name: 'UserResetPwd',
})

const message = useMessage()
const userStore = useUserStore()
const router = useRouter()

function initResetPwdForm() {
  return initFormObj(['oldPass', 'newPass', 'confirmPass'] as const) as IResetPwdData
}

const { formModel, visible, handleInitForm, saveLoading, handleSaveForm, formRef } = useCurdForm<IResetPwdData>({
  initFormFn: initResetPwdForm,
  saveAction: UserApi.updatePassword,
  beforeSave(saveData) {
    return {
      newPass: encrypt(saveData.newPass),
      oldPass: encrypt(saveData.oldPass),
    }
  },
  afterSave() {
    message.success('密码修改成功，请重新登录', {
      duration: 1500,
      onAfterLeave() {
        userStore.logout().then(() => {
          router.push('/login')
        })
      },
    })
  },
})

const rules = ref<NaiveFormRules<ReturnType<typeof initResetPwdForm>>>({
  oldPass: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
  ],
  newPass: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  confirmPass: [
    {
      required: true,
      trigger: 'blur',
      validator() {
        if (formModel.value.newPass !== formModel.value.confirmPass)
          return new Error('两次输入的密码不一致')
        return true
      },
    },
  ],
})

defineExpose({
  handleOpenModal() {
    handleInitForm()
  },
})
</script>

<template>
  <YyModal v-model:visible="visible" title="修改密码" :confirm-loading="saveLoading" @ok="handleSaveForm">
    <n-form ref="formRef" :model="formModel" :rules="rules">
      <n-form-item path="oldPass" label="旧密码">
        <n-input v-model:value="formModel.oldPass" :input-props="{ 'auto-complete': false }" placeholder="请输入旧密码" type="password" />
      </n-form-item>
      <n-form-item path="newPass" label="新密码">
        <n-input v-model:value="formModel.newPass" :input-props="{ 'auto-complete': false }" placeholder="请输入新密码" type="password" />
      </n-form-item>
      <n-form-item path="confirmPass" label="确认密码">
        <n-input v-model:value="formModel.confirmPass" :input-props="{ 'auto-complete': false }" placeholder="请输入确认密码" type="password" />
      </n-form-item>
    </n-form>
  </YyModal>
</template>
