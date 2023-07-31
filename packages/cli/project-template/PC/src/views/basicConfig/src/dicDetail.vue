<template>
  <el-drawer v-model="dicData.flag" direction="rtl" size="50%">
    <template #title>
			<div class="title-icon">
				<SvgIcon :name="'elementSetting'"></SvgIcon><span> {{ dicData.title }}</span>
			</div>
		</template>
    <div>
      <div class="content_list content">
        <div>
          <el-button type="primary" @click="addDicDetail()">新 增</el-button>
        </div>
        
      <div class="table_list">
        <el-table :data="tableData" stripe  border style="width: 100%">
          <el-table-column prop="dictItemCode" label="字典项编码" width="140" align="center"></el-table-column>
          <el-table-column prop="dictItem" label="字典项" align="center"></el-table-column>
          <el-table-column prop="dictOrder" label="排序" align="center"></el-table-column>
          <el-table-column prop="labelState" label="状态" align="center">
            <template #default="scope">
              {{ scope.row.labelState == 1 ? '启用': '禁用' }}
            </template>
          </el-table-column>
          <el-table-column prop="dicCode" label="操作" align="center"  width="100" >
            <template #default="scope">
              <el-button type="text" @click="addDicDetail(scope.row)" :disabled="scope.row.dictItem == '一票否决'">修改</el-button>
              <el-button type="text" @click="handleChangeStatus(scope.row)" v-if="scope.row.labelState == 1" :disabled="scope.row.dictItem == '一票否决'">禁用</el-button>
              <el-button type="text" @click="handleChangeStatus(scope.row)" v-else>启用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
      <div class="pagination" ref="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageNum"
					:page-size="pageSize"
					:page-sizes="[20, 30, 50]"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				>
				</el-pagination>
			</div>
    </div>
    <el-dialog  center  :close-on-click-modal="false"  :title="dialogTitle" v-model="dialogVisible" width="600px" @close="handleCancel">
      <el-form :model="dicDetailForm" ref="dictDetailRef" :rules="dictDetailRules" label-width="110px" label-position="right">
        <el-form-item label="字典项名称" required prop="dictItem">
          <el-input v-model="dicDetailForm.dictItem" placeholder="请输入字典项名称"></el-input>
        </el-form-item>
        <el-form-item label="字典项编码" required prop="dictItemCode">
          <el-input v-model="dicDetailForm.dictItemCode" placeholder="请输入字典项编码" :disabled="addType == 2"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="dictOrder">
          <el-input v-model="dicDetailForm.dictOrder"  placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button type="default" @click="handleCancel">取 消</el-button>
					<el-button type="primary" @click="handleCommit">保 存</el-button>
				</span>
			</template>
    </el-dialog>
  </el-drawer>
</template>

<script lang="ts">
import Vue, { defineComponent, reactive, toRefs, getCurrentInstance,ref, nextTick } from 'vue';
import { getDicDetail, dictDataInsert, dictDateUpdate, dictDataDelete } from '/@/api/baseConfig/index';
import { ElMessage } from 'element-plus';
export default defineComponent({
  setup(props) {
    const { proxy } = getCurrentInstance() as any;
    const dictDetailRef = ref()
    const state = reactive({
      dicData: {
        flag: false,
        title: '数据字典-明细'
      },
      pageNum: 1,
      pageSize: 20,
      total: 0,
      dictType: '',
      tableData: [],
      dialogVisible: false,
      dialogTitle: '新增字典项',
      addType: 1,
      dicDetailForm: {
        dictItem: '',
        dictItemCode: '',
        dictOrder: '',
        id: '',
        labelState: 1,
      },
      dictDetailRules: {
        dictItem: [{required: true, message: '请输入字典项名称', trigger: ['blur','change']}],
        dictItemCode: [{required: true, message: '请输入字典项编码', trigger: ['blur','change']}],
      }
    })
    const getList = async () => {
      let params = {
        dictType: state.dictType,
        pageNum: state.pageNum,
        pageSize: state.pageSize,
      }
      let res = await getDicDetail(params)
      if(res.status == 0){
        state.tableData = res.data.resultData
        state.total = res.data.total
      }
    }
    const addDicDetail = (row: any) => {
      state.dialogVisible = true
      if(row) {
        state.addType = 2
        state.dialogTitle = '修改字典项'
        nextTick(() => {
          state.dicDetailForm = {...row}
        })
        // state.dicDetailForm.id = row.id
        // state.dicDetailForm.dictItem = row.dictItem
        // state.dicDetailForm.dictItemCode = row.dictItemCode
        // state.dicDetailForm.dictOrder = row.dictOrder
      }else {
        state.addType = 1
        state.dialogTitle = '新增字典项'
        state.dicDetailForm.dictOrder = state.total + 1
      }
    }

    const handleChangeStatus = async (row: any) => {
      let message = !row.labelState ? '启用成功': '禁用成功'
      row.labelState = !row.labelState
      let params = {dictType: state.dictType}
      let res = await dictDataDelete({...params,...row})
      if(res.status == 0) {
        ElMessage.success(message)
        getList()
      }else{
        ElMessage.error(res.message)
      }
    }
    const handleCancel = () => {
      state.dialogVisible = false
      nextTick(() => {
        proxy.$refs.dictDetailRef.resetFields();
      })
      
    }

    const handleCommit = async() => {
      dictDetailRef.value.validate(async(valid: any) => {
        if(!valid) return false;
        
        if(state.addType == 1) {
          let res = await dictDataInsert({...{dictType: state.dictType},...state.dicDetailForm})
          if(res.status == 0) {
            state.dialogVisible = false
            ElMessage.success('新增成功')
            proxy.$refs.dictDetailRef.resetFields();
            getList()
          }else{
            ElMessage.error(res.message)
          }
        }else{
          let res = await dictDateUpdate({...{dictType: state.dictType},...state.dicDetailForm})
          if(res.status == 0) {
            state.dialogVisible = false
            ElMessage.success('修改成功')
            proxy.$refs.dictDetailRef.resetFields();
            getList()
          }else{
            ElMessage.error(res.message)
          }
        }
      })
      
    }
    const open = (row:any) => {
      console.log(row)
      state.dicData.flag = !state.dicData.flag
      state.dictType = row.dictType
      getList()
    }

    const handleSizeChange = (val: number) => {
			state.pageSize = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.pageNum = val;
			getList();
		};
    return {
      ...toRefs(state),
      open,
      getList,
      handleSizeChange,
      handleCurrentChange,
      addDicDetail,
      handleCancel,
      handleCommit,
      handleChangeStatus,
      dictDetailRef
    }
  }
})
</script>
<style lang="scss" scoped>
.content{
  padding: 0 16px !important;
}

.title-icon {
	.el-icon {
		color: $color-primary;
		font-size: 20px;
		vertical-align: middle;
		margin-right: 5px;
	}
	line-height: 30px;
	height: 30px;
}
</style>