<template>
  <div id="pages">
    <div class="query_box">

      <el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
        <el-form-item label="日期" prop="">
          <el-date-picker
            v-model="queryForm.date"
            type="daterange"
            range-separator="——"
            start-placeholder="请选择开始时间"
            end-placeholder="请选择结束时间"
            ></el-date-picker>
        </el-form-item>
        <el-form-item label="所属中心" prop="unitName">
					<el-input v-model.trim="queryForm.unitName" clearable placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item label="岗位" prop="jobName">
					<el-input v-model.trim="queryForm.jobName" clearable placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item label="员工工号/姓名" prop="userCode">
					<el-input v-model.trim="queryForm.userCode" clearable placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
       </el-form>
    </div>
     <div class="total_box">
      <!--汇总模块-->
      <div>
        <el-row :gutter="5">
          <el-col :span="24"
            ><div class="grid-content">
              <table class="single-table">
                <tr>
                  <td rowspan="2" class="total-title">汇总</td>
                  <td class="title">员工人数</td>
                  <td class="title">日基本工资</td>
                  <td class="title">日效能考核工资</td>
                  <td class="title">日工资合计</td>
                </tr>
                <tr>
                  <td>{{ personCount }}</td>
                  <td>{{ dayBasicSalary }}</td>
                  <td>{{ totalScore }}</td>
                  <td>{{ daySalaryTotal }}</td>
                </tr>
              </table>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
    <div class="content_list">
      <div>
        <el-table :data="tableData" stripe  border style="width: 100%">
          <template #empty><SysEmpty></SysEmpty></template>
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="assessDate" label="日期" width="150" align="center"></el-table-column>
          <el-table-column prop="userCode" label="员工工号" width="150" align="center"></el-table-column>
          <el-table-column prop="userName" label="员工姓名" width="150" align="center"></el-table-column>
          <el-table-column prop="dayBasicSalary" label="日基本工资" width="150" align="center"></el-table-column>
          <el-table-column prop="totalScore" label="日效能考核工资" width="150" align="center"></el-table-column>
					<el-table-column prop="daySalaryTotal" width="150" align="center">
            <template solt="header" #header="scope">
              日薪合计
              <SvgIcon :name="'elementQuestionFilled'" @click="dialogVisible=true"></SvgIcon>
            </template>
          </el-table-column>
					<el-table-column prop="jobName" label="岗位" min-width="150" align="center"></el-table-column>
          <el-table-column prop="unitName" label="所属中心" min-width="150" align="center"></el-table-column>
          <el-table-column prop="updateTimeStr" label="更新时间" min-width="150" align="center">
          </el-table-column>      
        </el-table>
      </div>
      <div class="pagination" ref="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="queryForm.pageNo"
					:page-size="queryForm.limit"
					:page-sizes="[20, 30, 50]"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				>
				</el-pagination>
			</div>
       <el-dialog :title="dialogTitle" v-model="dialogVisible" width="700px">
        <div class="dialog-content">
          <div class="moudle">
            <div class="title">
              <span >日薪资结构</span>
            </div>
            <div class="first">
              <div>
                <div class="primary">+基本工资</div>
                <div class="bottom">日基本工资</div>
              </div>
              <div class="right">
                <div class="primary">+绩效</div>
                <div class="bottom">日效能考核工资</div>
              </div>
            </div>
          </div>
          <el-divider />
          <div class="moudle">
            <div class="title">
              <span >规则详情</span>
            </div>
            <div class="content">
              <el-tabs v-model="activeName">
                <el-tab-pane label="基本工资" name="1">
                  <div>
                    <el-tag type="info">系统自动计算</el-tag>
                    <div style="margin: 15px 0;">
                      <el-button type="primary">日基本工资</el-button>
                      <span>日基本工资=岗位基本工资/应出勤天数，从PS系统获取人员的月基本工资和应出勤天数</span>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="绩效" name="2">
                  <div>
                    <el-tag type="info">系统自动计算</el-tag>
                    <div style="margin: 15px 0;">
                      <el-button type="primary">日效能考核工资</el-button>
                      <span> 从绩效管理 获取人员的日效能考核工资</span>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <el-divider />
          <div class="moudle">
            <div class="title">
              <span >数据查看</span>
            </div>
            <div class="content">
              <p >显示T-1的日工资</p>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, nextTick, ref, toRaw } from 'vue';
import { getDaySalaryList, getTotal } from '/@/api/daySalary/index.ts';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'sectionPrice',
  setup(){
    const { proxy } = getCurrentInstance() as any;
    const state = reactive({
      queryForm: {
        limit: 20,
        pageNo: 1,
        unit: '',
        processPosition: '',
        date: [],
        assessStartDate	: '',
        assessEndDate: '',
        userCode: '',
        jobName: '',
        unitName: '',
      },
      total: 0,
      tableData: [],
      dialogVisible: false,
      dialogTitle: '操作工日工资',
      activeName: "1",
      personCount: 0,
      dayBasicSalary: 0,
      totalScore: 0,
      daySalaryTotal:0,
    })
    const getList =  async () => {
      state.queryForm.assessStartDate = state.queryForm.date == null || state.queryForm.date.length == 0 ? '': dayjs(state.queryForm.date[0]).format('YYYY-MM-DD')
      state.queryForm.assessEndDate = state.queryForm.date == null || state.queryForm.date.length == 0 ? '': dayjs(state.queryForm.date[1]).format('YYYY-MM-DD')
      let res = await getDaySalaryList(state.queryForm)
      console.log(res)
      if(res.status == 0) {
        state.tableData = res.data.resultData
        state.total = res.data.total
      }
    }
    const getAll = async () => {
      let res = await getTotal(state.queryForm)
      console.log(res)
      if(res.status == 0){
        state.personCount = res.data.personCount
        state.dayBasicSalary = res.data.dayBasicSalary
        state.totalScore = res.data.totalScore
        state.daySalaryTotal = res.data.daySalaryTotal
      }
    }

    const onSubmit = () => {
      state.queryForm.pageNo = 1
      getList()
      getAll()
    }

    const bandReset = () => {
      state.queryForm.date = []
      proxy.$refs.queryRef.resetFields();
    }

    onMounted(() => {
      getList()
      getAll()
    })

    const handleSizeChange = (val: number) => {
      state.queryForm.limit = val;
      getList();
      getAll();
    };
    const handleCurrentChange = (val: number) => {
      state.queryForm.pageNo = val;
      getList();
      getAll();
    };

    return{
      ...toRefs(state),
      getList,
      onSubmit,
      bandReset,
      handleCurrentChange,
      handleSizeChange,
      getAll
    }
  }
})
</script>
<style lang="scss" scoped>
.dialog-content{
  margin-top: -10px;
  .moudle{
    position: relative;
    .title{
      margin-left: 5px;
      // height: 20px;
      ::before{
        content: '';
        position: absolute;
        top: 10px;
        left: -4px;
        width: 3px;
        height: 16px;
        background: #4c84ff;
        transform: translateY(-50%);
        border-radius: 4px;
      }
    }
  }
  .first{
    display: flex;
    background-color: #e6f1fb;
    padding: 15px ;
    margin-top: 10px;
    min-height: 60px;
    font-size: 14px;
    .primary{
      text-align: center;
      padding: 5px;
      border-radius: 2px;
      background-color: #4c84ff;
      color: #ffffff;
      border: 1px solid #d8dce6;
    }
    .right{
      margin-left: 10px;
    }
    .bottom{
      background-color: #ffffff;
      text-align: center;
      padding: 5px;
      vertical-align: middle;
      border: 1px solid #d8dce6;
      border-radius: 2px;
    }
  }
  .content{
    min-height: 60px;
    background-color: #e6f1fb;
    margin-top: 10px;
    padding:  0 15px;
    border-radius: 2px;
    p{
      padding-top: 5px;
    }
  }
}
.total_box {
  background: #fff;
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  .grid-content {
    color: #333333;
    font-weight: 700;
    .single-table {
      width: 50%;
      border-collapse: collapse;
      color: #333;
      .total-title {
        font-size: 24px;
        width: 120px;
        font-weight: normal;
      }

      .title {
        font-size: 14px;
        color: #333333;
        font-weight: normal;
      }

      td {
        position: relative;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        border: 1px solid #d8dce6;
      }
    }
  }
}
</style>