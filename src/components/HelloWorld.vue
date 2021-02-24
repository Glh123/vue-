<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li v-for="(m,index) in list" :key="index">
        {{m.name}}--{{m.age}}
      </li>
    </ul>
    <div @click="open" ref="welcome">{{msg}}</div>
    <Child>
      <div slot="Header">你好，子组件</div>
      <template slot-scope="data" slot="Content">
        <div>很高兴见到你</div>
        <div @click="data.click">{{data.message}}</div>
      </template>
    </Child>
  </div>
</template>

<script>
import Child from './Child'
export default {
  props: {},
  components: { Child },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: [
        {name: 'glh', age: 23},
        {name: 'sss', age: 24}
      ]
    }
  },
  methods: {
    open () {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    }
  },
  created () {
    console.log(this.$refs.welcome)
  },
  mounted () {
    // setTimeout(() => {
    //   console.log(this)
    // }, 1000)
    this.$nextTick(function () {
      console.log(this.$refs.welcome.innerHTML)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  li{
    color: yellow;
  }
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
