<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body{
  margin: 0;
  padding: 0;
}
html,body,#app{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.pointer{
  cursor: pointer;
}
.titles{
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  font-weight: 400;
  color: #000;
  margin-left: 10px;
  border-bottom: 1px solid #ddd;
}
ul,li{
  list-style: none;
}
h3{
  margin: 0;
}
</style>
