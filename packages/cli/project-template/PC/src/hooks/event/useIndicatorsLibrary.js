"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePages = void 0;
const vue_1 = require("vue");
const element_plus_1 = require("element-plus");
const index_ts_1 = require("/@/api/indicatorsLibrary/index.ts");
// 页面公用方法
function usePages(state, getList) {
    const { proxy } = (0, vue_1.getCurrentInstance)();
    // 公式完成
    const handleFormulaComplete = (item) => {
        state.indicatorForm.calculationFormula = item.result;
        state.indicatorForm.calculationFormulaItem = JSON.stringify(item.list);
    };
    const handleCommonFormulaComplete = (item, indicatorForm) => {
        state.indicatorForm.commonCalculationFormula = item.result;
        state.indicatorForm.commonCalculationFormulaItem = JSON.stringify(item.list);
    };
    const handleScore = (val, callback) => {
        if ((state.dialogTitle == '修改指标' || state.dialogTitle == '指标公式') && val == 1) {
            element_plus_1.ElMessageBox.confirm('更改得分来源将会清除已配置的公式，是否继续？', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning',
            })
                .then(async () => {
                //清空公式和评分规则
                state.indicatorForm.commonCalculationFormula = '';
                state.indicatorForm.commonCalculationFormulaItem = '[]';
                state.indicatorForm.formulaType = 1;
                state.indicatorForm.actualValueSource = 2;
                state.indicatorForm.calculationFormula = '';
                state.indicatorForm.calculationFormulaItem = '[]';
                state.indicatorForm.scoringRuleDesc = '';
                state.indicatorForm.quotaFormulaConfigReqList = [];
                if (callback && typeof callback === 'function') {
                    callback();
                }
            })
                .catch(() => {
                state.indicatorForm.scoreValueSource = 2;
            });
        }
        else {
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    };
    const handleFormulaType = (val) => {
        if (state.dialogTitle == '修改指标' || state.dialogTitle == '指标公式') {
            element_plus_1.ElMessageBox.confirm('更改公式类型将会清除已配置的公式，是否继续？', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning',
            })
                .then(async () => {
                //清空公式和评分规则
                state.indicatorForm.commonCalculationFormula = '';
                state.indicatorForm.commonCalculationFormulaItem = '[]';
                state.indicatorForm.scoringRuleDesc = '';
                state.indicatorForm.quotaFormulaConfigReqList = [];
            })
                .catch(() => {
                state.indicatorForm.formulaType = val == 1 ? 2 : 1;
            });
        }
    };
    const handleView = async (row) => {
        await (0, vue_1.nextTick)();
        proxy.$refs.quotaFormlaRef.open(row.id);
    };
    const handleSave = () => {
        if (state.stepActiveIndex == 1) {
            handleStep1Commit();
        }
        else {
            handleStep2Commit();
        }
    };
    const handleUp = () => {
        state.stepActiveIndex = 1;
    };
    //处理下一步  目前默认值只适配操作工
    const goNext = () => {
        //操作工才做处理
        if (state.indicatorForm.jobType == 1) {
            let quotaList = [{ id: 1, name: '绩效系数', valType: 3 }];
            //操作工不存在是否有目标值，因此valType=3 实际值
            quotaList.push({ id: state.indicatorForm.id, name: state.indicatorForm.quotaName, valType: 3 });
            let formalStr = ` '${state.indicatorForm.quotaName}' * '绩效系数' `;
            state.indicatorForm.commonCalculationFormula = formalStr;
            state.indicatorForm.scoringRuleDesc = formalStr;
            state.indicatorForm.commonCalculationFormulaItem = JSON.stringify(quotaList);
        }
    };
    const handleStep1Commit = async () => {
        proxy.$refs.indicatorRef.validate(async (valid) => {
            if (!valid)
                return false;
            state.commitLoading = true;
            if (state.addType == 1) {
                let res = await (0, index_ts_1.addQuotalibrary)(state.indicatorForm);
                if (res.status == 0) {
                    state.commitLoading = false;
                    state.indicatorForm.id = res.data;
                    state.stepActiveIndex = 2;
                    goNext();
                    element_plus_1.ElMessage.success('新增成功');
                }
                else {
                    element_plus_1.ElMessage.error(res.message);
                    state.commitLoading = false;
                }
            }
            else {
                let res = await (0, index_ts_1.editQutotalLibrary)(state.indicatorForm);
                if (res.status == 0) {
                    state.commitLoading = false;
                    state.stepActiveIndex = 2;
                    element_plus_1.ElMessage.success('修改成功');
                }
                else {
                    state.commitLoading = false;
                    element_plus_1.ElMessage.error(res.message);
                }
            }
        });
    };
    const handleStep2Commit = async () => {
        proxy.$refs.indicatorRef1.validate(async (valid) => {
            if (!valid)
                return false;
            if (proxy.$refs.formlaRef) {
                let list = proxy.$refs.formlaRef.getResult();
                if (!list) {
                    return false;
                }
                if (list) {
                    state.indicatorForm.quotaFormulaConfigReqList = list;
                }
            }
            state.commitLoading = true;
            let res = await (0, index_ts_1.formulaConfig)(state.indicatorForm);
            if (res.status == 0) {
                state.commitLoading = false;
                state.dialogVisible = false;
                element_plus_1.ElMessage.success('配置成功！');
                getList();
            }
            else {
                element_plus_1.ElMessage.error(res.message);
                state.commitLoading = false;
            }
        });
    };
    const reset = () => {
        if (state.indicatorForm.jobType == 1) {
            state.indicatorForm = {
                description: '',
                quotaName: '',
                quotaCategoryId: '',
                quotaDataDimensionId: '',
                resultUnitId: '',
                quotaTypeId: 2,
                baseTargetState: 0,
                columnModifyFlag: '',
                modifyFlag: '',
                jobType: 1,
                shiftFlag: true,
                formulaType: 1,
                scoreValueSource: 2,
                actualValueSource: 2,
                commonCalculationFormula: '',
                calculationFormulaItem: '[]',
                calculationFormula: '',
                scoringRuleDesc: '',
                quotaFormulaConfigReqList: [],
            };
        }
        else {
            state.indicatorForm = {
                description: '',
                quotaName: '',
                quotaCategoryId: '',
                quotaDataDimensionId: '',
                resultUnitId: '',
                quotaTypeId: '',
                baseTargetState: 0,
                columnModifyFlag: '',
                modifyFlag: '',
                shiftFlag: true,
                formulaType: 1,
                scoreValueSource: 2,
                actualValueSource: 2,
                commonCalculationFormula: '',
                commonCalculationFormulaItem: '[]',
                calculationFormulaItem: '[]',
                calculationFormula: '',
                scoringRuleDesc: '',
                quotaFormulaConfigReqList: [],
            };
        }
        if (proxy.$refs.indicatorRef) {
            proxy.$refs.indicatorRef.resetFields();
        }
        if (proxy.$refs.indicatorRef1) {
            proxy.$refs.indicatorRef1.resetFields();
        }
    };
    const handleStep2Cancle = () => {
        if (state.addType == 1) {
            element_plus_1.ElMessage.warning('指标公式未配置，请记得点击列表的【公式】进行配置');
        }
        state.dialogVisible = false;
        state.indicatorForm.columnModifyFlag = '';
        state.indicatorForm.modifyFlag = '';
        reset();
        getList();
    };
    return {
        handleFormulaComplete,
        handleCommonFormulaComplete,
        handleScore,
        handleFormulaType,
        handleView,
        handleSave,
        handleUp,
        handleStep2Cancle,
        reset,
    };
}
exports.usePages = usePages;
