<template>
  <div>
    <div class="header">
      <div class="titles">域名注册信息查询</div>
      <div class="input">
        <el-input v-model="domainName" placeholder="输入您想注册的域名，例如：qcloud"></el-input>
        <el-button type="primary" @click="query" style="margin-left: 30px">查询</el-button>
      </div>
      <div style="height: 20px"></div>
    </div>
    <div class="whois-form" v-if="isShow">
      <div>
        <div class="whois-form">
          <h3 class="tab-content-title">
            <span class="title-domain">{{domainName}}</span>
            域名注册信息
          </h3>
          <div class="whois-content">
            <p class="whois-info">以下信息来自WHOIS服务器查询结果</p>
            <ul class="c-f-list">
              <li class="f-list-item" v-for="item in message" :key="item.id">
                <label class="c-f-list-tit">
                  <span class="tit-c">{{item.Cn}}</span>
                  <span class="tit-e">{{item.En}}</span>
                </label>
                <div class="c-f-list-con">
                  <p class="item-descr-txt">
                    <span>{{item.content}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {queryByWhois} from '../../base/serve'
export default {
  data () {
    return {
      domainName: '',
      isShow: false,
      message: [
        {Cn: '域名所有者', param: 'registrant', En: 'Registrant', content: ['请联系域名注册商获取']},
        {Cn: '所有者邮箱', param: 'registerEmail', En: 'Registrant Email', content: ['请联系域名注册商获取']},
        {Cn: '注册商', param: 'register', En: 'Registrant', content: ['Chengdu west dimension digital technology Co., LTD']},
        {Cn: 'DNS 服务器', param: 'nameServer', En: 'Name Server', content: ['ns1.myhostadmin.net', 'ns2.myhostadmin.net']},
        {Cn: '注册时间', param: 'registrationDate', En: 'Registration Date', content: ['2016-04-07(UTC)']},
        {Cn: '到期时间', param: 'expirationDate', En: 'Expiration Date', content: ['2022-04-07(UTC)']}
      ]
    }
  },
  created () {

  },
  mounted () {
    this.domainName = this.$route.query.domainName || ''
    if (this.domainName) {
      this.query()
    }
  },
  methods: {
    async query () {
      try {
        const data = await queryByWhois(this.domainName)
        if (data) {
          this.isShow = true
          this.message.map((value) => {
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
.header{
  background-color: #fff;
}
.input{
  display: flex;
  margin: 30px 0 0 10px;
  max-width: 550px;
}
.whois-form{
  background: #fff;
  margin: 20px auto;
  padding: 30px;
  box-sizing: border-box;
}
.tab-content-title {
  border-left: 2px solid #2277da;
  padding-left: 8px;
  font-size: 18px;
  color: #000;
  font-weight: 400;
  overflow: hidden;
}
.title-domain {
  font-weight: 700;
}
.whois-info {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
  padding-left: 10px;
}
.c-f-list {
  padding: 18px 0;
}
.f-list-item {
  position: relative;
  margin-left: 0;
  min-height: 45px;
  padding: 0 0 20px;
  margin-right: 40px;
}
.c-f-list-tit {
  position: absolute;
  left: 0;
  line-height: 24px;
  color: #666;
  font-size: 14px;
  vertical-align: top;
  z-index: 2;
  width: 160px;
  top: 0;
}
.tit-c,.tit-e {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  display: block;
  text-align: right;
}
.c-f-list-tit span {
  vertical-align: middle;
}
.c-f-list-con {
  padding-left: 220px;
  z-index: 1;
}
.item-descr-txt {
  font-size: 14px;
  line-height: 1.5;
}
.item-descr-txt span{
  display: block;
}
</style>
