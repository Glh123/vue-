<template>
  <div>
    我是自组件
    <slot name="Header"></slot>
    <slot name="Content" :message='msg' :click="open" @click="open"></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Thank,You'
    }
  },
  methods: {
    open () {
      console.log('调用了子组件的方法')
    }
  },
  mounted () {

  }

}
</script>
<style scoped>

</style>
