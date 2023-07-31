<template>
  <div id="pages">
    <div class="query_box">
      <el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
        <el-form-item label="所属中心" prop="unit">
					<el-input v-model.trim="queryForm.unit" clearable placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item label="岗位名称/代码" prop="processPosition">
					<el-input v-model.trim="queryForm.processPosition" clearable placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
       </el-form>
    </div>
    <div class="content_list">
      <div>
        <el-table :data="tableData" stripe  border style="width: 100%">
          <template #empty><SysEmpty></SysEmpty></template>
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
					<el-table-column prop="unitName" label="所属中心" width="230" align="center"></el-table-column>
					<el-table-column prop="processPositionName" label="工序岗位" min-width="150" align="center">
            <template #default="scope">
              {{scope.row.processPositionName}}  {{scope.row.processPositionCode}}
            </template>
          </el-table-column>
          <el-table-column prop="attributeDay" label="班次属性" min-width="150" align="center"></el-table-column>
          <el-table-column prop="performanceCoefficient" label="绩效系数" min-width="150" align="center"></el-table-column>
          <el-table-column prop="" label="生效日期" min-width="150" align="center">
            <template #default="scope">
              {{scope.row.effectDate}}
            </template>
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
    </div>
  </div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, nextTick, ref, toRaw } from 'vue';
import {getPage, getSectionList} from '/@/api/performanceCoefficient/index.ts';

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
      },
      total: 0,
      tableData: [],
    })
    const getList =  async () => {
      let res = await getPage(state.queryForm)
      console.log(res)
      if(res.status == 0) {
        state.tableData = res.data.resultData
        state.total = res.data.total
      }
    }

    const onSubmit = () => {
      state.queryForm.pageNo = 1
      getList()
    }

    const bandReset = () => {
      proxy.$refs.queryRef.resetFields();
    }

    onMounted(() => {
      getList()
    })

    const handleSizeChange = (val: number) => {
      state.queryForm.limit = val;
      getList();
    };
    const handleCurrentChange = (val: number) => {
      state.queryForm.pageNo = val;
      getList();
    };

    return{
      ...toRefs(state),
      getList,
      onSubmit,
      bandReset,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>
<style lang="scss" scoped>
p{
  line-height: 24px;
  span{
    font-weight: 600;
  }
}
</style>