<template>
  <div class="editor">
    <div class="form-text" v-if="show">
      <slot></slot>
      <span class="text">{{newContent}}</span>
      <i class="el-icon-edit pointer" @click="editor"></i>
    </div>
    <div class="change-text" v-else>
      <el-input v-model="newContent" placeholder="请输入内容" size="mini"></el-input>
      <span class="btn" @click="save">保存</span>
      <span class="btn" @click="cancel">取消</span>
    </div>
  </div>
</template>

<script>
import {changePersonaMessage} from '../base/serve'
export default {
  name: 'editor',
  props: {
    content: {
      type: Object
    },
    addSecret: {
      type: Boolean,
      default: false
    },
    param: {
      type: String,
      default: ''
    }
  },
  watch: {
    content () {
      this.newContent = this.jiami(this.content[this.param])
    }
  },
  data () {
    return {
      show: true,
      newContent: ''
    }
  },
  created () {

  },
  mounted () {
    this.newContent = this.jiami(this.content[this.param])
  },
  methods: {
    editor () {
      this.show = !this.show
      this.newContent = this.content[this.param]
    },
    cancel () {
      this.show = true
      this.newContent = this.jiami(this.content[this.param])
    },
    async save () {
      if (this.newContent === this.content[this.param]) {
        this.show = true
        return
      }
      // 发请求 成功 show=true content = newContent
      try {
        const data = await changePersonaMessage({...this.content, [this.param]: this.newContent.trim().trimStart()})
        if (data) {
          this.$message.success('修改成功')
          this.content[this.param] = this.newContent
          this.show = true
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    jiami (value) {
      if (!value) {
        return ''
      }
      if (this.addSecret) {
        let temp = value.indexOf('@')
        if (temp > -1) {
          return value.slice(0, 3) + '****' + value.slice(temp)
        }
        return value.slice(0, 3) + '****' + value.slice(-4)
      }
      return this.content[this.param]
    }
  }
}
</script>
<style scoped>
.el-icon-edit{
  font-size: 16px;
  margin-left: 5px;
}
.editor, .form-text, .change-text, .btn{
  display: inline-block;
}
.editor .change-text .btn{
  margin-left: 10px;
  padding: 5px;
  vertical-align: middle;
  cursor: pointer;
  color: #006eff;
}
.editor .change-text .btn:hover{
  background-color: rgba(0,0,0,.05);
}
.change-text .el-input{
  width: auto;
}
.change-text /deep/ .el-input__inner{
  width: 128px;
  padding:0 10px;
}
</style>
