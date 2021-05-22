<template>
  <div class="container">
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1" default-active="1-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>域名注册</span>
            </template>
            <el-menu-item index="1-1" @click.native='handleOpen(`query`)'>域名查询</el-menu-item>
            <el-menu-item index="1-2" @click.native='handleOpen(`whois`)'>whois查询页面</el-menu-item>
            <el-menu-item index="1-3" @click.native='handleOpen(`price`)'>价格总览</el-menu-item>
          </el-submenu>
          <el-menu-item index="2" @click.native='handleOpen(`developer`)'>
            <i class="el-icon-menu"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="3" @click.native='handleOpen(`myDomain`)'>
            <i class="el-icon-menu"></i>
            <span slot="title">我的域名</span>
          </el-menu-item>
          <el-menu-item index="4" @click.native='handleOpen(`myOrder`)'>
            <i class="el-icon-menu"></i>
            <span slot="title">我的订单</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleOpen (key) {
      this.$router.push(key)
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.container{
  min-height: 100%;
  background-color: rgb(248, 246, 246);
  border: 1px solid transparent;
  box-sizing: border-box;
  .el-row{
    min-width: 200px;
    max-height: 100%;
    min-height: 100%;
    overflow-y: auto;
    background-color: rgb(84, 92, 100);
    position: fixed;
  }
  .content{
    box-sizing: border-box;
    margin: 20px 50px 20px 250px;
  }
}
</style>
