# 步骤器

## 基础用法
加减数字

:::demo
stepper/basic
:::


### 属性

| Name                  | Description                          | Type                                     | Default |
| --------------------- | ------------------------------------ | ---------------------------------------- | ------- |
|	placeholder	 | 提示文字   | ^[string]      | 请填写	|
|	modelValue	 | 绑定值   | ^[Array]      | []	|
|	row	 | 当前行  | ^[object]     | {}	|
|	isOpen	 | 是否打开  | ^[boolean]      | true	|



### 事件

| Name   | Description                           | Type                                                      |
| ------ | ------------------------------------- | --------------------------------------------------------- |
| complete | 选择区间完成事件 | ^[Function]`({ row:object,selected:object}) => void` |
| open | 打开事件 | ^[Function]`() => void` |

### 插槽

| Name    | Description               |
| ------- | ------------------------- |
| — | — |
