<template>
  <div class="domain-price">
    <h3 class="tab-content-title">域名价格总览</h3>
    <div class="c-msg large">
      <div class="c-msg-info">
        <p><span>本页面所示域名价格仅为常规域名价格，不包含白金域名、保留词等特殊域名，实际价格请以最终结算结果为准。</span></p>
      </div>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 80%">
      <el-table-column  prop="domain_suffix_name" label="域名" align="center" width="300">
        <template slot-scope="scope">
            <span class="domain-name">{{scope.row.domain_suffix_name}}</span>
            <span class="domain-info">{{scope.row.domain_suffix_content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册价格" align="center">
        <el-table-column prop="one_year" label="1年" align="center" ></el-table-column>
        <el-table-column prop="three_year" label="3年" align="center" width="157"></el-table-column>
        <el-table-column prop="five_year" label="5年" align="center" width="157"></el-table-column>
        <el-table-column prop="ten_year" label="10年" align="center" width="157"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {domainPrice} from '../../base/serve'
export default {
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  created () {

  },
  mounted () {
    this.getDomainPrice()
  },
  methods: {
    async getDomainPrice () {
      try {
        this.tableData = await domainPrice()
      } catch (error) {
        this.$message.error(error)
      }
    }
  }
}
</script>
<style scoped>
p, h3{
  margin: 0;
}
.domain-price{
  background: #fff;
  padding: 30px;
  min-height: 700px;
}
.tab-content-title {
  border-left: 2px solid #ffb800;
  padding-left: 8px;
  font-size: 18px;
  color: #000;
  font-weight: 400;
  margin-bottom: 24px;
  overflow: hidden;
}
.large {
    margin-top: 20px;
}
.c-msg {
    position: relative;
    margin: 20px 0 50px 0;
    background-color: #d9e9ff;
    font-size: 12px;
    line-height: 20px;
    color: #1d529b;
}
.c-msg-info {
    padding: 11px 20px;
}
.cell{
  position: relative;
  display: flex;
  overflow: hidden;
}
.domain-name{
  display: inline-block;
  width: 30%;
  text-align: left;
  position: absolute;
  left: 13px;

}

</style>
