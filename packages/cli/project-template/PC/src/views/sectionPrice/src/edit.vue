<template>
	<div v-loading="loading" style="padding: 10px">
		<div class="modular-box">
			<div class="modular-box-title">
				<div class="title">
					<span>{{ title }}阶梯单价</span>
					<el-button type="primary" class="btn" @click="goBack" plain>返回</el-button>
				</div>
			</div>
			<div class="print-nb" id="print-nb">
				<report-card isBorder :expand="false" :width="180" title="第一步、填写基本信息">
					<template #btn>
						<el-button type="text" @click="editOne = true" v-if="!editOne && !isfullShow">
							<SvgIcon :name="'elementEdit'" :size="16"></SvgIcon>
						</el-button>
					</template>
					<div>
						<el-form v-show="editOne && !isfullShow" :model="oneForm" ref="oneFormRef" :rules="formRules" label-position="right" label-width="120px">
							<el-row>
								<el-col :span="12">
									<el-form-item label="单位名称:" prop="orgList" class="item—form">
										<org-tree
											ref="orgRef"
											:orgDataList="oneForm.orgList"
											@change="handleSelectedOrgTree"
											:hasFilter="false"
											:isCheck="false"
											:disabled="isfullShow"
										></org-tree> </el-form-item
								></el-col>
								<el-col :span="12">
									<el-form-item label="工序岗位:" prop="processPositionCode" class="item—form">
										<el-select
											:disabled="isfullShow"
											style="width: 100%"
											@change="handleChangePosition"
											v-model="oneForm.processPositionCode"
											placeholder="请选择工序岗位"
										>
											<el-option
												v-for="(item, index) in usePositionList"
												:key="index"
												:label="`${item.jobCode} ${item.jobName}`"
												:value="item.jobCode"
											/>
										</el-select> </el-form-item
								></el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item prop="validPeriodStart" label="有效期开始:" class="item—form">
										<el-date-picker
											format="YYYY-MM-DD"
											:disabled-date="disabledDate"
											style="width: 100%"
											v-model="oneForm.validPeriodStart"
											placeholder="请选择"
										/> </el-form-item
								></el-col>
								<el-col :span="12">
									<el-form-item prop="validPeriodEnd" label="有效期截止:" class="item—form">
										<el-date-picker
											:disabled-date="disabledDate"
											format="YYYY-MM-DD"
											style="width: 100%"
											v-model="oneForm.validPeriodEnd"
											placeholder="请选择"
										/> </el-form-item
								></el-col>
							</el-row>
						</el-form>
						<el-form v-show="isfullShow" :model="info" ref="oneFormRef1" :rules="formRules" label-position="right" label-width="120px">
							<el-row>
								<el-col :span="12">
									<el-form-item label="单位名称:" prop="orgList" class="item—form">
										<org-tree
											ref="orgRef"
											:orgDataList="info.orgList"
											@change="handleSelectedOrgTree1"
											:hasFilter="false"
											:isCheck="false"
											:disabled="isfullShow"
										></org-tree> </el-form-item
								></el-col>
								<el-col :span="12">
									<el-form-item label="工序岗位:" prop="processPositionCode" class="item—form">
										<el-select
											:disabled="isfullShow"
											style="width: 100%"
											@change="handleChangePosition1"
											v-model="info.processPositionCode"
											placeholder="请选择工序岗位"
										>
											<el-option
												v-for="(item, index) in usePositionList"
												:key="index"
												:label="`${item.jobCode} ${item.jobName}`"
												:value="item.jobCode"
											/>
										</el-select> </el-form-item
								></el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item prop="validPeriodStart" label="有效期开始:" class="item—form">
										<el-date-picker
											format="YYYY-MM-DD"
											:disabled-date="disabledDate"
											style="width: 100%"
											v-model="info.validPeriodStart"
											placeholder="请选择"
										/> </el-form-item
								></el-col>
								<el-col :span="12">
									<el-form-item prop="validPeriodEnd" label="有效期截止:" class="item—form">
										<el-date-picker
											:disabled-date="disabledDate"
											format="YYYY-MM-DD"
											style="width: 100%"
											v-model="info.validPeriodEnd"
											placeholder="请选择"
										/> </el-form-item
								></el-col>
							</el-row>
						</el-form>

						<el-form v-show="!editOne && !isfullShow" :model="info" :rules="formRules" label-position="right" label-width="120px">
							<el-row>
								<el-col :span="12">
									<el-form-item required label="单位名称:" props="orgList" class="item—form">
										<span>{{ info.orgList.length > 0 ? info.orgList[0].orgName : '' }}</span>
									</el-form-item></el-col
								>
								<el-col :span="12">
									<el-form-item required label="工序岗位:" class="item—form">
										<span>{{ `${info.processPositionCode} ${info.processPositionName}` }}</span>
									</el-form-item></el-col
								>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item required label="生效开始日期:" class="item—form">
										<span>{{ info.validPeriodStart == '' ? '' : dayjs(info.validPeriodStart).format('YYYY-MM-DD') }}</span>
									</el-form-item></el-col
								>
								<el-col :span="12">
									<el-form-item label="生效截止日期:" class="item—form">
										<span>{{ !info.validPeriodEnd || info.validPeriodEnd == '' ? '' : dayjs(info.validPeriodEnd).format('YYYY-MM-DD') }}</span>
									</el-form-item></el-col
								>
							</el-row>
						</el-form>

						<div v-if="editOne" style="text-align: right; margin: 0; margin-top: 10px">
							<el-button size="mini" type="default" v-if="info.unitName != ''" @click="editOne = false">取 消</el-button>
							<el-button type="primary" size="mini" @click="handleSave(1)">下一步</el-button>
						</div>
					</div>
				</report-card>
				<report-card v-if="!editOne" isBorder :expand="false" :width="180" title="第二步、设置阶梯单价">
					<div class="model-item">
						<el-alert type="warning" :closable="false" show-icon>
							<template #default>
								<div style="color: #333333; line-height: 20px">
									1.请先填写基准效率和基准单价，再填写基准档对应的区间值，最后从高往低依次填写。
									<br />2.阶梯单价默认5档，如超过5档，请点击十添加。
								</div>
							</template>
						</el-alert>
					</div>
					<el-form class="model-two" :v-loading="loading" :rules="twoRules" :model="twoForm" ref="twoRef">
						<div class="model-item bgColor">
							<div class="form-row">
								<div class="form-row-item">
									<el-form-item prop="basisEfficiency" :label="`${info.processPositionName.replace('员', '')}基准效率:`" class="item—form">
										<el-input placeholder="请输入" v-model="twoForm.basisEfficiency" size="small" style="width: 100%" clearable>
											<template #suffix>
												<span>{{ info.basisEfficiencyUnit }}</span>
											</template>
										</el-input>
									</el-form-item>
								</div>
								<div class="form-row-item">
									<el-form-item prop="basisPrice" :label="`${info.processPositionName.replace('员', '')}基准单价:`" class="item—form">
										<el-input placeholder="请输入" v-model="twoForm.basisPrice" size="small" style="width: 100%" clearable>
											<template #suffix>
												<span>{{ info.basisPriceUnit }}</span>
											</template></el-input
										>
									</el-form-item>
								</div>
							</div>
						</div>
						<div>
							<el-table :data="twoForm.priceList" stripe border style="width: 100%">
								<el-table-column label="操作" align="center" width="150">
									<template #default="scope">
										<div class="btns">
											<div class="btns-plus" v-if="scope.row.pricePosition == PRICE_TYPE.base">
												<div>
													<el-tooltip placement="left" show-after="200">
														<template #content>向上添加</template>
														<!-- <el-button type="text">Top center</el-button> -->
														<!-- <el-icon><InfoFilled />??</el-icon> -->
														<SvgIcon :name="'elementPlus'" @click="handleAddRow(scope.row, PRICE_TYPE.up)" :size="16"></SvgIcon>
													</el-tooltip>
												</div>
												<div>
													<el-tooltip placement="left" show-after="200">
														<template #content>向下添加</template>
														<!-- <el-button type="text">Top center</el-button> -->
														<!-- <el-icon><InfoFilled />??</el-icon> -->
														<SvgIcon :name="'elementPlus'" @click="handleAddRow(scope.row, PRICE_TYPE.down)" :size="16"></SvgIcon>
													</el-tooltip>
												</div>
											</div>
											<span v-else-if="scope.row.pricePosition == PRICE_TYPE.up || scope.row.pricePosition == PRICE_TYPE.down">
												<el-popconfirm
													width="220"
													confirm-button-text="是"
													cancel-button-text="否"
													:icon="InfoFilled"
													icon-color="#626AEF"
													@confirm="handleDelete(scope.row)"
													title="确认要删除吗？"
												>
													<template #reference>
														<SvgIcon :name="'elementDeleteFilled'" :size="16"></SvgIcon>
													</template>
												</el-popconfirm>
											</span>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="档位" align="center" width="150">
									<template #default="scope">
										<el-form-item label-width="">
											<span v-if="scope.row.pricePosition == PRICE_TYPE.high">最高档</span>
											<span v-else-if="scope.row.pricePosition == PRICE_TYPE.base">基准档</span>
											<span v-else-if="scope.row.pricePosition == PRICE_TYPE.low">最低档</span>
										</el-form-item>
									</template>
								</el-table-column>
								<el-table-column align="center" :label="`${info.processPositionName.replace('员', '')}效率区间`" width="230">
									<template #default="scope">
										<el-form-item :label="''" :prop="'priceList.' + scope.$index + '.scope'" :rules="twoRules.scope" label-width="0px">
											<ear-number-ranger
												:isOpen="twoForm.basisEfficiency != '' && twoForm.basisPrice != ''"
												@open="handleOpen()"
												v-model:modelValue="scope.row.scope"
												:row="scope.row"
												@complete="handleComplete"
											></ear-number-ranger>
										</el-form-item>
									</template>
								</el-table-column>
								<el-table-column align="center" :label="`${info.processPositionName.replace('员', '')}效率单价`" min-width="220px">
									<template #default="scope">
										<el-row>
											<el-col :span="12" style="text-align: right"
												><el-input v-model="twoForm.basisPrice" size="small" disabled style="width: 100px" placeholder="基准单价" clearable>
												</el-input>
												*
											</el-col>
											<el-col :span="12" style="text-align: left; padding-left: 5px">
												<el-form-item :prop="'priceList.' + scope.$index + '.priceFactor'" :rules="twoRules.priceFactor" label-width="0px">
													<el-input v-model="scope.row.priceFactor" size="small" style="width: 100px" placeholder="单价系数" clearable> </el-input>
												</el-form-item>
											</el-col>
										</el-row>
									</template>
								</el-table-column>
								<el-table-column label="是否基准单价" show-overflow-tooltip align="center" min-width="150px">
									<template #default="scope">
										<el-form-item label-width="0px">
											<!-- <el-radio-group v-model="scope.row.basisFlag" class="ml-4">
												<el-radio :label="true" size="large" disabled>否</el-radio>
											</el-radio-group> -->
											<span :class="scope.row.basisFlag ? 'blue' : ''"> {{ scope.row.basisFlag ? '是' : '否' }}</span>
										</el-form-item>
									</template>
								</el-table-column>
							</el-table>
							<div style="text-align: right; margin: 0; margin-top: 10px">
								<el-button type="primary" :loading="loading" size="mini" @click="handleSave(2)">保 存</el-button>
							</div>
						</div>
					</el-form>
				</report-card>
				<div style="height: 20px"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, h, onBeforeMount, getCurrentInstance, toRaw, nextTick, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import orgTree from '/@/components/orgTree/index.vue';
// import EarNumberRanger from '/@/components/number-ranger/index.vue';
import { SearchEnum } from '/@/enums/Search.ts';
import { checkPrice, addPrice, getSectionList, updatePrice, publishPrice } from '/@/api/sectionPrice/index.ts';
import { usePosition } from '/@/hooks/web/usePosition';
import { validateNumber2, validateNumber5, validateScope } from '/@/utils/validate';
import { SCOPE_TYPE, NUMBER_TYPE, PRICE_TYPE, OPERATION_TYPE } from '/@/utils/type';
import { disabledDate, dateFormat } from '/@/utils/formatTime';
import { toBeginFlag, toEndFlag, toEndFlagByUp } from '/@/utils/common';
import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
import lodash from 'lodash';
import dayjs from 'dayjs';
import { formRulesValidate } from '/@/utils/other.ts';

export default defineComponent({
	name: 'sectionPriceEdit',
	components: {
		orgTree,
		// EarNumberRanger,
	},
	setup(props) {
		const route = useRoute();
		const router = useRouter();
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			title: '',
			loading: false,
			editOne: true,
			isfullShow: false, // 是否全部显示
			priceId: '',
			info: {
				unitName: '',
				unitCode: '',
				validPeriodStart: '',
				validPeriodEnd: '',
				processPositionCode: '',
				processPositionName: '',
				orgList: [],
				values: [],
				basisEfficiencyUnit: '',
				basisPriceUnit: '',
			},
			oneForm: {
				unitName: '',
				unitCode: '',
				validPeriodStart: '',
				validPeriodEnd: '',
				processPositionCode: '',
				processPositionName: '',
				orgList: [],
				values: [],
				basisEfficiencyUnit: '',
				basisPriceUnit: '',
			},
			twoForm: {
				confirm: null,
				basisEfficiency: '',
				basisPrice: '',
				// 单价列表
				priceList: [
					{ pricePosition: PRICE_TYPE.high, dataOrder: 1, scope: [1, '', NUMBER_TYPE.infinity, 2], priceFactor: '', basisFlag: false },
					{ pricePosition: PRICE_TYPE.up, dataOrder: 2, scope: [], priceFactor: '', basisFlag: false },
					{ pricePosition: PRICE_TYPE.base, dataOrder: 3, scope: [], priceFactor: '1.00', basisFlag: true },
					{ pricePosition: PRICE_TYPE.down, dataOrder: 4, scope: [], priceFactor: '', basisFlag: false },
					{ pricePosition: PRICE_TYPE.low, dataOrder: 5, scope: [1, 0, '', 2], priceFactor: '', basisFlag: false },
				],
			},
			twoRules: {
				basisEfficiency: [{ required: true, validator: validateNumber2, trigger: ['blur'] }],
				basisPrice: [{ required: true, validator: validateNumber5, trigger: 'blur' }],
				scope: [{ required: true, validator: validateScope, trigger: ['change'] }],
				priceFactor: [{ required: true, validator: validateNumber2, trigger: 'blur' }],
			},
			formRules: {
				processPositionCode: [{ required: true, message: '请选择工序岗位', trigger: ['change'] }],
				orgList: [{ required: true, message: '请选择单位名称', trigger: 'change' }],
				validPeriodStart: [{ required: true, message: '请选择生效开始日期', trigger: ['blur'] }],
			},
		});

		const { usePositionList } = usePosition();

		const goBack = () => {
			router.push({ name: 'sectionPrice' });
		};

		const handleSelectedOrgTree = (val) => {
			state.oneForm.orgList = val;
		};

		const handleChangePosition = (item) => {
			let info = usePositionList.value.find((x) => item == x.jobCode);
			state.oneForm.processPositionName = info.jobName;
			state.oneForm.basisEfficiencyUnit = info.efficiencyUnit;
			state.oneForm.basisPriceUnit = info.unitPriceUnit;
		};

		const handleSelectedOrgTree1 = (val) => {
			state.info.orgList = val;
		};

		const handleChangePosition1 = (item) => {
			let info = usePositionList.value.find((x) => item == x.jobCode);
			state.info.processPositionName = info.jobName;
			state.info.basisEfficiencyUnit = info.efficiencyUnit;
			state.info.basisPriceUnit = info.unitPriceUnit;
		};

		const handleSave = (step) => {
			if (step == 1) {
				toSubmitOne();
			} else if (step == 2) {
				let rules = [];
				if (state.title == OPERATION_TYPE.add) {
					rules = [formRulesValidate(proxy.$refs.twoRef)];
				} else {
					rules = [formRulesValidate(proxy.$refs.oneFormRef1), formRulesValidate(proxy.$refs.twoRef)];
				}

				Promise.all(rules).then(() => {
					// if (!valid) return false;
					ElMessageBox.confirm(`点击确认, 您${state.title}的阶梯单价将在${dayjs(state.info.validPeriodStart).format('YYYY-MM-DD')}开始生效`, {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						// type: 'warning',
						title: `${state.info.orgList[0].orgName} ${state.info.processPositionCode} ${state.info.processPositionName}阶梯单价`,
					}).then(() => {
						toSubmitTwo();
					});
				});
			}
		};

		const toSubmitTwo = async () => {
			state.loading = true;
			// 组装提交数据
			let pamars = {
				confirm: state.twoForm.confirm,
				processPositionCode: state.info.processPositionCode,
				processPositionName: state.info.processPositionName,
				unitCode: state.info.orgList[0].orgCode,
				unitName: state.info.orgList[0].orgName,
				validPeriodStart: dateFormat(state.info.validPeriodStart),
				validPeriodEnd: dateFormat(state.info.validPeriodEnd),
				basisEfficiency: state.twoForm.basisEfficiency,
				basisEfficiencyUnit: state.info.basisEfficiencyUnit,
				basisPrice: state.twoForm.basisPrice,
				basisPriceUnit: state.info.basisPriceUnit,
				detailReqList: state.twoForm.priceList.map((item) => {
					let pricePosition = item.pricePosition;
					if (pricePosition == PRICE_TYPE.down || pricePosition == PRICE_TYPE.up) {
						pricePosition = 0;
					}
					return {
						basisFlag: item.basisFlag,
						dataOrder: item.dataOrder,
						priceFactor: item.priceFactor,
						pricePosition: pricePosition,
						refEndValue: item.scope[2] == NUMBER_TYPE.infinity ? null : item.scope[2],
						refEndValueRange: item.scope[3],
						refStartValue: item.scope[1],
						refStartValueRange: item.scope[0],
					};
				}),
			};
			let res;
			if (state.title == OPERATION_TYPE.add) {
				res = await addPrice(pamars);
			} else if (state.title == OPERATION_TYPE.update) {
				pamars.id = state.priceId;
				res = await updatePrice(pamars);
			} else {
				res = await publishPrice(pamars);
			}
			state.loading = false;
			if (res.status == 0) {
				ElMessage.success('保存成功！');
				setTimeout(() => {
					router.push({ name: 'sectionPrice' });
				}, 300);
			} else if (res.status == 1000) {
				ElMessageBox.confirm(res.message, {
					title: `${state.info.orgList[0].orgName} ${state.info.processPositionCode} ${state.info.processPositionName}阶梯单价`,
					message: h('p', null, [
						h(
							'span',
							null,
							`[${dateFormat(state.info.validPeriodStart)}${state.info.validPeriodEnd == '' ? '' : ' 至 ' + dateFormat(state.info.validPeriodEnd)}]`
						),
						h('span', null, state.info.validPeriodEnd == '' ? '开始有' : '有'),
						h('span', { style: 'color: red' }, '多个阶梯单价表同时生效'),
						h('span', null, ',将最近更新的数据设置为优先使用?'),
					]),
					confirmButtonText: '是',
					cancelButtonText: '否',
					showClose: false,
					closeOnClickModal: false,
				})
					.then(() => {
						state.twoForm.confirm = true;
						toSubmitTwo();
					})
					.catch(() => {
						state.twoForm.confirm = false;
						toSubmitTwo();
					});
			} else {
				ElMessage.error(res.message);
			}
		};

		const toSubmitOne = () => {
			proxy.$refs.oneFormRef.validate(async (valid: boolean) => {
				if (!valid) return false;

				if (dayjs(state.oneForm.validPeriodStart).isAfter(state.oneForm.validPeriodEnd)) {
					ElMessage.error('开始日期必须小于结束日期');
					return false;
				}

				// 编辑第一步时，判断工序是否发生变化，是否需要重置第二步
				if (state.info.orgList && state.info.orgList.length > 0) {
					let isReset =
						state.info.orgList[0].orgName != '' &&
						`${state.info.processPositionCode} ${state.info.processPositionName}` !=
							`${state.oneForm.processPositionCode} ${state.oneForm.processPositionName}`;

					if (isReset) {
						reset();
					}
				}

				if (OPERATION_TYPE.add == state.title) {
					let res = await checkPrice({
						unitName: state.oneForm.orgList[0].orgName,
						unitCode: state.oneForm.orgList[0].orgCode,
						validPeriodStart: state.oneForm.validPeriodStart,
						processPositionCode: state.oneForm.processPositionCode,
						processPositionName: state.oneForm.processPositionName,
					});

					if (res.status == 0) {
						state.info = JSON.parse(JSON.stringify(state.oneForm));

						state.editOne = false;
					} else {
						ElMessage.error(res.message);
					}
				} else {
					state.info = JSON.parse(JSON.stringify(state.oneForm));
					state.editOne = false;
				}
			});
		};

		const reset = () => {
			state.twoForm = {
				basisEfficiency: '',
				basisPrice: '',
				// 单价列表
				priceList: [
					{ pricePosition: PRICE_TYPE.high, dataOrder: 1, scope: [1, '', NUMBER_TYPE.infinity, 2], priceFactor: '', basisFlag: false },
					{ pricePosition: PRICE_TYPE.up, dataOrder: 2, scope: [], priceFactor: '', basisFlag: false },
					{ pricePosition: PRICE_TYPE.base, dataOrder: 3, scope: [], priceFactor: '', basisFlag: true },
					{ pricePosition: PRICE_TYPE.down, dataOrder: 4, scope: [], priceFactor: '', basisFlag: false },
					{ pricePosition: PRICE_TYPE.low, dataOrder: 5, scope: [1, 0, '', 2], priceFactor: '', basisFlag: false },
				],
			};
		};

		const handleDelete = (row) => {
			state.loading = true;
			state.twoForm.priceList = state.twoForm.priceList.filter((x) => x.dataOrder != row.dataOrder);
			reseList();
			state.loading = false;
		};

		const handleAddRow = (row, type) => {
			if (state.twoForm.priceList.length >= 9) {
				ElMessage.error('抱歉，最多可添加9行数据');
				return false;
			}

			let order = row.dataOrder - 1;
			if (PRICE_TYPE.down == type) {
				order = row.dataOrder;
			}
			state.twoForm.priceList.splice(order, 0, {
				pricePosition: type,
				dataOrder: row.dataOrder,
				scope: [],
				priceFactor: '',
				basisFlag: false,
			});
			console.log(state.twoForm.priceList, 'priceList');
			proxy.$refs.twoRef.clearValidate();
			reseList();
			// let fields = [];
			// let i = 0;
			// while (i < state.twoForm.priceList.length) {
			// 	fields.push("priceList." + i + ".scope");
			// 	i++;
			// }
			// console.log(fields)
			// proxy.$refs.twoRef.clearValidate(fields);
			//清空单项校验
		};

		const handleComplete = (item) => {
			// if (state.twoForm.priceList[item.row.dataOrder]) {
			// 	if (!state.twoForm.priceList[item.row.dataOrder].scope || state.twoForm.priceList[item.row.dataOrder].scope.length == 0) {
			// 		state.twoForm.priceList[item.row.dataOrder].scope = [1, '', item.selected[1], toEndFlagByUp(item.selected[0])];
			// 	} else if (state.twoForm.priceList[item.row.dataOrder].scope[2] != item.selected[1]) {
			// 		let start = state.twoForm.priceList[item.row.dataOrder].scope[1];
			// 		if (start > item.selected[1]) {
			// 			start = '';
			// 		}
			// 		state.twoForm.priceList[item.row.dataOrder].scope = [1, start, item.selected[1], toEndFlagByUp(item.selected[0])];
			// 	}
			// 	reseList();
			// }
		};

		const reseList = () => {
			// 重新排序
			state.twoForm.priceList.forEach((item, index, array) => {
				item.dataOrder = index + 1;
				// if (index == 0) {
				// 	item.scope = [1, '', NUMBER_TYPE.infinity, 2];
				// }
			});
		};

		onMounted(() => {
			if (route.query.id && route.query.isPublish) {
				state.title = OPERATION_TYPE.publish;
			} else if (route.query.id) {
				state.title = OPERATION_TYPE.update;
			} else {
				state.title = OPERATION_TYPE.add;
			}

			if (route.query.id) {
				state.isfullShow = true;
				bindData();
			}
		});

		const handleOpen = (row) => {
			proxy.$refs.twoRef.validateField(['basisEfficiency', 'basisPrice']);
		};

		const bindData = async () => {
			state.editOne = false;
			state.priceId = route.query.id.toString();
			await nextTick();
			let res = await getSectionList({ sectionPriceId: state.priceId });
			if (res.status == 0) {
				state.info = res.data.sectionPriceBasicInfoRes;
				state.info.orgList = [{ orgCode: state.info.unitCode, orgName: state.info.unitName }];
				state.oneForm = lodash.cloneDeep(state.info);
				state.twoForm = { ...state.twoForm, ...state.info };
				let isUp = true;
				state.twoForm.priceList = res.data.detailResList.map((x, index) => {
					let pricePosition = x.pricePosition;
					if (isUp && x.pricePosition == 0) {
						pricePosition = PRICE_TYPE.up;
					} else if (!isUp && x.pricePosition == 0) {
						pricePosition = PRICE_TYPE.down;
					}
					return {
						...x,
						pricePosition: pricePosition,
						dataOrder: index + 1,
						scope: [x.refStartValueRange, x.refStartValue, x.refEndValue ?? NUMBER_TYPE.infinity, x.refEndValueRange],
					};
				});
				if (state.title == OPERATION_TYPE.publish) {
					state.oneForm.validPeriodEnd = '';
					state.oneForm.validPeriodStart = '';
					state.info.validPeriodEnd = '';
					state.info.validPeriodStart = '';
				}
				console.log(state.twoForm.priceList, 'state.twoForm.priceList ');
			} else {
				ElMessage.error(res.message);
			}
		};

		return {
			...toRefs(state),
			goBack,
			SearchEnum,
			handleSelectedOrgTree,
			PRICE_TYPE,
			usePositionList,
			handleChangePosition,
			handleSave,
			dayjs,
			handleDelete,
			handleAddRow,
			reset,
			handleComplete,
			OPERATION_TYPE,
			disabledDate,
			handleOpen,
		};
	},
});
</script>

<style lang="scss" scoped>
.layout-container .layout-scrollbar {
	padding-top: 0px;
}

.forposition {
	margin: 0 auto;
}
.fortitle {
	text-align: center;
	margin-left: -30px;
	font-size: 24px;
}
.gotoarchive {
	float: right;
	margin-top: 15px;
}
h2 {
	font-weight: normal;
}
.detail-info {
	padding-top: 56px;
}

.page_title {
	position: fixed;
	top: 0;
	width: 100%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1000;
	// box-shadow: 0 3px 5px #e5e5e5;
	.print_but {
		position: absolute;
		top: 50%;
		left: 74.1%;
		transform: translateY(-50%);
	}
}

.center_text {
	text-align: center;
	font-size: 24px;
	font-weight: 800px;
	color: #000;
	height: 56px;
	line-height: 56px;
}
.body_box {
	height: calc(100vh - 56px);
	.content_box {
		padding-top: 10px;
	}
	.modular-content {
		margin-bottom: 10px;
	}
}

.modular-content {
	margin: 0 auto;
	background-color: #fff;
	border-radius: 6px;
	// margin-bottom: 10px;
	overflow: hidden;
}

.modular-title {
	padding-left: 26px;
	height: 40px;
	line-height: 38px;
	font-weight: 800;
	color: #824c96;
	position: relative;
	// background: rgba(229, 229,229,0.6);
	// border-bottom: 1px solid #dcdfe6;
	margin: 20px 0;
	font-size: 18px;
	::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 16px;
		width: 3px;
		height: 16px;
		background: #824c96;
		transform: translateY(-50%);
		border-radius: 4px;
	}
}
.little_title {
	padding: 0 20px;
}

.but_box {
	text-align: center;
	margin-top: 20px;
	margin-bottom: 30px;
}

.yto_form_personal {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	.item—form {
		margin-left: 60px;
		width: 288px;
	}

	.el-form-item__label {
		height: 32px;
	}
	.two-line {
		.el-form-item__label {
			line-height: 16px;
		}
	}

	.item—form-width {
		margin-left: 60px;
		.el-input {
			width: 535px;
		}
	}
	.detail_address {
		display: flex;
	}
	.detail_address .item-address {
		.el-input {
			width: 346px;
		}
		.contact {
			width: 180px;
		}
		&.adress-detail {
			margin-left: 10px;
		}
	}
	.yto-cascader {
		width: 340px;
	}
}
.line-input {
	.el-textarea__inner {
		min-height: 50px !important;
	}
}

.blue {
	color: $color-primary;
}
</style>

<style lang="scss">
.print-nb {
	// max-width: 1200px;
	width: 70%;
	margin: 0 auto;
	background-color: rgb(255, 255, 255);
	padding: 20px 0px;
	box-sizing: border-box;
	.apply_title {
		font-size: 14px;
		font-weight: 500;
		color: #000000;
		line-height: 20px;
		text-align: center;
	}
	.image {
		width: 87px;
		height: 110px;
		border: 1px solid #dcdfe6;
		margin-top: 10px;
	}
	.table_box {
		text-align: center;
		margin: 15px 0 0 0;
	}
	.title {
		font-size: 12px;
		font-weight: 600;
		line-height: 17px;
	}
	.long-info {
		margin: 15px 0 0 0;
		.content {
			margin: 0 0 0 15px;
			min-height: 30px;
			padding: 15px 0;
		}
		hr {
			color: #dedede;
		}
	}
}
.job {
	display: flex;
	justify-content: space-between;
}
.print_form {
	font-size: 14px;
	.detail {
		border-radius: 0;
		border: none;
		text-align: left;
		display: inline-block;
		height: 24px;
	}
	span {
		font-size: 14px;
		font-weight: 400;
		color: #333333;
	}
	.el-input__inner {
		border-radius: 0;
		border: none;
		border-bottom: 1px solid #666666;
	}
	.el-form-item {
		margin-bottom: 0px;
	}
	.el-form-item__label {
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.w100 {
		width: 100px;
	}
}

.model-item {
	margin-bottom: 20px;
}
.bgColor {
	background: #edf2ff;
	display: flex;
	min-height: 60px;
	align-items: center;
	justify-content: center;
}
</style>

<style>
hr {
	color: #dedede;
}
@page {
	margin-bottom: 1mm;
	/* margin-top: 0mm; */
}
</style>
<style lang="scss" scoped>
.modular-box {
	width: 100%;
	background-color: #fff;
	min-height: 100vh;

	// border-radius: 6px;
	overflow: hidden;
	&-title {
		width: 100%;
		border-bottom: solid 2px #f5f6fa;
		height: 40px;
		margin-top: 40px;
		.title {
			width: 70%;
			height: 40px;
			line-height: 40px;
			margin: 0 auto;
			overflow: hidden;

			span {
				font-size: 16px;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #333333;
			}
			.btn {
				float: right;
			}
		}
	}

	.gridtable {
		font-family: verdana, arial, sans-serif;
		font-size: 11px;
		color: #333333;
		border-width: 1px;
		border-color: #d3d3d3;
		border-collapse: collapse;
		text-align: center;
	}
	.gridtable th {
		border-width: 1px;
		line-height: 30px;
		border-style: solid;
		border-color: #d3d3d3;
		background-color: #f1f1f1;
		text-align: center;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.gridtable td {
		border-width: 1px;
		padding: 8px;
		border-style: solid;
		border-color: #d3d3d3;
		background-color: #ffffff;

		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
}

.btns {
	color: $color-primary;
	.el-icon {
		cursor: pointer;
	}

	&-plus {
		display: flex;
		flex-direction: column;
		div {
			text-align: center;
		}
	}
}
.model-two {
	.el-form-item--small.el-form-item {
		margin-bottom: 0px;
	}
	.el-form-item--small.el-form-item.is-error {
		margin-bottom: 18px;
	}
}

.form-row {
	width: 100%;
	flex: 1;
	&-item {
		line-height: 100%;
		width: 320px;
		float: left;
		padding-left: 10px;
	}
}
</style>
