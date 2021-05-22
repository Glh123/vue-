<template>
  <div>
    <div class="tc-panel" style="margin-bottom: 20px">
      <div class="param-box">
        <div class="param-hd">
          <h3>基本信息</h3>
        </div>
        <div class="param-bd">
          <ul class="item-descr-list">
            <li v-for="(item,index) in personalMessage" :key='index'>
              <span class="item-descr-tit" >{{item.name}}</span >
              <span class="item-descr-txt" v-if="item.content">
                <span>{{item.content}}</span >
                <a v-if="item.isEditor" href="javascript:;" class="edit" style="margin-left: 10px" @click="goEditorMessage">修改</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tc-panel" style="margin-bottom: 20px">
      <div class="param-box">
        <div class="param-hd">
          <h3>域名资料 <span class="pointer" @click="goEditorMessage" style="margin-left: 5px"><i class="el-icon-edit-outline" /><span style="color: #006eff;font-weight: 300;margin-left: 5px">编辑</span></span></h3>
        </div>
        <div class="param-bd">
          <ul class="item-descr-list">
            <li v-for="(item,index) in domainMessage" :key='index'>
              <span class="item-descr-tit">{{item.name}}</span >
              <span class="item-descr-txt" v-if="item.content">
                <span>{{item.content}}</span >
                <a v-if="item.isEditor" href="javascript:;" @click="goEditorMessage" class="edit" style="margin-left: 10px">修改</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    personalMessage: {
      type: Array
    },
    domainMessage: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  methods: {
    goEditorMessage () {
      this.$router.push({path: 'editDomain', query: {doDoSuffixId: this.$route.query.doDoSuffixId}})
    }
  }
}
</script>
<style scoped>
.tc-panel {
  background-color: #fff;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
  padding: 20px;
  max-width: 1360px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  font-size: 12px;
  margin-top: 30px;
}
.tc-panel .param-box .param-hd {
    margin-top: -9px;
}
.param-box .param-hd {
    margin-bottom: 20px;
}
.item-descr-list .item-descr-tit {
    color: #888;
    padding-right: 20px;
    white-space: nowrap;
    text-align: left;
    width: auto;
    display: table-cell;
    vertical-align: top;
    padding-bottom: 16px;
}
.item-descr-list>li {
    display: table-row;
    font-size: 12px;
    line-height: 1.7;
}
.item-descr-list .item-descr-tit, .item-descr-list .item-descr-txt {
    display: table-cell;
    vertical-align: top;
    padding-bottom: 16px;
}
a {
    color: #006eff;
}
ul{
  padding-left: 0;
}
</style>
