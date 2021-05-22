<template>
  <div>
    <div class="titles">
      <i class="el-icon-back goLeft pointer" @click="goBack"></i>
      <span class="domainName">订单详情</span>
    </div>
    <div class="detail">
      <!-- <div class="detail-title">
        <div class="detail-header">
          <div class="left">
            <i class="el-icon-shopping-cart-full orange"></i>
            <span style="margin-right: 24px;font-weight: 600;font-size: 14px" class="orange">待支付</span>
            <span style="margin-right: 18px">实付金额：<span class="orange">40377.00元</span></span>
            <span>请在<span>2021-06-02 09:57:40 前完成支付</span>，逾期订单及对应优惠将自动取消</span>
          </div>
          <div class="right">
            <el-button size="mini" @click="cancle">取消订单</el-button>
            <el-button type="warning" size="mini" @click="submit">立即付款</el-button>
          </div>
        </div>
      </div> -->
      <div class="order-message">
        <div class="item">
          <div class="items">
            <div class="left">订单号</div>
            <div class="right">{{message.orderId}}</div>
          </div>
          <div class="items">
            <div class="left">订单创建人</div>
            <div class="right">{{message.personName}}</div>
          </div>
          <div class="items">
            <div class="left">订单付款人</div>
            <div class="right">{{message.personName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="items">
            <div class="left">订单类型</div>
            <div class="right">{{message.orderType}}</div>
          </div>
          <div class="items">
            <div class="left">创建时间</div>
            <div class="right">{{message.orderTime}}</div>
          </div>
          <div class="items">
            <div class="left">{付款时间}</div>
            <div class="right">{{message.orderTime || '-----'}}</div>
          </div>
        </div>
      </div>
      <div class="order-info">
        <h3 class="header">订单信息</h3>
        <el-table v-loading="loading" :data="tableData" style="width: 100%">
          <el-table-column prop="orderId" label="订单号" align="left"></el-table-column>
          <el-table-column prop="orderName" label="产品" align="left" width="220"></el-table-column>
          <el-table-column label="规格" align="left" width="220">
            <template slot-scope="scope">
              <span><span style="color: rgba(0,0,0,.4)">域名：</span>{{(scope.row.domainName + scope.row.domainSuffixName) || ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="domainCost" label="单价" align="left" width="125"></el-table-column>
          <el-table-column prop="1" label="数量" align="left" width="125">
            <template>x 1</template>
          </el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" align="center" width="160"></el-table-column>
        </el-table>
        <div class="bottom">
          <span>订单实付：<span class="orange" style="font-size: 16px">{{message.orderAmount || '' + '元'}}</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {orderDetail} from '../../base/serve'
export default {
  data () {
    return {
      message: {},
      tableData: [],
      loading: false
    }
  },
  created () {

  },
  mounted () {
    this.getMessage()
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    },
    async getMessage () {
      try {
        const data = await orderDetail({orderId: this.$route.query.orderId})
        if (data) {
          this.message = data
          this.tableData = [{...data}]
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
</script>
<style scoped>
.goLeft{
  color: #006eff;
  font-size: 20px;
  font-weight: 600;
}
.titles{
  border-bottom: 0 solid;
  background-color: #fff;
  margin: 0;
  padding-left: 10px;
}
.domainName {
  font-size: 16px;
  font-weight: 700;
  color: #171d25;
  margin-left: 15px;
}
.detail {
  margin-top: 20px;
  font-size: 12px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(54,58,80,.32);
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  border-radius: 0;
  color: rgba(0,0,0,.9);
}
.detail-title{
  padding: 10px;
}
.detail-header{
  font-size: 12px;
  box-sizing: border-box;
  padding: 6px 0 16px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
  display: flex;
  width: 100%;
  align-items: center;
  color: rgba(0,0,0,.9);
}
.detail-header .left{
  font-size: 12px;
  margin-right: 24px;
  height: 48px;
  display: flex;
  align-items: center;
}
.detail-header .left i{
  font-size: 48px;
  margin-right: 12px;
}
.detail-header .right{
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
}
.orange{
  color: #ff7643;
}
.el-button--mini {
  margin-left: 10px;
  border-radius: 0;
}
.el-button--warning{
  background-color: #ff7200;
}
.order-message {
  display: flex;
  padding: 10px;
}
.order-message .item{
  flex: 1;
}
.order-message .item .items {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.order-message .item .items .left{
  width: 80px;
  color: rgba(0,0,0,.4);
}
.order-message .item .items .right{
  flex: 1;
  color: rgba(0,0,0,.9);
}
.order-info{
  padding: 10px;
}
.order-info .header{
  padding-top: 26px;
  padding-bottom: 20px;
}
.order-info .bottom {
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
}
.el-table--fit{
  border: 1px solid #cfd5de;
  border-bottom: 0;
}
</style>
