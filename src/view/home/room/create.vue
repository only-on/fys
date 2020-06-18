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
         房间管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>{{formItem.id === '' || formItem.id === undefined ? '创建' :'编辑'}}房间</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">房间信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="房间名称" class="selfValidate">
                <Input  v-model="formItem.roomName" style="width: 300px;float: left" placeholder="请输入房间名称" ></Input>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房间类型" class="selfValidate">
                <RadioGroup v-model="formItem.type" style="float: left;" >
                  <Radio label="0" style="margin-right: 20px">重要房间</Radio>
                  <Radio label="1" style="margin-right: 20px">普通房间</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="是否租赁" class="selfValidate">
                <RadioGroup v-model="formItem.lease" style="float: left;" @on-change="leaseChange">
                  <Radio label="0" style="margin-right: 20px">否</Radio>
                  <Radio label="1" style="margin-right: 20px">是</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="使用状态" class="selfValidate">
                <RadioGroup v-model="formItem.useState" style="float: left;">
                  <Radio label="0" style="margin-right: 20px" v-show="formItem.lease !== '0'">待出租</Radio>
                  <Radio label="1" style="margin-right: 20px" v-show="formItem.lease !== '0'">出租中</Radio>
                  <Radio label="3" style="margin-right: 20px" v-show="formItem.lease === '0'">自用</Radio>
                  <Radio label="4" style="margin-right: 20px" v-show="formItem.lease === '0'">空闲</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房间面积">
                <InputNumber  v-model="formItem.area"  style="width: 300px; float: left;margin-right: 5px" :formatter="value => `${value}`.replace(/\d+\.\d{2,}/g, `${value}`.substr(0, `${value}`.indexOf('.')+3))"
                              :parser="value => value.replace('-', '')" :min="1" :max="99999999"></InputNumber>㎡
              </FormItem>
            </Row>
            <Row type="flex">
              <Col span="24">
              <FormItem label="房间说明">
                <Input v-model="formItem.explains" maxlength="100" show-word-limit type="textarea" placeholder="请输入房间说明" :autosize="{minRows: 2,maxRows: 5}" style="width: 100%" /><br>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <Row type="flex" style="margin-top: 30px">
        <Button class="btn-save" @click="save" style="padding: 5px 30px">保存</Button>
      </Row>
    </div>
  </div>
</template>

<script>
  import { roomAdd, roomDetail, roomUpdate } from '../../../api/api'
  export default {
    data () {
      return {
        mobilePhoneNotice: false,
        detailAddress: '',
        typeList: [],
        formItem: {
          // id: '',
          roomName: '',
          area: 1,
          type: '0',
          lease: '0',
          houseId: '',
          useState: '3',
          explains: ''
        }
      }
    },
    methods:{
      leaseChange () {
        if (this.formItem.lease === '0') {
          this.formItem.useState = '3'
        } else {
          this.formItem.useState = '0'
        }
      },
      submitVal (formData) {
        if (formData.roomName.toString().trim().length === 0) {
          this.$Message.error('房间名称不能为空！')
          return false
        } else {
          return true
        }
      },
      save () {
        // console.log(1212)
        if (this.submitVal(this.formItem)) {
          if (this.formItem.id === '' || this.formItem.id === undefined) {
            roomAdd(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('房间创建成功！')
                this.back()
              } else {
                this.$Message.error(res.data.message)
              }
            })
          } else {
            roomUpdate(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('房间编辑成功！')
                this.back()
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        }
      },
      getDetail (id) {
        let par = {
          roomId: id
        }
        roomDetail(par).then(res => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.formItem = {
              id: result.id,
              roomName: result.roomName,
              area: result.area,
              type: result.type + '',
              lease: result.lease + '',
              houseId: result.houseId,
              useState: result.useState + '',
              explains: result.explains
            }
          } else {
            this.formItem = {
              id: '',
              roomName: '',
              area: 1,
              type: '0',
              lease: '0',
              houseId: this.$route.params.id,
              useState: '3',
              explains: ''
            }
          }
        })
      },
      back () {
        this.$router.push({name: 'house_room', params: {id: this.$route.params.id, param: this.$route.params.param}})
      }
    },
    mounted:function () {
    },
    created:function () {
      this.formItem.houseId = this.$route.params.id
      if (this.$route.params.roomId !== undefined) {
        this.formItem.id = this.$route.params.roomId
        this.getDetail(this.formItem.id)
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
