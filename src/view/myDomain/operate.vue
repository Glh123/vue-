<template>
  <div style="margin-top: 30px">
    <el-table v-loading="loading" :data="content" style="width: 100%">
      <el-table-column prop="operationContent" label="操作行为" align="left" ></el-table-column>
      <el-table-column prop="operationTime" label="操作时间" align="center" width="560"></el-table-column>
    </el-table>
    <div style="margin-top: 20px" v-if="total">
      <el-pagination background layout="prev, pager, next"
        :page-size="pageSize" :total="total" :current-page="currentPage"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import {getOperateMessage} from '../../base/serve'
export default {
  data () {
    return {
      loading: true,
      content: [],
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  created () {

  },
  mounted () {
    this.getMessage()
  },
  methods: {
    pageChange (pageNum) {
      this.getMessage(pageNum)
    },
    async getMessage (pageNum = this.currentPage) {
      this.loading = true
      try {
        const data = await getOperateMessage({pageNum})
        if (data) {
          this.content = data.opList
          this.total = data.count
          this.loading = false
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
</script>
<style scoped>
.el-pagination{
  display: flex;
  justify-content: center;
}
</style>
