<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         房屋管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>
         租赁管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>{{formItem.id === ''  || formItem.id === undefined ? '创建' :'编辑'}}租赁</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">租赁信息</Row>
        <div class="formContent">
          <div  style="font-size: 20px" v-show="showTip">暂无可租赁房间</div>
          <Form :model="formItem" :label-width="150" ref="formItem" v-show="!showTip">
            <Row type="flex">
              <FormItem label="租客姓名" class="selfValidate">
                <Input  v-model.trim="formItem.tenantName" style="width: 300px;float: left" placeholder="请输入租客姓名" ></Input>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="租赁房间" class="selfValidate" v-show="formItem.id === '' || formItem.id === undefined">
                <Select v-model="formItem.roomId" style="width:300px;text-align: left" placeholder="租赁房间">
                  <Option v-for="item in roomList" :value="item.id" :key="item.id">{{ item.roomName }}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="租赁时间" class="selfValidate">
                <DatePicker type="daterange" v-model="dateRange" placement="bottom-end" placeholder="选择租赁时间" style="width: 300px;border-radius: 0px !important;" :editable="false" @on-change="dateRangeChange"></DatePicker>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="联系方式">
                <Input  v-model="formItem.tenantPhone" style="width: 300px;float: left" placeholder="请输入联系方式" @on-change="mobilePhoneVal(formItem.tenantPhone)"></Input>
                <span class="notice" v-if="mobilePhoneNotice">请输入合法的手机号码</span>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="身份证号">
                <Input  v-model="formItem.tenantIdCard" style="width: 300px;float: left" placeholder="请输入身份证号" @on-change="idCardVal(formItem.tenantIdCard)"></Input>
                <span class="notice" v-if="idCardNotice">请输入合法的二代身份证号码</span>
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>
      <Row type="flex" style="margin-top: 30px" v-show="!showTip">
        <Button class="btn-save" @click="save" style="padding: 5px 30px">保存</Button>
      </Row>
    </div>
  </div>
</template>

<script>
  import { leaseAdd, leaseDetail, leaseUpdate, leaseRoomList } from '../../../api/api'
  export default {
    data () {
      return {
        showTip: false,
        dateRange: [],
        roomList: [],
        idCardNotice: false,
        mobilePhoneNotice: false,
        detailAddress: '',
        typeList: [],
        formItem: {
          roomId: '',
          tenantName: '',
          tenantPhone: '',
          tenantIdCard: '',
          houseId: '',
          startTime: '',
          contractDeadline: ''
        }
      }
    },
    methods:{
      dateRangeChange (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.formItem.startTime = change[0]
          this.formItem.contractDeadline = change[1]
        } else {
          this.formItem.startTime = ''
          this.formItem.contractDeadline = ''
        }
      },
      mobilePhoneVal (string) {
        this.formItem.tenantPhone = string.trim()
        let validataPrice = /(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/
        if (this.formItem.tenantPhone !== '') {
          if (!validataPrice.test(string.trim())) {
            this.mobilePhoneNotice = true
          } else {
            this.mobilePhoneNotice = false
          }
        } else {
          this.mobilePhoneNotice = false
        }
      },
      idCardVal (string) {
        this.formItem.tenantIdCard = string.trim()
        let validataPrice = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (this.formItem.tenantIdCard !== '') {
          if (!validataPrice.test(string.trim())) {
            this.idCardNotice = true
          } else {
            this.idCardNotice = false
          }
        } else {
          this.idCardNotice = false
        }
      },
      leaseChange () {
        if (this.formItem.lease === '0') {
          this.formItem.useState = '3'
        } else {
          this.formItem.useState = '0'
        }
      },
      submitVal (formData) {
        if (formData.tenantName.toString().trim().length === 0) {
          this.$Message.error('租客姓名不能为空！')
          return false
        } else if (formData.startTime === '' || formData.startTime === null) {
          this.$Message.error('租赁时间不能为空！')
          return false
        } else if (this.mobilePhoneNotice === true) {
          this.$Message.error('联系方式格式不正确！')
          return false
        } else if (this.idCardNotice === true) {
          this.$Message.error('身份证格式不合法！')
          return false
        } else {
          return true
        }
      },
      save () {
        // console.log(1212)
        let vm = this
        if (vm.submitVal(vm.formItem)) {
          if (vm.formItem.id === '' || vm.formItem.id === undefined) {
            leaseAdd(vm.formItem).then((res) =>{
              if (res.data.code === 1000) {
                vm.$Message.success('租赁创建成功！')
                vm.back()
              } else {
                vm.$Message.error(res.data.message)
              }
            })
          } else {
            leaseUpdate(vm.formItem).then((res) =>{
              if (res.data.code === 1000) {
                vm.$Message.success('租赁编辑成功！')
                vm.back()
              } else {
                vm.$Message.error(res.data.message)
              }
            })
          }
        }
      },
      getDetail (id) {
        let par = {
          houseLeaseId: id
        }
        leaseDetail(par).then(res => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.formItem = {
              id: result.id,
              tenantName: result.tenantName,
              tenantIdCard: result.tenantIdCard,
              tenantPhone: result.tenantPhone,
              houseId: result.houseId,
              roomId: result.roomId,
              startTime: result.startTime.split(' ')[0],
              contractDeadline: result.contractDeadline.split(' ')[0]
            }
            this.dateRange = [result.startTime.split(' ')[0], result.contractDeadline.split(' ')[0]]
          } else {
            this.formItem = {
              id: '',
              tenantName: '',
              roomId: '',
              tenantIdCard: '',
              tenantPhone: '',
              houseId: this.$route.params.id,
              startTime: '',
              contractDeadline: ''
            }
          }
        })
      },
      back () {
        this.$router.push({name: 'house_lease', params: {id: this.$route.params.id, param: this.$route.params.param}})
      }
    },
    mounted:function () {
    },
    created:function () {
      this.formItem.houseId = this.$route.params.id
      if (this.$route.params.leaseId !== undefined) {
        // 修改leaseId
        // console.log(this.$route.params.leaseId)
        this.formItem.id = this.$route.params.leaseId
        this.getDetail(this.formItem.id)
        this.showTip = false
      } else {
        // 新增
        let par = {
          houseId: this.$route.params.id
        }
        leaseRoomList(par).then((res) => {
          if (res.data.code === 1000) {
            this.roomList = res.data.content
            if (this.roomList.length > 0) {
              let item = {
                id: 0,
                roomName: '整租'
              }
              this.roomList.push(item)
            } else {
              this.showTip = true
            }
          } else {
            this.showTip = true
          }
        })
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/variable/variable.less';
  #outer-box {
    height: 400px;
    width: 100%;
    border: 1px solid #dcdcdc;
  }

  #container {
    height: 400px;
    width: 100%;
  }

  #panel {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -300px;
    height:400px;
    overflow: hidden;
    width: 300px;
    z-index: 999;
    overflow-x: hidden;
    background: #fff;
    border-top:none;
  }
  #searchInput {
    width: 300px;
    height: 30px;
    line-height: 30%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 5px;
  }
  #searchResults {
    width: 300px;
    overflow-x: hidden;
    height: 500px;
  }
</style>
