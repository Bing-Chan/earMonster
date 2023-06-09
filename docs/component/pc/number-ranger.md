# 区间选择
数字范围区间选择

## 基础用法
点击输入框显示浮动层选择数字

:::demo
number-ranger/basic
:::


### 属性

| Name                  | Description                          | Type                                     | Default |
| --------------------- | ------------------------------------ | ---------------------------------------- | ------- |
| model-value / v-model | binding value                        | ^[string] / ^[number] / ^[boolean]       | —       |
| placeholder           | 提示文字                  | ^[string]       | —       |
| row              | 绑定扩展信息           | ^[string]                               | {}   |
| isOpen                | 是否需要打开选择框 | ^[boolean]                               | true                             | —       |

### 事件

| Name   | Description                           | Type                                                      |
| ------ | ------------------------------------- | --------------------------------------------------------- |
| complete | 选择区间完成事件 | ^[Function]`({ row:object,selected:object}) => void` |

### 插槽

| Name    | Description               |
| ------- | ------------------------- |
| — | — |
