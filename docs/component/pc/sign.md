# 电子签名
web签名插件

## 基础用法
点击按钮开始步骤页

:::demo
sign/basic
:::

##  线条颜色
选择下拉列表设置颜色

:::demo
sign/color
:::


### 属性

| Name                  | Description                          | Type                                     | Default |
| --------------------- | ------------------------------------ | ---------------------------------------- | ------- |
|strokeColor|画笔线条颜色     | ^[enum]`'#000' \| '#333' \| '#666'`      | #333  | 
|width	 	|画布宽度         | ^[string] / ^[number]                    | 500	 |
|height	 	|画布高度         | ^[string] / ^[number]                    | 200   |
|lineWidth	|线条宽度         | ^[string] / ^[number]                    | 200   |
|bgColor	|背景宽度         |  ^[enum]`'#000' \| '#333' \| '#666'`     | #fff  |
|showBtn    |是否显示清空按钮 |  ^[boolean]                              | true  |






### 事件

| Name   | Description                           | Type                                                      |
| ------ | ------------------------------------- | --------------------------------------------------------- |
| onSave |  保存图片事件 | ^[Function]`(blob:blob) => void` |

### 插槽

| Name    | Description               |
| ------- | ------------------------- |
| btn | 按钮插槽 |
