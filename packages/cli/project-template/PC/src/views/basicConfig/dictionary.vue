<template>
  <div id="pages">
    <div class="query_box">
      <el-form :inline="true" :model="queryForm" ref="queryRef">
        <el-form-item label="数据字典名称" prop="dicName">
          <el-input v-model.trim="queryForm.dicName" clearable  placeholder="请输入数据字典名称"></el-input>
        </el-form-item>
        <el-form-item>
					<el-button type="primary" @click="onSubmit" >查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
      </el-form>
    </div>
    <div class="content_list">
      <div>
        <el-button type="primary" @click="addOrEdit()">新增数据字典</el-button>
      </div>
      <div class="table_list">
        <el-table :data="tableData" stripe  border style="width: 100%">
          <template #empty><SysEmpty></SysEmpty></template>
          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
          <el-table-column prop="dictType" label="数据字典编码" align="center"></el-table-column>
          <el-table-column prop="dictName" label="数据字典名称" align="center"></el-table-column>
          <el-table-column prop="description" width="150" show-overflow-tooltip label="描述" align="center"></el-table-column>
          <el-table-column prop="createOrUpdateUser" label="更新人" align="center"></el-table-column>
          <el-table-column prop="createOrUpdateTime" label="更新时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button type="text" @click="addOrEdit(scope.row)" :disabled="scope.row.dictName== '指标分类'">修改</el-button>
              <el-button type="text" @click="addDicDetail(scope.row)">添加字典项</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" ref="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageNo"
					:page-size="limit"
					:page-sizes="[20, 30, 50]"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				>
				</el-pagination>
			</div>
    </div>
    <el-dialog  center  :close-on-click-modal="false"  :title="dialogTitle" v-model="dialogVisible" width="600px" @close="handleCancel">
      <el-form :model="dicForm" ref="dicFormRef" :rules="dictFormRules" label-width="110px" label-position="right">
        <el-form-item label="数据字典名称" prop="dictName" required>
          <el-input v-model="dicForm. dictName" placeholder="请输入数据字典名称"></el-input>
        </el-form-item>
        <el-form-item label="数据字典编码" prop="dictType" required >
          <el-input v-model="dicForm.dictType" placeholder="请输入数据字典编码" :disabled="addType == 2"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="dicForm.description" type="textarea" show-word-limit maxlength="100" placeholder=""></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
				<span class="dialog-footer">
					<el-button type="default" @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleCommit" >保 存</el-button>
				</span>
			</template>
    </el-dialog>

    <dic-detail ref="dicDetailRef"></dic-detail>
  </div>
</template>

<script lang="ts">
import {reactive, defineComponent,toRefs, onMounted, getCurrentInstance, ref, nextTick  } from 'vue';
import { getDicList, insertDictType, updataDictType } from '/@/api/baseConfig/index.ts';
import dicDetail from './src/dicDetail.vue'
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'name',
  components: { dicDetail },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const labelPosition = ref('right')
    const dicDetailRef = ref()
    const dicFormRef = ref();
    const state = reactive({
      queryForm: {
        dicName: '',
      },
      tableData: [],
      pageNo: 1,
      limit: 20,
      total: 0,
      dialogVisible: false,
      dialogTitle: '新增数据字典',
      addType: 1,
      dicForm: {
        id: '',
        dictName: '',
        dictType: '',
        description: '',
      },
      dictFormRules: {
        dictName: [{required: true, message: '请输入数据字典名称', trigger: ['blur','change']}],
        dictType: [{required: true, message: '请输入数据字典编码', trigger: ['blur','change']}],
      }
    });
    onMounted(() => {
      getList()
    })

    const onSubmit = ()  => {
      getList()
    }

    const handleCancel = () => {
      state.dialogVisible = false
      proxy.$refs.dicFormRef.resetFields();
    }
    const handleCommit = async () => {
      dicFormRef.value.validate(async (valid: any) => {
        if (!valid) return false;
        
        if(state.addType == 2) {
          //修改
          let params = {
            id: state.dicForm.id,
            dictName: state.dicForm.dictName,
            description: state.dicForm.description
          }
          let res = await updataDictType(params)
          if(res.status == 0){
            state.dialogVisible = false
            ElMessage.success('修改成功')
            proxy.$refs.dicFormRef.resetFields();
            getList()
          }else{
            ElMessage.error(res.message)
          }
        }else {
          let res = await insertDictType(state.dicForm)
          if(res.status == 0){
            state.dialogVisible = false
            ElMessage.success('新增成功')
            proxy.$refs.dicFormRef.resetFields();
            getList()
          }else{
            ElMessage.error(res.message)
          }
        }
      })
      
    }
    
    const bandReset = () => {
      proxy.$refs.queryRef.resetFields();
    }

    const addDicDetail = (row: any) => {
      console.log(dicDetailRef)
      dicDetailRef.value.open(row)
    }

    const addOrEdit = (row: any) => {
      console.log(row)
      state.dialogVisible = true
      if(row) {
        //编辑
        state.addType = 2
        state.dialogTitle = '修改数据字典'
        nextTick(() => {
          state.dicForm = {...row}
        })
        // state.dicForm.id = row.id
        // state.dicForm.dictName = row.dictName
        // state.dicForm.dictType = row.dictType
        // state.dicForm.description = row.description
      }else {
        //新增
        state.addType = 1
        state.dialogTitle = '新增数据字典'
        proxy.$refs.dicFormRef.resetFields();
      }

    }

    const getList = async() => {
      let params = {
        pageNum: state.pageNo,
        pageSize: state.limit,
        dictName: state.queryForm.dicName,
      }
      let res = await getDicList(params)
      console.log(res)
      if(res.status == 0) {
        state.tableData = res.data.resultData
        state.total = res.data.total
      }
    }

    const handleSizeChange = (val: number) => {
			state.limit = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.pageNo = val;
			getList();
		};

    return {
      ...toRefs(state),
      getList,
      handleSizeChange,
      handleCurrentChange,
      addOrEdit,
      onSubmit,
      bandReset,
      handleCancel,
      handleCommit,
      addDicDetail,
      dicDetailRef,
      dicFormRef
    }
  },
  
  
})
</script>