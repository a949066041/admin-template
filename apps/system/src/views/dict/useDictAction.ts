import type { IDictRecord } from '@yy-admin/common-apis'

export function useDictAction() {
  const dictName = ref<string>('')
  const dictId = ref<number | null>(null)

  function handleConfigDict(record: IDictRecord) {
    dictName.value = record.name
    dictId.value = record.id
  }

  return {
    handleConfigDict,
    dictName,
    dictId,
  }
}
