<template>
  <div class="login-body">
    <div class="login-content">
      <div class="login-content-left">
        <div class="login-content-left-title">
          <div class="left-content-title-bottom">
            北京法源寺历史文化街区智慧运营平台
          </div>
          <img src="../assets/image/login_title_bottom.png"></img>
        </div>
      </div>
      <div class="login-content-right">
        <div class="right-content">
          <div class="right-content-title">登录</div>
          <Form :model="form" :label-width="0" ref="form" style="margin-top: 30px;">
            <Row type="flex" justify="center">
              <Col span="24">
              <FormItem label="">
                <Input type="text" v-model="form.phone" placeholder="请输入用户名" size="large" style="width: 300px;">
                <Icon type="md-phone-portrait" slot="prepend" size="20" color="#666666"></Icon>
                </Input>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="24" >
              <FormItem label="">
                <Input type="password" v-model="form.password" placeholder="请输入用户密码" @on-enter="submit" size="large" style="width: 300px;">
                <Icon type="ios-lock" slot="prepend" size="20" color="#666666"></Icon>
                </Input>
              </FormItem>
              </Col>
            </Row>
            <div style="text-align: right;margin-bottom: 20px">
              <!--<Button @click="reset" type="text" style="padding: 0!important;">-->
              <!--<div style="color: #1A9CF4;text-decoration: underline;">-->
              <!--忘记密码-->
              <!--</div>-->
              <!--</Button>-->
            </div>
            <Row>
              <Button class="btn-monitor">
                <icon name="btn_monitor":w="20" :h="20"></icon>
                登录监控中心
              </Button>
              <Button @click="submit"  class="btn-login">
                <icon name="btn_dates":w="20" :h="20"> </icon>
                登录数据中心
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
    <div class="copy-line">
      CopyRight © 西安通尚电子科技有限公司 .All Rights Reserved 2019
    </div>
  </div>
</template>


<script type="application/ecmascript">
  import { userLogin } from '../api/api'
  export default {
    data () {
      return {
        send: true,
        mobilePhoneNotice: false,
        passwordNotice: false,
        passNotice: false,
        changeModal: false,
        formItem: {
          passwords: '',
          mobile: '',
          mobileCode: '',
          newPassword: ''
        },
        type: 1,
        form: {
          phone: '',
          password: ''
        }
      }
    },
    created: function () {
      if (sessionStorage.getItem('user') !== null) {
        this.form.phone = JSON.parse(sessionStorage.getItem('user'))
        this.form.password = JSON.parse(sessionStorage.getItem('pwd'))
      }
    },
    methods: {
      // 密码
      checkPassword (string) {
        if (string !== '' && string !== undefined) {
          let validate = /^[0-9]*$/
          string = string.replace(/\s+/g, '')
          if (validate.test(string)) {
            if (string.length > 5 && string.length < 12) {
              this.passNotice = false
            } else {
              this.passNotice = true
            }
          } else {
            this.passNotice = true
          }
        } else {
          this.passNotice = false
        }
      },
      mobilePhoneVal (string) {
        this.formItem.phone = string.trim()
        var validataPrice = /(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/
        if (!validataPrice.test(string.trim())) {
          this.mobilePhoneNotice = true
        } else {
          this.mobilePhoneNotice = false
        }
      },
      pwd () {
        // this.$router.push({path: '/password'})
      },
      submitVal () {
        if (this.form.phone === '') {
          this.$Message.error('用户名不能为空')
        } else {
          this.form.phone = this.form.phone.trim()
          if (this.form.password === '') {
            this.$Message.error('用户密码不能为空')
          } else {
            if (sessionStorage.getItem('token')) {
              sessionStorage.removeItem('token')
            }
            userLogin(this.form).then((res) => {
              if (res.data.code === 1000) {
                let result = res.data.content
                if (this.type === 2) {
                  this.$Message.success('欢迎使用数据中心')
                  this.$router.push({path: '/map'})
                } else {
                  this.$Message.success('欢迎使用监控中心')
                  this.$router.push({path: '/monitor'})
                }
                sessionStorage.setItem('token', result.token)
                sessionStorage.setItem('roleType', result.roleId)
                sessionStorage.setItem('user', JSON.stringify(this.form.phone))
                sessionStorage.setItem('pwd', JSON.stringify(this.form.password))
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        }
      },
      submitMonitor () {
        this.type = 1
        this.submitVal()
      },
      submit () {
        this.type = 2
        this.submitVal()
      }
    }
  }
</script>
<style  lang="less" scoped>
  @import '../assets/styles/variable/variable.less';
  .login-body {
    position: relative;
    height: 100vh;
    width: 100%;
    background: url("../assets/image/login_backgroup.png");
  }
  .login-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    height: 450px;
    width: 1000px;
    background: @login-color;
    border-radius:10px;
    overflow: hidden;
  }
  .login-content-left {
    display: table;
    float: left;
    width: 50%;
    height: 400px;
    text-align: left;
    padding: 50px 50px;
  }
  .login-content-right {
    position: relative;
    float: left;
    width: 50%;
    height: 100%;
  }
  .right-content-title {
    color: @login-title-color;
    line-height: 25px;
    text-align: left;
    font-weight:400;
  }
  .right-content {
    padding: 80px 50px;
    font-size: 18px;
    width: 400px;
    height: 200px;
  }
  .login-content-left-title {
    display: table-cell;
    vertical-align: top;
  }
  .left-content-title-top {
    font-size: 24px;
    display: inline-block;
    vertical-align: middle;
  }
  .left-content-title-img{
    vertical-align:middle;
    display: inline-block;
    width: 35px;
    height: 35px;
    /*background: rgba(5,15,58,0.37);*/
    border-radius: 50%;
  }
  .left-content-title-bottom {
    font-size: 22px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    display: inline-block;
    vertical-align: middle;
  }
  .copy-line {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    height: 80px;
    width: 100%;
    padding-top: 35px;
    font-size:14px;
  }
</style>
