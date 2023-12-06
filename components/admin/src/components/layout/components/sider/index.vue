<script lang="ts" setup>
import { useUserStore } from '@yy-admin/common-core'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'YySider',
})

const router = useRouter()
const route = useRoute()

const activePath = ref('')
const userStore = useUserStore()

watch(activePath, (val) => {
  router.push(val)
})

onMounted(() => {
  activePath.value = route.path
})
</script>

<template>
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :native-scrollbar="false"
    class="h-100vh"
  >
    <n-menu
      v-model:value="activePath"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="userStore.userMenuList"
    />
  </n-layout-sider>
</template>
