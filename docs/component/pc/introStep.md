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
|	config	 | 提示文字   | ^[object]      | 	|
|	show	 |  是否显示  | ^[boolean]      | false	|



### 事件

| Name   | Description                           | Type                                                      |
| ------ | ------------------------------------- | --------------------------------------------------------- |
| change | triggers when the bound value changes | ^[Function]`(value: string \| number \| boolean) => void` |

### 插槽

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |
