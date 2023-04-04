# 引导页
新手引导提示步骤框

## 基础用法
点击按钮开始步骤页

:::demo
introStep/basic
:::

## 浮动框定位
点击按钮开始步骤页

:::demo
introStep/position
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
