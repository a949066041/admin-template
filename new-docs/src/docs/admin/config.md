# config

## AppConfig

全局组件配置使用AppConfig包裹，保证组件配置在全局生效
- 可扩展主题
- 统一全局规范
- 黑暗 明亮主题
<demo src="admin/config/demo.vue" />

## message dialog loading

由于方法可能在非setup中使用，全局方法使用`useAppConfigStore`进行开发。详情看[文档]([/docs/message](https://www.naiveui.com/zh-CN/os-theme/components/discrete))
<demo src="admin/config/demo2.vue" />

## API

### 属性

| 名称  | 说明     | 类型   | 默认值 |
| ----- | -------- | ------ | ------ |
| title | 项目标题 | string | null   |
