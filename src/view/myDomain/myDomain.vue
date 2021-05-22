<template>
  <div>
    <div class="titles">我的域名</div>
    <div class="tc-15-msg" >
      <div class="tip-info">
        <p><span>- 【上新】腾讯云域名特惠包全新上线，限时限量发售，欢迎抢购！有批量注册需求的用户千万不要错过噢~
          <a href="https://buy.cloud.tencent.com/packs" target="_blank">立即前往抢购</a></span>
        </p>
        <p>
          <span>- 用户之声：欢迎您提交域名产品的功能/体验/文档等方面的需求和建议，期待您的声音！
            <a href="https://support.qq.com/products/291534" target="_blank">点此提交</a>
          </span>
        </p>
        <p>
          <span>- 现接相关注册局通知，域名注册后必须在规定时间内完成域名实名认证，否则会被注册局暂停解析（Serverhold），无法正常访问。
          <a href="https://cloud.tencent.com/document/product/242/6707?_ga=1.249383303.1880548126.1520332247" target="_blank">查看详情</a></span></p><p data-reactid=".0.0.1.1.$=11.$0.0.0.$3"><span data-reactid=".0.0.1.1.$=11.$0.0.0.$3.0">- 域名实名信息需要提交注册局进行审核，受特殊时期影响，部分注册局的审核时间有所延迟，实名信息审核可能超出一般工作日。请各位用户耐心等待，不便之处，敬请谅解。</span>
        </p>
      </div>
    </div>
    <div class="mydomain-tab">
      <div class="tab-left pointer" @click="goRegisterDomain">注册域名</div>
      <div style="flex: 1"></div>
      <el-input
        class="inputSearch"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        @change="searchBtn"
        @input="searchBtn"
        v-model="name">
      </el-input>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column tooltip-effect="123" cell-class-name="color-blue"  prop="date" label="域名" align="left" width="250">
        <template slot-scope="scope">
            <span class="pointer color-blue" @click="domainMessageBtn(scope.row)">{{scope.row.domainName + scope.row.domainSuffixName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="domainStatus" label="服务状态" align="left" width="200">
        <template slot="header">
          <span style="margin-right:5px">服务状态</span>
          <el-tooltip placement="bottom" effect="light">
            <div slot="content"><span>腾讯云域名的服务状态</span></div>
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{scope.row.domainStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dnsStatus" label="DNS状态" align="left" width="200">
        <template slot="header">
          <span style="margin-right:5px">DNS状态</span>
          <el-tooltip placement="bottom" effect="light">
            <div slot="content"><span style="color: green">绿色代表正常</span><br/><span style="color: red">红色代表暂停解析</span></div>
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span :style="{color: scope.row.dnsStatus === '正常' ? 'green' : 'red'}">{{scope.row.dnsStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="注册时间" align="left" width="200"></el-table-column>
      <el-table-column prop="endTime" label="到期时间" align="left" width="200"></el-table-column>
      <el-table-column prop="content" label="操作" align="left" >
        <template slot-scope="scope">
          <span class="operate pointer color-blue" @click="domainMessageBtn(scope.row)">管理</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getMyDomain} from '../../base/serve'
import lodash from 'lodash'
export default {
  data () {
    return {
      name: '',
      loading: false,
      tableData: []
    }
  },
  created () {

  },
  mounted () {
    this.getDomain()
  },
  methods: {
    searchBtn () {
      this.getDomain()
    },
    getDomain: lodash.debounce(async function () {
      this.tableData = await getMyDomain({name: this.name})
    }, 300),
    goRegisterDomain () {
      this.$router.push('query')
    },
    domainMessageBtn (message) {
      this.$router.push({path: 'DomainMessage', query: { doDoSuffixId: message.doDoSuffixId, domainName: message.domainName + message.domainSuffixName }})
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
}
.tc-15-msg{
  font-size: 12px;
  line-height: inherit;
  padding: 10px 30px 10px 20px;
  vertical-align: middle;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  max-width: 1360px;
  margin-top: 20px;
  color: #002da0;
  border: 1px solid #d5e7ff;
  background-color: #d5e7ff;
}
.mydomain-tab{
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
}
.mydomain-tab .tab-left{
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  background-color: #006eff;
  color: #fff;
  border: 1px solid #006eff;
  border-radius:3px;
}
.mydomain-tab .inputSearch {
  width: 180px;
  height: 30px;
}

.color-blue{
  color: #006eff;
}
/* .el-table--fit{
  padding-left: 10px;
} */
.operate {
  margin-right: 20px;
  font-size: 12px;

}
</style>
