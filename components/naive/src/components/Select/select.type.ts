const OF_KEY = 'id'
const OF_VALUE = 'name'

export const commonProps = {
  filterable: true,
  labelField: OF_VALUE,
}

export const selectProps = {
  valueField: OF_KEY,
  ...commonProps,
}

export const treeSelectProps = {
  keyField: OF_KEY,
  ...commonProps,
}
