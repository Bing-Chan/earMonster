<template>
	<el-select
		v-model="keyWord"
		filterable
		multiple
		remote
		reserve-keyword
		:placeholder="placeholder"
		remote-show-suffix
		style="width: 300px"
		:remote-method="remoteMethod"
		:loading="loading"
		@change="handleChange"
		clearable
	>
		<el-option v-for="item in options" :key="item.value" :label="item.value" :value="item">{{ item.label }}</el-option>
	</el-select>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted, PropType } from 'vue';
import { searchCompany, searchDept, searchPerson } from '/@/api/org/index.ts';
import { searchQutotalLibrary } from '/@/api/indicatorsLibrary/index.ts';
import { getTemplateList } from '/@/api/templateConfig/index.ts';
import { SearchEnum } from '/@/enums/Search.ts';
import { emit } from 'process';

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
	},
	setup(props, { emit }) {
		const options = ref<ListItem[]>([]);
		const loading = ref(false);

		const state = reactive({
			keyWord: '',
			placeholder: '',
			resultData: [],
			controlType: props.controlType,
			orgCode: props.orgCode,
		});

		const remoteMethod = (query: string) => {
			let timer;
			clearTimeout(timer);
			if (query) {
				loading.value = true;
				timer = setTimeout(async () => {
					eval(`get${state.controlType}("${query}")`);
				}, 500);
			} else {
				options.value = [];
			}
		};

		const getPerson = async (query) => {
			const res = await searchPerson({
				psnCode: query,
			});
			toBindList({
				status: 0,
				data: res.data.map((x: Object) => {
					return {
						orgCode: x.psncode,
						orgName: x.psnname,
					};
				}),
			});
		};

		const getDepartment = async (query) => {
			const res = await searchDept({
				orgCode: state.orgCode,
				searchStr: query,
			});
			toBindList(res);
		};

		const getCompany = async (query) => {
			const res = await searchCompany({
				orgCode: state.orgCode,
				searchStr: query,
			});
			toBindList(res);
		};

		// 搜索指标
		const getZhibiao = async (query) => {
			const res = await searchQutotalLibrary({
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
					};
				}),
			});
		};

		const getTemplate = async (query) => {
			const res = await getTemplateList({
				pageSize: 30,
				pageNum: 1,
				templateNameOrCode: query,
				...props.queryData,
			});

			toBindList({
				status: 0,
				data: res.data.resultData.map((x: Object) => {
					return {
						orgCode: x.templateCode,
						orgName: x.templateName,
						id: x.id,
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
					return { value: x.orgCode, label: label, desc: desc, id: x.id, typeId: x.typeId, item: x.item };
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
			handleChange,
			getTemplate,
			setControlType,
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
