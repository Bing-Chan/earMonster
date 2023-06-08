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
| label                 | the value of Radio                   | ^[string] / ^[number] / ^[boolean]       | —       |
| disabled              | whether Radio is disabled            | ^[boolean]                               | false   |
| border                | whether to add a border around Radio | ^[boolean]                               | false   |
| size                  | size of the Radio                    | ^[enum]`'large' \| 'default' \| 'small'` | —       |
| name                  | native `name` attribute              | ^[string]                                | —       |

### 事件

| Name   | Description                           | Type                                                      |
| ------ | ------------------------------------- | --------------------------------------------------------- |
| change | triggers when the bound value changes | ^[Function]`(value: string \| number \| boolean) => void` |

### 插槽

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |