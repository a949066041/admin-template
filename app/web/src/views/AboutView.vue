<script lang="ts" setup>
import { ref } from 'vue';

defineOptions({
  name: "Home",
})

const data = ref(1);

function handleRender(key: string) {
  console.log(key + '' + '');
}

</script>

<template>
  <a-button class=" fixed top-0" @click="data++">test</a-button>
  <a-row :gutter="[20, 20]">
    <a-col :span="12">
      <lazy-box :height="800" title="测试" @render="handleRender" :effect-data="data" name="1">
        hello
      </lazy-box>
    </a-col>
    <a-col :span="12">
      <lazy-box :height="800" title="测试" @render="handleRender" :effect-data="data" name="2">
        hello
      </lazy-box>
    </a-col>
    <a-col :span="12">
      <lazy-box :height="800" title="测试" @render="handleRender" :effect-data="data" name="3">
        hello
      </lazy-box>
    </a-col>
    <a-col :span="12">
      <lazy-box :height="800" title="测试" @render="handleRender" :effect-data="data" name="4">
        hello
      </lazy-box>
    </a-col>
    <a-col :span="12">
      <lazy-box :height="800" title="测试" @render="handleRender" :effect-data="data" name="5">
        hello
      </lazy-box>
    </a-col>
    <a-col :span="12">
      <lazy-box :height="800" title="测试" @render="handleRender" :effect-data="data" name="6">
        hello
      </lazy-box>
    </a-col>
    <a-col :span="12">
      <lazy-box :height="800" title="测试" @render="handleRender" :effect-data="data" name="7">
        hello
      </lazy-box>
    </a-col>
    <a-col :span="12">
      <lazy-box :height="800" title="测试" @render="handleRender"  :effect-data="data" name="8">
        hello
      </lazy-box>
    </a-col>
  </a-row>
</template>
