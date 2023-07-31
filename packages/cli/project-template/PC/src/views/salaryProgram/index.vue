<template>
  <div id="pages">
    <div class="query_box">
      <el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
        <el-form-item label="薪资项" prop="itemName">
          <el-input v-model.trim="queryForm.itemName" clearable placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="content_list">
      <div class="table_list"></div>
      <div class="pagination" ref="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="queryForm.pageNo" :page-size="queryForm.limit" :page-sizes="[20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      queryForm: {
        pageNo: 1,
        limit: 20,
      },
    })
    return {
      ...toRefs(state),
    }
  }
})
</script>