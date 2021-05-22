<template>
  <div>
    <div class="titles">
      <i class="el-icon-back goLeft pointer" @click="goBack"></i>
      <span class="domainName">域名信息修改</span>
    </div>
    <div class="tc-15-msg">
      <div class="tip-info">
        <span>如域名信息修改涉及资料：域名所有者中/英文、联系人中/英文、证件类型及图片，
          则需要向注册局再次提交审核，预计 3~7 个工作日完成审核，具体取决于相关注册局审核时间。
        </span><br>
        <span>信息修改审核期间不影响该域名的正常使用及 DNS 解析，审核结果将通过邮件通知，请您留意。</span>
      </div>
    </div>
    <div class="tc-panel">
      <div style="margin: 22px">
        <div class="item">
          <div class="left">用户类型</div>
          <div class="right">
            <el-radio-group v-model="message.domainType" size="mini">
              <el-radio-button label="个人用户"></el-radio-button>
              <el-radio-button label="企业用户"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="item item-bottom">
          <div class="left">域名所有者(中文)</div>
          <div class="right">
            <el-input v-model="message.personNameCn" placeholder="中文名" size="small" maxlength="24" minlength="2"></el-input>
            <div style="position:relative">
              <el-popover
                placement="bottom"
                width="233"
                trigger="manual"
                popper-class="new-popover"
                visible-arrow="true"
                v-model="visible">
                <span style="font-size: 12px">域名所有者代表域名拥有权，请填写与所有<br>
                者证件完全一致的姓名。<span style="color: red">重要提醒：若该域<br>
                名需要备案，请确保域名所有者名称与备案<br>
                主体名称完全一致，并完成域名实名认证。</span></span>
              </el-popover>
            </div>
          </div>
        </div>
        <div class="item item-bottoms">
          <div class="left">域名所有者(英文)</div>
          <div class="right">
            <el-input v-model="message.personNameEn" placeholder="如，Zhang San" size="small"></el-input>
            <div style="position:relative">
              <el-popover
                placement="bottom"
                width="233"
                trigger="manual"
                popper-class="new-popover"
                visible-arrow="true"
                v-model="visible">
                <span style="color: red; font-size: 12px">如翻译有误（注意多音字、生僻字的翻<br>
                  译），请直接进行修改。</span>
              </el-popover>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="left">电子邮箱</div>
          <div class="right">
            <el-input v-model="message.personEmail" placeholder="邮箱" size="small"></el-input>
          </div>
        </div>
        <div class="item">
          <div class="left">地区</div>
          <div class="right">
            <el-input v-model="message.domainAddress" placeholder="地区" size="small"></el-input>
          </div>
        </div>
        <div class="item">
          <div class="left">通信地址(中文)</div>
          <div class="right">
            <el-input v-model="message.domainPostal" placeholder="中文地址" size="small"></el-input>
          </div>
        </div>
        <div class="item">
          <div class="left">邮编</div>
          <div class="right">
            <el-input v-model="message.postCode" placeholder="邮编" size="small"></el-input>
          </div>
        </div>
        <div class="item">
          <div class="left">手机</div>
          <div class="right">
            <el-input v-model="message.personPhone" placeholder="手机" size="small"></el-input>
          </div>
        </div>
        <div class="line"></div>
        <div class="submit" @click="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import {editorDomainMessage, getDomainMessage} from '../../base/serve'
export default {
  data () {
    return {
      message: {

      },
      radio1: '企业用户',
      nameCN: '',
      nameEN: '',
      visible: true
    }
  },
  created () {

  },
  mounted () {
    this.getMessage()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    async save () {
      try {
        const data = await editorDomainMessage(this.message)
        if (data) {
          this.$message.success('修改成功')
          this.goBack()
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    async getMessage () {
      try {
        const data = await getDomainMessage({doDoSuffixId: this.$route.query.doDoSuffixId})
        if (data) {
          this.isShow = true
          this.message = data
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
</script>
<style scoped>
.goLeft{
  color: #006eff;
  font-size: 20px;
  font-weight: 600;
}
.titles{
  border-bottom: 0 solid;
  background-color: #fff;
  margin: 0;
  padding-left: 10px;
}
.domainName {
  font-size: 16px;
  font-weight: 700;
  color: #171d25;
  margin-left: 24px;
}
.tc-15-msg {
  margin-bottom: 10px;
  color: #002da0;
  border: 1px solid #d5e7ff;
  background-color: #d5e7ff;
  font-size: 12px;
  line-height: 18px;
  padding: 10px 30px 10px 20px;
  vertical-align: middle;
  background: #e5f0ff;
  position: relative;
  box-sizing: border-box;
  max-width: 1360px;
  margin-top: 25px;
}
.tc-panel {
  background-color: #fff;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
  padding: 20px;
  max-width: 1360px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  margin-bottom: 100px;
}
.tc-panel .item {
  display: flex;
  height: 46px;
  box-sizing: border-box;
  font-size: 12px;
}
.tc-panel .item .left {
  display: flex;
  width: 112px;
  color: #888;
  line-height: 27px;
}
.tc-panel .item .right {
  /* display: flex; */
  width: 258px;
}
.tc-panel /deep/ .new-popover{
  top: 10px !important;
}
.item-bottom {
  margin-bottom: 120px;
}
.item-bottoms {
  margin-bottom: 80px;
}
.line{
  padding-top: 20px;
  border-top: 1px solid #ddd;
  margin-top: 20px;
}
.submit {
    height: 30px;
    min-width: 24px;
    padding: 0 20px;
    background-color: #006eff;
    color: #fff;
    border: 1px solid #006eff;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    outline: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 12px;
}
</style>
