<template>
  <div>
    <div class="titles">
      <i class="el-icon-back goLeft pointer" @click="goMyDomain"></i>
      <span class="domainName">{{domainName}}</span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="域名信息" name="message"></el-tab-pane>
      <el-tab-pane label="操作日志" name="operate"></el-tab-pane>
    </el-tabs>
    <Message class="message" :personalMessage="personalMessage" :domainMessage="domainMessage" v-if="activeName==='message'" />
    <Operate class="operate" v-else />
  </div>
</template>

<script>
import Message from './message'
import Operate from './operate'
import {getDomainMessage} from '../../base/serve'
export default {
  components: {
    Message,
    Operate
  },
  data () {
    return {
      domainName: '',
      activeName: 'message',
      personalMessage: [
        {name: '域名', param: 'registrant', content: '', isEditor: false},
        {name: '域名类型', param: 'domainType', content: '', isEditor: true},
        {name: '域名所有者（中文）', param: 'personNameCn', content: '', isEditor: true},
        {name: '域名所有者（英文）', param: 'personNameEn', content: '', isEditor: true},
        {name: '所有者是实名认证', param: 'personAuthType', content: '', isEditor: false},
        {name: '到期时间', param: 'endTime', content: '', isEditor: false},
        {name: '域名状态', param: 'domainStatus', content: '', isEditor: false},
        {name: 'DNS服务器', param: 'dnsName', content: '', isEditor: false}
      ],
      domainMessage: [
        {name: '域名所有者（中文）', param: 'personNameCn', content: '', isEditor: false},
        {name: '域名所有者（英文）', param: 'personNameEn', content: '', isEditor: false},
        {name: '联系人（中文）', param: 'personNameCn', content: '', isEditor: false},
        {name: '联系人（英文）', param: 'personNameEn', content: '', isEditor: false},
        {name: '联系人邮箱', param: 'personEmail', content: '', isEditor: false},
        {name: '地区', param: 'domainAddress', content: '', isEditor: false},
        {name: '通信地址', param: 'domainPostal', content: '', isEditor: false},
        {name: '邮编', param: 'postCode', content: '', isEditor: false},
        {name: '手机', param: 'personPhone', content: '', isEditor: false}
      ]
    }
  },
  created () {

  },
  mounted () {
    this.domainName = this.$route.query.domainName
    this.getMessage()
  },
  methods: {
    handleClick () {

    },
    goMyDomain () {
      this.$router.push('myDomain')
    },
    async getMessage () {
      try {
        const data = await getDomainMessage({doDoSuffixId: this.$route.query.doDoSuffixId})
        if (data) {
          this.isShow = true
          this.personalMessage.map((value) => {
            value.content = data[value.param]
            return value
          })
          this.domainMessage.map((value) => {
            value.content = data[value.param]
            return value
          })
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
.el-tabs--top {
  background-color: white;
}
.el-tabs--top /deep/ .el-tabs__header {
  margin-bottom: 0!important;
}
.el-tabs--top /deep/ .el-tabs__nav {
  margin-left: 10px;
}
</style>
