<template>
	<el-select
		v-if="isLoadAll"
		filterable
		clearable
		v-model="keyWord"
		:placeholder="placeholder"
		style="width: 100%"
		:loading="loading"
		@change="handleChange"
	>
		<el-option v-for="item in options" :key="item.value" :label="item.value" :value="item">{{ item.label }}</el-option>
	</el-select>
	<el-select
		v-else
		v-model="keyWord"
		filterable
		remote
		clearable
		reserve-keyword
		:placeholder="placeholder"
		remote-show-suffix
		style="width: 100%"
		:remote-method="remoteMethod"
		:loading="loading"
		@change="handleChange"
	>
		<el-option v-for="item in options" :key="item.value" :label="item.value" :value="item">{{ item.label }}</el-option>
	</el-select>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted, PropType, watchEffect } from 'vue';
import { searchCompany, searchDept, searchPerson, searchPersonAndCompany } from '/@/api/org/index.ts';
import { searchUnit, searchIndicator } from '/@/api/baseConfig/index.ts';
import { searchQutotalLibrary, searchParamLibrary, searchQutoLibrary } from '/@/api/indicatorsLibrary/index.ts';
import { getTemplateList } from '/@/api/templateConfig/index.ts';
import { SearchEnum } from '/@/enums/Search.ts';

interface ListItem {
	value: string;
	label: string;
}

export default defineComponent({
	name: 'Search',
	props: {
		// 选择的节点
		controlType: {
			type: Object as PropType<SearchEnum>,
			default() {
				return SearchEnum.DEPARTMENT;
			},
		},
		// 是否多选
		multiple: {
			type: Boolean,
			default() {
				return false; //Dept,Person,Company
			},
		},
		orgCode: {
			type: String,
			default() {
				return '1001'; //Dept,Person,Company
			},
		},
		isTiltleAndCode: {
			type: Boolean,
			default() {
				return false; //Dept,Person,Company
			},
		},
		queryData: {
			type: Object,
			default() {
				return {}; //Dept,Person,Company
			},
		},
		isDanwei: {
			type: Boolean,
			default() {
				return false; //Dept,Person,Company
			},
		},
		isCaoZuo: {
			type: Boolean,
			default() {
				return true; //Dept,Person,Company
			},
		},
		// 适用对象，suitableFilterFlag=true时起效
		suitableCode: {
			type: String,
			default: '',
		},
		// 是否需要根据适用对象过滤
		suitableFilterFlag: {
			type: Boolean,
			default: false,
		},
		// 是否需要加载全部
		isLoadAll: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const options = ref<ListItem[]>([]);
		const loading = ref(false);

		const state = reactive({
			keyWord: [],
			placeholder: '',
			resultData: [],
			controlType: props.controlType,
			orgCode: props.orgCode,
			isCaoZuo: props.isCaoZuo,
			isLoadAll: props.isLoadAll,
			multiple: props.multiple,
		});

		const remoteMethod = (query: string) => {
			let timer;
			clearTimeout(timer);
			// if (query || state.controlType == SearchEnum.DEPARTMENT) {
			// loading.value = true;
			timer = setTimeout(async () => {
				console.log(`get${state.controlType}("${query ?? ''}")`);
				eval(`get${state.controlType}("${query ?? ''}")`);
			}, 500);
			// } else {
			// 	options.value = [];
			// }
		};

		const getPerson = async (query) => {
			const res = props.isDanwei
				? await searchPersonAndCompany({
						searchStr: query,
				  })
				: await searchPerson({
						psnCode: query,
				  });
			toBindList({
				status: 0,
				data: res.data.map((x: Object) => {
					return {
						orgCode: props.isDanwei ? x.orgCode : x.psncode,
						orgName: props.isDanwei ? x.orgName : x.psnname,
						item: x,
					};
				}),
			});
		};

		const getDepartment = async (query) => {
			const res = await searchDept({
				searchStr: query,
				orgCode: state.orgCode,
			});
			toBindList(res);
		};

		const getCompany = async (query) => {
			if (state.isLoadAll) {
				getCompanyAll(query);
			} else {
				getCompanyRemote(query);
			}
		};

		const getCompanyRemote = async (query) => {
			const res = await searchCompany({
				orgCode: state.orgCode,
				searchStr: query,
			});
			toBindList(res);
		};

		const getCompanyAll = async (query) => {
			const res = await searchUnit(query);
			toBindList({
				status: 0,
				data: res.data.map((x: Object) => {
					return {
						orgCode: x.unitName,
						orgName: x.unitName,
						item: x,
					};
				}),
			});
		};

		// 搜索指标
		const getZhibiao = async (query) => {
			const res = await searchQutotalLibrary({
				jobType: state.isCaoZuo ? 1 : 2,
				quotaName: query,
				suitableCode: props.suitableCode,
				suitableFilterFlag: props.suitableFilterFlag,
			});

			toBindList({
				status: 0,
				data: res.data.map((x: Object) => {
					return {
						orgCode: x.id,
						orgName: x.quotaName,
						desc: x.description,
						typeId: x.quotaTypeId,
						item: x,
						shiftFlag: x.shiftFlag,
					};
				}),
			});
		};

		const getZhibiaoForRes = async (query) => {
			if (state.isLoadAll) {
				getZhibiaoAll();
			} else {
				getZhibiaoRemote(query);
			}
		};

		const getZhibiaoRemote = async (query) => {
			const res = await searchQutoLibrary({
				quotaName: query,
			});
			toBindList({
				status: 0,
				data: res.data.map((x: Object) => {
					return {
						orgCode: x.id,
						orgName: x.quotaName,
						desc: x.description,
						typeId: x.quotaTypeId,
						item: x,
						shiftFlag: x.shiftFlag,
					};
				}),
			});
		};

		const getZhibiaoAll = async () => {
			const res = await searchIndicator(state.isCaoZuo ? 1 : 2);
			toBindList({
				status: 0,
				data: res.data.map((x: Object) => {
					return {
						orgCode: x,
						orgName: x,
						item: x,
					};
				}),
			});
		};

		watchEffect(() => {
			state.isCaoZuo = props.isCaoZuo;
			state.isLoadAll = props.isLoadAll;
			state.multiple = props.multiple;
		});

		// 搜索参数
		const getParam = async (query) => {
			if (state.isLoadAll) {
				getParamAll(query);
			} else {
				getParamRemote(query);
			}
		};

		// 搜索参数
		const getParamRemote = async (query) => {
			const res = await searchParamLibrary({
				jobType: state.isCaoZuo ? 1 : 2,
				paramName: query,
			});

			toBindList({
				status: 0,
				data: res.data.paramLibrarySearchByNameResList.map((x: Object) => {
					return {
						orgCode: x.id,
						orgName: x.paramName,
						desc: x.description,
						typeId: x.quotaTypeId,
						item: x,
						shiftFlag: x.shiftFlag,
					};
				}),
			});
		};

		// 搜索参数
		const getParamAll = async (query) => {
			const res = await searchParamLibrary({
				jobType: state.isCaoZuo ? 1 : 2,
				paramName: query,
			});

			toBindList({
				status: 0,
				data: res.data.paramLibrarySearchByNameResList.map((x: Object) => {
					return {
						orgCode: x.paramName,
						orgName: x.paramName,
					};
				}),
			});
		};

		const getTemplate = async (query) => {
			const res = await getTemplateList({
				pageSize: 30,
				pageNum: 1,
				templateNameOrCode: query,
				templateState: 1,
				...props.queryData,
			});

			toBindList({
				status: 0,
				data: res.data.resultData.map((x: Object) => {
					return {
						orgCode: x.templateCode,
						orgName: x.templateName,
						id: x.id,
						jobType: x.jobType,
					};
				}),
			});
		};

		const toBindList = (res) => {
			if (res.status == 0) {
				options.value = res.data.map((x) => {
					let desc = x.desc;
					let label = x.orgName;
					if (state.controlType == SearchEnum.PERSON) {
						label = x.orgName + '-' + x.orgCode;
						desc = x.orgName;
					}
					return { value: x.orgCode, label: label, desc: desc, id: x.id, typeId: x.typeId, item: x.item, jobType: x.jobType, shiftFlag: x.shiftFlag };
				});
			}
			loading.value = false;
		};

		const setControlType = (type, orgCode) => {
			state.controlType = type;
			state.orgCode = orgCode;
			switch (state.controlType) {
				case SearchEnum.DEPARTMENT:
					state.placeholder = '请输入部门名称';
					break;
				case SearchEnum.PERSON:
					state.placeholder = '请输入人员工号';
					break;
				case SearchEnum.COMPANY:
					state.placeholder = '请输入单位名称';
					break;
				case SearchEnum.ZHIBIAO:
					state.placeholder = '请输入指标名称';
					break;
				case SearchEnum.TEMPLATE:
					state.placeholder = '请输入考核模板名称';
					break;
				case SearchEnum.PARAM:
					state.placeholder = '请输入参数名称';
					break;
			}
		};

		onMounted(() => {
			switch (state.controlType) {
				case SearchEnum.DEPARTMENT:
					state.placeholder = '请输入部门名称';
					break;
				case SearchEnum.PERSON:
					state.placeholder = '请输入人员姓名/工号';
					break;
				case SearchEnum.COMPANY:
					state.placeholder = '请输入单位名称';
					break;
				case SearchEnum.ZHIBIAO:
					state.placeholder = '请输入指标名称';
					break;
				case SearchEnum.TEMPLATE:
					state.placeholder = '请输入考核模板名称';
			}
			// 默认加载全部
			if (state.isLoadAll) {
				setTimeout(async () => {
					eval(`get${state.controlType}("")`);
				}, 300);
			}
		});

		const handleChange = (val: any) => {
			state.keyWord = val.orgName;
			emit('change', val);
		};

		return {
			...toRefs(state),
			remoteMethod,
			loading,
			options,
			getCompany,
			getDepartment,
			getPerson,
			getZhibiao,
			getZhibiaoForRes,
			handleChange,
			getTemplate,
			setControlType,
			getParam,
		};
	},
});
</script>
<style lang="scss" scoped>
.org-dialog-search {
	width: 50%;
	height: 40px;
	padding: 0px 10px;
}
.org-dialog {
	display: flex;
	justify-content: space-between;
	padding: 0px 10px;
	height: 378px;
	&-right,
	&-left {
		padding: 0 10px;
		font-size: 16px;
		width: 50%;
	}

	&-right {
		border-left: solid 1px #eeeeee;
		&-checkList {
			background: #f4f6f8;
			text-align: left;
			font-size: 14px;
			height: 330px;
		}
	}

	&-left {
		&-list {
			padding: 10px;
			background: #f4f6f8;
			height: 330px;
		}

		&-filter {
			height: 35px;
			width: 100%;
			display: flex;
			align-items: center;
			&-btn {
				width: 110px;
				padding-left: 5px;
			}
			&-input {
				flex-grow: 1;
			}
		}

		&-tree {
			height: 350px;
		}
	}
}

.already-checked,
.org_list {
	height: calc(100% - 36px);
	padding-top: 10px;
}

.org_list {
	.org_data {
		padding: 0 16px;
		.org_item {
			display: flex;
			justify-content: space-between;
			height: 36px;
			align-items: center;
			.icon-zuzhi {
				cursor: pointer;
				color: $color-primary;
				font-size: 16px;
			}
			.icon-zuzhi-disabled {
				cursor: default;
				color: #999;
				font-size: 16px;
			}
		}
	}
}

.el-table__header-wrapper {
	display: none;
}

::v-deep .el-input__validateIcon {
	display: none;
}

.el-breadcrumb__item {
	line-height: 30px;
	span,
	button {
		font-size: 12px;
	}
}

.dialog-footer {
	text-align: center !important;
}

.org-input {
	cursor: pointer;
	display: block;
	resize: vertical;
	padding: 0px 15px;
	line-height: 30px;
	min-height: 30px;
	box-sizing: border-box;
	width: 100%;
	font-size: inherit;
	font-family: inherit;
	color: #666666;
	background-color: #ffffff;
	background-image: none;
	border: solid 1px #dcdfe6;
	border-radius: 4px;
	transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

	.ml-2 {
		margin-right: 8px;
	}
	span {
		color: #c0c4cc;
		font-size: 13px;
	}
}

.org-input:hover {
	border-color: #c0c4cc;
}

.org-input:active {
	border-color: $color-primary;
}

.el-table::before {
	height: 0px;
}

.item_but:hover {
	cursor: pointer;
	color: #333;
}
</style>
