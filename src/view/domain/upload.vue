<template>
<div>
  <el-upload
  class="upload-demo"
  action="http://192.168.43.5:8080/test"
  :limit="3"
  :on-success="success"
  :on-change="handleChange"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

</div>
</template>

<script>
export default {
  data () {
    return {
      fileList: []
    }
  },
  watch: {
    fileList () {

    }
  },
  methods: {
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    success (value) {
      console.log(this.fileList)
    }
  }
}
</script>
<style scoped>

</style>
