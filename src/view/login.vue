<template>
  <div class="conainer">
    <div class="content">
      <div class="content_input">
        <div class="title"><p>管理员登录</p></div>
        <div class="input">
          <el-input v-model="account" placeholder="用户名" clearable></el-input>
          <el-input v-model="password" placeholder="密码" clearable show-password></el-input>
        </div>
        <div class="login">
          <el-button type="primary" @click="signIn">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {login} from '../base/serve'
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    async signIn () {
      let that = this
      let account = that.account
      let password = that.password
      if (!account) {
        this.$message.error({
          title: '错误',
          message: '用户名不能为空'
        })
      } else if (!password) {
        this.$message.error({
          title: '错误',
          message: '密码不能为空'
        })
      } else {
        try {
          const data = await login({account, password})
          console.log(data)
          if (data.data.status === 'success') {
            this.loading()
            localStorage.setItem('token', data.data.data)
            setTimeout(() => {
              this.$router.push('/domain')
            }, 1500)
          } else {
            this.$message.error(data.data.errorMsg)
          }
        } catch (error) {
          this.$message.error(error.message)
        }
      }
    },
    loading () {
      const loading = this.$loading({
        lock: true,
        text: '登录中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 1300)
    }
  },
  mounted () {

  }
}
</script>
<style>
.el-button--primary{
  width: 100%;
}
.el-input {
    margin-bottom: 25px;
}
.content {
  width: 500px;
  height: 300px;
  box-sizing: border-box;
  padding: 0 50px;
  border-radius: 5px;
  box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: mymove 1s ease-in-out alternate;
  overflow: hidden;
  transition: 1.5s;
}
.content_input {
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #606266;
}
</style>
