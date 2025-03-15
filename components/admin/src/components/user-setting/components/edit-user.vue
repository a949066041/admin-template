<script lang="ts" setup>
import type { EditUserData } from '@yy-admin/common-apis'
import type { NaiveFormRules } from '@yy-admin/components-naive'
import { UserApi } from '@yy-admin/common-apis'
import { initFormObj, useCurdForm, useUserStore } from '@yy-admin/common-core'
import { isValidPhone } from '@yy-admin/common-utils'
import { onMounted, ref } from 'vue'
import { YyDictSelect } from '../../dict/index'

defineOptions({
  name: 'EditUser',
})

const userStore = useUserStore()
function initResetPwdForm() {
  return initFormObj(['nickName', 'gender', 'phone', 'id'] as const) as EditUserData
}

const { formModel, handleInitForm, saveLoading, handleSaveForm, formRef } = useCurdForm<EditUserData>({
  initFormFn: initResetPwdForm,
  saveAction: data => UserApi.editUser(data),
  afterSave() {
    userStore.getUserInfo(true)
    saveLoading.value = false
  },
})

const rules = ref<NaiveFormRules<ReturnType<typeof initResetPwdForm>>>({
  nickName: [
    { required: true, message: '请输入用户昵称', trigger: 'change' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'change' },
  ],
  phone: [
    {
      required: true,
      trigger: 'change',
      validator(_rule, value) {
        if (!value)
          return new Error('请输入电话号码')

        else if (!isValidPhone(value))
          return new Error('请输入正确的11位手机号码')

        else
          return true
      },
    },
  ],
})

onMounted(() => handleInitForm({
  id: userStore.userValue?.id,
  nickName: userStore.userValue!.nickName,
  gender: userStore.userValue!.gender,
  phone: userStore.userValue!.phone,
}))
</script>

<template>
  <n-form ref="formRef" :model="formModel" :rules="rules">
    <n-form-item path="nickName" label="昵称">
      <n-input v-model:value="formModel.nickName" placeholder="请输入昵称" class=" !w-[300px] mr-2" />
      <span class=" text-sm text-gray whitespace-nowrap">用户昵称不作为登录使用</span>
    </n-form-item>
    <n-form-item path="phone" label="电话">
      <n-input v-model:value="formModel.phone" placeholder="请输入电话" class=" !w-[300px] mr-2" />
      <span class=" text-sm text-gray whitespace-nowrap">手机号码不能重复</span>
    </n-form-item>
    <n-form-item path="gender" label="性别">
      <YyDictSelect v-model:value="formModel.gender" type="radio" dict="sex_status" />
    </n-form-item>
    <n-button type="primary" size="small" :loading="saveLoading" @click="handleSaveForm">
      保存配置
    </n-button>
  </n-form>
</template>
