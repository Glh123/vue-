<template>
  <div>
    <div class="titles">我的订单</div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="orderId" label="订单号" align="left"></el-table-column>
      <el-table-column prop="orderName" label="产品名称" align="left" width="260"></el-table-column>
      <el-table-column prop="orderType" label="类型" align="left" width="150"></el-table-column>
      <el-table-column prop="orderTime" label="订单创建时间" align="left" width="200"></el-table-column>
      <el-table-column prop="orderStatus" label="状态" align="left" width="170"></el-table-column>
      <el-table-column prop="five_year" label="操作" align="left" width="180">
        <template slot-scope="scope">
          <!-- <span class="operate pointer color-blue">付款</span>
          <span class="operate pointer color-blue" @click="cancle(scope.row)">取消</span> -->
          <span class="operate pointer color-blue" @click="detailBtn(scope.row)">详情</span>
        </template>
      </el-table-column>
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
import {getOrderMessage} from '../../base/serve'
export default {
  data () {
    return {
      loading: true,
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  created () {

  },
  mounted () {
    this.getOrder()
  },
  methods: {
    pageChange (pageNum) {
      this.getOrder(pageNum)
    },
    async getOrder (pageNum = this.currentPage) {
      this.loading = true
      try {
        const data = await getOrderMessage({pageNum})
        if (data) {
          this.tableData = data.orderList
          this.total = data.count
          this.loading = false
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    // cancle (value) {
    //   this.$confirm(`是否取消订单${value.id}`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!'
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    detailBtn (value) {
      this.$router.push({path: 'orderDetail', query: {orderId: value.orderId}})
    }
  }
}
</script>
<style scoped>
.titles{
  border-bottom: 0 solid;
  background-color: #fff;
  margin: 0;
  padding-left: 10px;
  margin-bottom: 50px;
}
.el-pagination{
  display: flex;
  justify-content: center;
}
.color-blue{
  color: #006eff;
}

.operate {
  margin-right: 10px;
  font-size: 12px;

}
</style>
