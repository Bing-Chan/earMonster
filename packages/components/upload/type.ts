export const buttonType = ['default', 'primary', 'success', 'warning', 'info', 'danger', 'text', '']

export const buttonProps = {
	// 域，上传文件name，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
	field: {
		type: String,
		default: 'avatar',
	},
	// 类似于id，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
	ki: {
		default: 0,
	},
	// 显示该控件与否
	value: {
		twoWay: true,
		default: true,
	},
	// 上传地址
	url: {
		type: String,
		default: '',
	},
	// 其他要上传文件附带的数据，对象格式
	params: {
		type: Object,
		default: null,
	},
	//Add custom headers
	headers: {
		type: Object,
		default: null,
	},
	// 剪裁图片的宽
	width: {
		type: Number,
		default: 200,
	},
	// 剪裁图片的高
	height: {
		type: Number,
		default: 200,
	},
	// 不显示旋转功能
	noRotate: {
		type: Boolean,
		default: true,
	},
	// 不预览圆形图片
	noCircle: {
		type: Boolean,
		default: false,
	},
	// 不预览方形图片
	noSquare: {
		type: Boolean,
		default: false,
	},
	// 单文件大小限制
	maxSize: {
		type: Number,
		default: 10240,
	},
	// 语言类型
	langType: {
		type: String,
		default: 'zh',
	},
	// 语言包
	langExt: {
		type: Object,
		default: null,
	},
	// 图片上传格式
	imgFormat: {
		type: String,
		default: 'png',
	},
	// 图片背景 jpg情况下生效
	imgBgc: {
		type: String,
		default: '#fff',
	},
	// 是否支持跨域
	withCredentials: {
		type: Boolean,
		default: false,
	},
	method: {
		type: String,
		default: 'POST',
	},
}

export const buttonEmits = {
	click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
