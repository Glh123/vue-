<template>
  <div>
    <div class="titles">账号信息</div>
    <div class="message">
      <h3 class="title">基本信息</h3>
      <div class="content">
        <div class="left">
          <div class="item">
            <span class="descriptior">帐号昵称</span>
            <Editor v-bind:content="message" param='accountName' @submit="changeName"/>
          </div>
          <div class="item">
            <span class="descriptior">中文名</span>
            <span class="des-content">{{message.nameCn}}</span>
          </div>
          <div class="item">
            <span class="descriptior">英文名</span>
            <span class="des-content">{{message.nameEn}}</span>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <span class="descriptior">认证状态</span>
            <span class="des-content text-success">已认证</span>
          </div>
          <div class="item">
            <span class="descriptior">所属行业</span>
            <Editor :content="message" param='industry' @submit="changeIndustry"/>
          </div>
          <div class="item">
            <span class="descriptior">联系手机</span>
            <Editor v-bind:content="message" param='phone' @submit="changePhone" :addSecret=true>
              <template>
                <span>+86 </span>
              </template>
            </Editor>
          </div>
          <div class="item">
            <span class="descriptior">联系邮箱</span>
            <Editor v-bind:content="message" param='email' @submit="changeEmail" :addSecret=true />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '../../components/editor'
import {personaMessage} from '../../base/serve'
export default {
  components: {Editor},
  data () {
    return {
      message: {}
    }
  },
  created () {

  },
  mounted () {
    this.getPersonalMessage()
  },
  methods: {
    async getPersonalMessage () {
      this.message = await personaMessage()
    },
    changeName (value) {
      this.changeMessage(value, 'name')
    },
    changeIndustry (value) {
      this.changeMessage(value, 'industry')
    },
    changeEmail (value) {
      this.changeMessage(value, 'email')
    },
    changePhone (value) {
      this.changeMessage(value, 'phone')
    },
    changeMessage (value, param) {
      this[param] = value
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
.message{
  margin-top: 50px;
  background-color: #fff;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
  padding: 20px;
  max-width: 1360px;
  box-sizing: border-box;
}
.message .title{
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 15px;
}
.message .content{
  display: flex;
}
.message .left {
  width: 33.3333%;
  padding-right: 20px;
}
.message .item{
  margin-bottom: 15px;
  font-size: 12px;
}
.message .item .descriptior{
  display: inline-block;
  width: 120px;
  color: #888;
  padding-right: 20px;
  white-space: nowrap;
  box-sizing: border-box;
}
.message .item .des-content{
  color: #000;
}
.message .right {
  padding-left: 20px;
  padding-right: 20px;
  border-left: 1px solid #e5e5e5;
}
.text-success {
  color: #0abf5b !important;
}
</style>
