<template>
  <div style="background-color: #fff;">
    <div class="titles">域名查询</div>
    <div class="container">
      <div class="content" style="display: flex">
        <div class="result">
          <div class="search">
            <div class="input">
              <el-input v-model="domainName" placeholder="输入您想注册的域名，例如：qcloud"></el-input>
              <el-button type="primary" @click="query">查询</el-button>
            </div>
            <div class="domainList ">
              <div :class="domainAllSelected ? 'item pointer active' : 'item pointer'" @click="domainSelectedAll">
                <span>全部</span>
                <span class="selectedImg" v-if="domainAllSelected"></span>
              </div>
              <div :class="item.isSelected ? 'item pointer active' : 'item pointer'" v-for="item in domainList" :key="item.domainSuffixId" @click="domainSelected(item.domainSuffixId)">
                <span>{{item.domainSuffixName}}</span>
                <span class="selectedImg" v-if="item.isSelected"></span>
              </div>
              <!-- <div class="item pointer">展开</div> -->
            </div>
            <div class="resultList">
              <div class="resulttitle">查询结果</div>
              <div class="searchList">
                <div class="item" v-for="item in searchList" :key="item.domainSuffixId">
                  <div :class="item.register == true ? 'name noRegisterColor' : 'name'">{{item.domainName+item.domainSuffixName}}</div>
                  <div class="whoisSearch pointer" v-if="item.register" @click="goWhoIs(item.domainName + item.domainSuffixName)">WhOIS 查询</div>
                  <div class="price" v-if="item.register!=true">
                    <div class="allPrice"><span>{{item.cost}}</span>元/首年</div>
                    <!-- <div class="firstPrice"><span>{{item.firstPrice}}</span>元/续费</div> -->
                  </div>
                  <div class="register" v-if="item.register">已被注册</div>
                  <el-button type="primary" size="small" plain v-if="item.register!=true && !item.shopping" @click="addShopping(item.domainName, item.domainSuffixId)">加入购物车</el-button>
                  <span class="register" v-if="item.register!=true && item.shopping">√ 已加入</span>
                </div>
              </div>
              <div class="none-tip" v-if="searchList">您还没有查询域名，请在页面上方的输入框输入您要查询的内容</div>
            </div>
          </div>
        </div>
        <div class="purchase">
          <div class="title">
            <div class="num">购物车({{shopList.length}})</div>
            <div class="clear pointer" @click="deleteAllShopping">清空</div>
          </div>
          <div class="selectList" v-if="shopList.length">
            <div class="item" v-for="(item,index) in shopList" :key="index">
              <span style="flex:1">{{item.domainName+item.domainSuffixName}}</span>
              <i class="el-icon-delete pointer" @click="deleteShopping(item.shoppingCartId,item)"></i>
            </div>
          </div>
          <div class="none-tip" v-if="shopList.length==0">尚未选择域名</div>
          <div class="mai">
            <div class="shopcart-btn pointer" @click="purchuse">立即购买</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="购买域名" :visible.sync="dialogVisible" width='40%' :before-close="handleClose">
      <el-table :data="shopList">
        <el-table-column label="产品" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.domainName + scope.row.domainSuffixName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别" width="150">
          <template>新购</template>
        </el-table-column>
        <el-table-column label="时长">
          <template slot-scope="scope">
            <el-radio-group :change="timeChange(scope.row)" v-model="scope.row.purseTime" style="margin-bottom: 30px;" size="mini">
              <el-radio-button label="1">1年</el-radio-button>
              <el-radio-button label="3">3年</el-radio-button>
              <el-radio-button label="5">5年</el-radio-button>
              <el-radio-button label="10">10年</el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="price">
        <span>总计费用：<span class="price-font">{{allPrice}}</span></span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {domainList, domainQuery, addShop, deleteShop, getShop, getOrderPrice, submitOrder} from '../../base/serve'
export default {
  data () {
    return {
      domainName: '', // 输入域名名称
      domainList: [], // 域名列表
      domainSelectedList: [], // 选中的域名
      domainAllSelected: false, // 域名全选标志
      searchList: [], // 查询后的结果
      shopList: [], //  购物车List
      dialogVisible: false,
      tabPosition: '1',
      allPrice: ''
    }
  },
  watch: {
    domainList () {
      this.domainAllSelected = true
      this.domainSelectedList = []
      this.domainList.forEach((value) => {
        if (value.isSelected === false) {
          this.domainAllSelected = false
        } else {
          this.domainSelectedList.push({...value})
        }
      })
    }
    // searchList () {

    // }
  },
  created () {

  },
  mounted () {
    this.getDomainList()
    this.getShopping()
  },
  methods: {
    goWhoIs (domainName) {
      this.$router.push({path: 'whois', query: {domainName}})
    },
    initSelectList () {
      this.searchList.forEach((value) => {
        if (value.shopping === true) {
          value.purseTime = 1
          this.shopList.push(value)
        }
      })
    },
    async getDomainList () {
      try {
        const data = await domainList()
        this.domainList = data.map((value) => {
          value.isSelected = false
          return value
        })
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 查询
    async query () {
      // let str = this.input
      let suffixList = []
      this.domainSelectedList.forEach((value) => {
        suffixList.push(value.domainSuffixId)
      })
      try {
        this.searchList = []
        this.searchList = await domainQuery({domainName: this.domainName, suffixList})
      } catch (error) {
        this.$message.error(error.message)
      }
    },

    // 全选 域名
    domainSelectedAll () {
      this.domainAllSelected = !this.domainAllSelected
      this.domainList.forEach((value, index) => {
        value.isSelected = this.domainAllSelected
        this.$set(this.domainList, index, value)
      })
    },
    // 单选 域名
    domainSelected (id) {
      this.domainList.forEach((value, index) => {
        if (value.domainSuffixId === id) {
          value.isSelected = !value.isSelected
          this.$set(this.domainList, index, value)
        }
      })
    },
    // 获取购物车
    async getShopping () {
      try {
        const data = await getShop()
        if (data) {
          data.map((value) => {
            value.purseTime = 1
            return {...value}
          })
          this.shopList = data
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    // 加入购物车
    async addShopping (domainName, domainSuffixId) {
      try {
        const data = await addShop({domainSuffixId, domainName})
        if (data) {
          this.searchList.forEach((value, index) => {
            if (value.domainSuffixId === domainSuffixId) {
              value.shopping = !value.shopping
              this.$set(this.searchList, index, value)
            }
          })
          this.getShopping()
          this.$message.success('添加成功')
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },

    // 清空所有购物车
    async deleteAllShopping () {
      if (this.shopList.length === 0) {
        return
      }
      this.$confirm('此操作将清空购物车, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteShopping()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消清空购物车'
        })
      })
    },
    // 购物车删除某个
    async deleteShopping (shoppingCartId, item) {
      try {
        let data = ''
        if (shoppingCartId) {
          data = await deleteShop({shoppingCartId})
        } else {
          data = await deleteShop()
        }
        if (data) {
          if (this.searchList.length) {
            this.query()
          }
          this.getShopping()
          this.$message.success('删除成功')
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    purchuse () {
      if (this.shopList.length) {
        this.dialogVisible = this.shopList.length > 0
      }
    },
    // 立即购买
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async submit () {
      try {
        const list = []
        this.shopList.forEach((value) => {
          list.push({domainSuffixId: value.domainSuffixId, domainName: value.domainName, time: Number(value.purseTime)})
        })
        const data = await submitOrder({list})
        console.log(data)
        if (data) {
          this.$message.success('购买成功')
          this.dialogVisible = false
        } else {
          this.$message.error('购买失败')
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    timeChange () {
      const params = []
      this.shopList.forEach((value) => {
        params.push({domainSuffixId: value.domainSuffixId, time: Number(value.purseTime)})
      })
      this.getmoney(params)
    },
    async getmoney (list) {
      const data = await getOrderPrice({list})
      if (data) {
        this.allPrice = data
      }
    }
  }
}
</script>
<style scoped>
.content{
  min-height: 100%;
  /* display: flex; */
}
.result{
  padding: 25px 30px;
  width: 885px;
  min-height: 650px;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
}

.input{
  display: flex;
}
.input /deep/ .el-input__inner{
  height: 50px;
}
.input /deep/ .el-button{
  width: 140px;
}
.search .domainList{
  display: flex;
  margin-left: -10px;
  margin-top: 15px;
  flex-wrap: wrap;
  margin-bottom: 35px;
}
.search .domainList .item{
  box-sizing: border-box;
  width: 136px;
  height: 35px;
  margin: 0 0 10px 10px;
  border: 1px solid #c2c2c2;
  text-align:center;
  line-height: 35px;
  transition: background .2s ease;
  position: relative;
}
.search .domainList .active{
  border: 1px solid #00a4ff;
}
.selectedImg {
  position: absolute;
  bottom: 0;
  right: 0;
  display: inline-block;
  width: 16px;
  height: 15px;
  background-position: -1px -18px;
  background-size: 46px 39px;
  background-image: url('https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/domain/new/sprite/domain@2x-202003261728.png');
}
.search .domainList .item:hover{
  background-color: #c2c2c2;
}
.search .resultList .resulttitle{
  font-size: 18px;
  color: #000;
  font-weight: 400;
  margin-bottom: 20px;
  overflow: hidden;
}
.search .resultList .none-tip{
  color: #999;
  font-size: 14px;
  text-align: center;
  margin: 80px 20px;
}
 .searchList{
  display: flex;
  flex-direction: column;
  border-top: 1px solid #f2f2f2;
}
.searchList .item {
  display: flex;
  transition: background .2s ease;
  min-height: 50px;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 10px;
  font-size: 14px;
}
.searchList .item:hover{
  background-color: #c2c2c2;
}
.searchList .item .name{
  flex: 1;
  font-size: 14px;
}
.searchList .item .noRegisterColor{
  color: #999;
}
.searchList .item .whoisSearch{
  width: 92px;
  color: rgb(0, 0, 0);
  text-align: center;
}
.searchList .item .register{
  color: #999;
  width: 90px;
  text-align: center;
}
.searchList .item .price{
  color: black;
  min-width: 90px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.searchList .item .price span{
  color: red;
}
.searchList .item .el-button{
  margin-left: 25px;
}
.purchase{
  padding: 25px 20px 0;
  flex: 1;
}
.purchase .title{
  display: flex;
  color: #000;
  font-size: 18px;
  padding-bottom: 10px;
}
.purchase .title .num{
  flex: 1;
}
.purchase .title .clear{
  color: #00a4ff;
  font-size: 14px;
  position: relative;
  top: 5px;
}
.purchase .selectList{
  display: flex;
  flex-direction: column;
  min-height: 228px;
  max-height: 330px;
  overflow-y: auto;
}
.purchase .selectList .item{
  display: flex;
  height: 50px;
  font-size: 14px;
  line-height: 50px;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 10px;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
}
.purchase .selectList .item:hover{
  background-color: #c2c2c2;
}
.purchase .selectList .item i{
  opacity: 0;
  margin-right: 10px;
}
.purchase .selectList .item i:hover{
  color: #006eff;
}
.purchase .selectList .item:hover i{
  opacity: 1;
}
.purchase .none-tip{
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  min-height: 228px;
  max-height: 330px;
  line-height: 158px;
}
.purchase .mai{
  position: relative;
  padding: 0 20px 20px;
  border-top: 1px solid #f2f2f2;
}
.shopcart-btn {
  transition: background .2s ease;
  margin-top: 20px;
  width: 100%;
  height: 35px;
  color: #fff;
  background: #ff7a22;
  font-size: 14px;
  display: block;
  text-align: center;
  line-height: 35px;
}
.el-radio-group{
  margin-bottom: 0!important;
}
.price{
  font-size: 14px;
  margin-top: 10px;
}
.price .price-font {
  font-size: 25px;
  line-height: 30px;
  margin-left: 3px;
  margin-right: 3px;
  position: relative;
  bottom: -3px;
  color: #ed711f;
}
</style>
