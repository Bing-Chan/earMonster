import { nextTick } from 'vue';
import type { App } from 'vue';
import * as svg from '@element-plus/icons';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import { SecurityUtils } from '@yto-security/vue3-sdk';
import dayjs from 'dayjs';
import { DateEnum } from './type.ts';
import SysEmpty from '/@/components/empty.vue';

import quarter from '/@/components/quarter.vue';
import Formula from '/@/components/Formula/index.vue';
import Darwer from '/@/components/Darwer.vue';
import reportCard from '/@/components/reportCard.vue';
import IntroStep from '/@/components/intro-step/index.vue';
/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elSvg(app: App) {
	const icons = svg as any;
	for (const i in icons) {
		app.component(`ele-${icons[i].name}`, icons[i]);
	}
	app.component('SvgIcon', SvgIcon);
}

/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elEmpty(app: App) {
	app.component('SysEmpty', SysEmpty);
}

/**
 * 导出全局注册 element plus 季度插件
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elQuarter(app: App) {
	app.component('quarter', quarter);
}

/**
 * 导出全局注册 element plus 季度插件
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elCard(app: App) {
	app.component('reportCard', reportCard);
}

/**
 * 导出全局注册 element plus 抽屉
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elDarwer(app: App) {
	app.component('darwer', Darwer);
}

/**
 * 导出全局注册 element plus 公式插件
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elFormula(app: App) {
	app.component('formula', Formula);
}

/**
 * 新手引导页
 * @param app vue 实例
 * @description  复制vue3-intro-step  后修改
 */
export function elIntroStep(app: App) {
	app.component('introStep', IntroStep);
}

/**
 * 图片懒加载
 * @param el dom 目标元素
 * @param arr 列表数据
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 */
export const lazyImg = (el: any, arr: any) => {
	const io = new IntersectionObserver((res) => {
		res.forEach((v: any) => {
			if (v.isIntersecting) {
				const { img, key } = v.target.dataset;
				v.target.src = img;
				v.target.onload = () => {
					io.unobserve(v.target);
					arr[key]['loading'] = false;
				};
			}
		});
	});
	nextTick(() => {
		document.querySelectorAll(el).forEach((img) => io.observe(img));
	});
};

/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function deepClone(obj: any) {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === 'object') {
			newObj[attr] = deepClone(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}

/**
 * 判断是否是移动端
 */
export function isMobile() {
	if (
		navigator.userAgent.match(
			/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i
		)
	) {
		return true;
	} else {
		return false;
	}
}

/**
 * 判断数组对象中所有属性是否为空，为空则删除当前行对象
 * @param list 数组对象
 * @returns 删除空值后的数组对象
 */
export function handleEmpty(list: any) {
	const arr = [];
	for (const i in list) {
		const d = [];
		for (const j in list[i]) {
			d.push(list[i][j]);
		}
		const leng = d.filter((item) => item === '').length;
		if (leng !== d.length) {
			arr.push(list[i]);
		}
	}
	return arr;
}

export function getQueryType(status: any) {
	let str = '';
	switch (status) {
		case 1:
			str = 'pendtrial';
			break;
		case 2:
			str = 'reviewed';
			break;
		case 3:
			str = 'unread';
			break;
		case 4:
			str = 'read';
			break;
	}
	return str;
}

export function getXCTabType(queryType, { flowStatus, tabStatus, agencyType }) {
	// queryType合法值
	//      0: '待审批',
	//      1: '已审批',
	//      2: '结束',
	//      3: '废弃',
	//      4: '驳回',
	//      5: '草稿',
	//      6: '待阅',
	//      7: '已阅',
	//      8: '撤回',
	//      9: '已反馈'
	// tabstatus  审批人 1 待审  2 已审 3 待阅 4 已阅
	//            申请人 5 申请  6 草稿 3 待阅 4 已阅
	const xcTabStatusMap = {
		// 待办申请单
		create: 'create',
		// 我发起的申请
		myhistory: 'myhistory',
		// 我的草稿单
		drafts: 'drafts',
		// 我的审批申请
		history: 'history',
	};
	var type: any =
		{
			// 待审
			pendtrial: xcTabStatusMap.create,
			// 已审
			reviewed: xcTabStatusMap.history,
			// 申请
			apply: xcTabStatusMap.create,
			// 草稿
			draft: xcTabStatusMap.drafts,
			// 全部
			all() {
				switch (+agencyType) {
					case 1:
						// 审批
						if (+flowStatus === 0 && +tabStatus === 1) {
							//  待审（流程状态）- 待审(筛选状态)
							return xcTabStatusMap.create;
						} else {
							return xcTabStatusMap.history;
						}
					case 2:
						// 申请
						return {
							0: xcTabStatusMap.create,
							2: xcTabStatusMap.myhistory,
							4: xcTabStatusMap.myhistory,
							5: xcTabStatusMap.drafts,
						}[+flowStatus];
					default:
						return '';
				}
			},
		}[queryType] || '';

	return typeof type === 'string' ? type : type();
}

export function getOssfileUrl(filePath: string) {
	// 获取auth 、usercode
	return `hrplatform/file/downLoadGetUrlAuth?filePath=${filePath}&authorization=${SecurityUtils.authorization}&&userCode=${SecurityUtils.userInfo.userCode}`;
}

export function jumpOAUrl(url: string, token: string) {
	// 获取auth 、usercode
	return `${import.meta.env.VITE_OA_URL}&km_url=${url}&token=${token}`;
}

export function getMaxLengthStr(str: string, maxLength: number = 200) {
	if (str.length > maxLength) {
		return str.substring(0, maxLength - 1) + '...';
	}
	return str;
}

export function clearHtml(str: string) {
	var median = str.replace(/<\/?.+?>/g, '');
	return median.replace(/ /g, '').replace(/&nbsp;/g, '');
}

export function getSimpleCheckedNodes(data: any) {
	let checkedNodes = [];
	const traverse = function (node) {
		const childNodes = node.root ? node.root.childNodes : node.childNodes;
		childNodes.forEach((child) => {
			if (child.checked) {
				checkedNodes.push(child.data);
			}
			if (child.indeterminate) {
				traverse(child);
			}
		});
	};
	traverse(data);
	return checkedNodes;
}

export function toDateTimePicker(date: any, type: DateEnum) {
	if (date && date.length > 0 && date[0] != '') {
		switch (type) {
			case DateEnum.START:
				return dayjs(date[0]).format('YYYY-MM-DD 00:00:00');
			case DateEnum.END:
				return dayjs(date[1]).format('YYYY-MM-DD 23:59:59');
		}
	}
	return '';
}

export function toDatePicker(date: any, type: DateEnum, format = 'YYYY-MM-DD') {
	if (date && date.length > 0 && date[0] != '') {
		switch (type) {
			case DateEnum.START:
				return dayjs(date[0]).format(format);
			case DateEnum.END:
				return dayjs(date[1]).format(format);
		}
	}
	return '';
}

export function isImage(filename: string) {
	let ext = getExtName(filename);
	if (['jpg', 'jpeg', 'png', 'gif'].includes(ext.toLocaleLowerCase())) {
		return true;
	}
	return false;
}

export function isFile(filename: string) {
	let ext = getExtName(filename);
	if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext.toLocaleLowerCase())) {
		return true;
	}
	return false;
}

export function getExtName(filename: string) {
	if (filename == '') {
		return '';
	}
	let arr = filename.split('.');
	return arr[arr.length - 1];
}

// 表单组件验证
export const formRulesValidate = (pageRef) => {
	return new Promise((resolve) => {
		if (!pageRef) {
			resolve(true);
		}
		pageRef.validate((valid: boolean) => {
			if (valid) resolve(valid);
		});
	});
};

/**
 * 统一批量导出
 * @method elSvg 导出全局注册 element plus svg 图标
 * @method useTitle 设置浏览器标题国际化
 * @method lazyImg 图片懒加载
 * @method globalComponentSize element plus 全局组件大小
 * @method deepClone 对象深克隆
 * @method isMobile 判断是否是移动端
 * @method handleEmpty 判断数组对象中所有属性是否为空，为空则删除当前行对象
 */
const other = {
	elSvg: (app: App) => {
		elSvg(app);
	},
	deepClone: (obj: any) => {
		deepClone(obj);
	},
	elEmpty: (app: App) => {
		elEmpty(app);
	},
	elDarwer: (app: App) => {
		elDarwer(app);
	},
	elQuarter: (app: App) => {
		elQuarter(app);
	},
	elCard: (app: App) => {
		elCard(app);
	},
	elFormula: (app: App) => {
		elFormula(app);
	},
	elIntroStep: (app: App) => {
		elIntroStep(app);
	},
	isMobile: () => {
		return isMobile();
	},
	handleEmpty: (list: any) => {
		return handleEmpty(list);
	},
};

/***
 * 转换base64
 */
export function getBase6File(str: any) {
	return 'data:image/Jpeg;base64,' + str;
}

/***
 * 转换base64
 */
export function getTagStyle(val: any) {
	switch (val) {
		case 'assessment':
			return 'success';
		case 'reject':
			return 'danger';
		case 'result':
			return 'info';
	}
}

/***
 * 状态
 */
export function getState(val: any) {
	switch (val) {
		case 1:
			return '启用';
		case 0:
			return '禁用';
	}
}

/***
 * 算分方式
 */
export function getQuanZhong(val: any) {
	switch (val) {
		case 1:
			return '权重';
		case 2:
			return '非权重';
	}
}

/***
 * 算分方式
 */
export function isEmpty(val: any) {
	if (val == null || val == 'undefined') {
		return '';
	}
	return val;
}

/***
 * 取差集
 */
export function getNotArr(arr1: any, arr2) {
	const set1 = new Set(arr1);
	const set2 = new Set(arr2);
	// 然后分别取出set1中存在，set2中不存在 和 set2中存在，set1中不存在的值
	const newArr1 = [...set1].filter((item) => {
		return !set2.has(item);
	});
	const newArr2 = [...set2].filter((item) => {
		return !set1.has(item);
	});
	// 再将得到的两个新数组合并，就能得到差集了
	return [...newArr1, ...newArr2];
}

// 统一批量导出
export default other;
