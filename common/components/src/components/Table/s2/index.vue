<script lang="ts" setup>
import { useResizeObserver } from "@vueuse/core"
import { PivotSheet, DataCell } from '@antv/s2';
import { type YyTableColumns } from '../../../utils/table'
import { onMounted, ref, computed, watch, nextTick } from 'vue'

const container = ref<HTMLElement | null>(null)
const props = withDefaults(defineProps<{ columns: YyTableColumns<string>[]; dataSource: any[] }>(), {})
let s2: PivotSheet | null = null

const meta = computed(() => props.columns.map((item) => ({ field: item.dataIndex, name: item.title as string })))

useResizeObserver(container, ([entry]) => {
  const [size] = entry.borderBoxSize || [];
  if (s2) {
    s2.changeSheetSize(size.inlineSize, size.blockSize)
    s2.render()
  }
})

class CustomDataCell extends DataCell {
  getBackgroundColor() {
    // 特定数据
    if (this.meta.fieldValue >= 6000) {
      return {
        backgroundColor: 'red',
        backgroundColorOpacity: 0.2,
      };
    }

    return super.getBackgroundColor();
  }

  getTextStyle() {
    const defaultTextStyle = super.getTextStyle();

    // 指定列
    if (this.meta.rowIndex % 2 === 0) {
      return {
        ...defaultTextStyle,
        fontSize: 16,
        fill: '#396',
        textAlign: 'left',
      };
    }

    // 指定数据
    if (this.meta.fieldValue >= 600) {
      return {
        ...defaultTextStyle,
        fontSize: 14,
        fontWeight: 700,
        fill: '#f63',
        textAlign: 'center',
      };
    }

    // 指定单元格
    if (
      this.meta.id === 'root[&]四川省[&]乐山市-root[&]办公用品[&]纸张[&]number'
    ) {
      return {
        ...defaultTextStyle,
        fontSize: 12,
        fontWeight: 200,
        fill: '#dcdcdc',
        opacity: 0.9,
        textAlign: 'right',
      };
    }

    // 使用默认处理
    return super.getTextStyle();
  }
}

function createS2() {
  if (!s2) {
    s2 = new PivotSheet(container.value, {
      data: props.dataSource, meta: meta.value, fields: { rows: props.columns.map((item) => item.dataIndex) }
    }, {
      // dataCell: (viewMeta) => {
      //   return new CustomDataCell(viewMeta);
      // },
    });
  }
  console.log({
    data: props.dataSource, meta: meta.value, fields: { columns: props.columns.map((item) => item.dataIndex) }
  })
  s2.setDataCfg({
    data: props.dataSource, meta: meta.value, fields: { columns: props.columns.map((item) => item.dataIndex) }
  })
  s2.render();
}

watch([() => props.columns, () => props.dataSource], () => {
  nextTick(createS2)
}, { immediate: true })

defineOptions({
  name: 'S2Table',
})
</script>

<template>
  <div class="w-full" ref="container"></div>
</template>
