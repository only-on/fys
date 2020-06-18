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
        <span>租赁详情</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">租赁信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem" v-show="!showTip">
            <Row type="flex">
              <FormItem label="租客姓名" >
                {{formItem.tenantName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="租赁房间" >
                {{formItem.roomName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="租赁时间" >
                {{formItem.startTime}} - {{formItem.contractDeadline}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="联系方式">
               {{formItem.tenantPhone}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="身份证号">
                {{formItem.tenantIdCard}}
              </FormItem>
            </Row>
            <Row type="flex" justify="start">
              <Col span="24">
              <FormItem label="租赁图片">
                <Row v-if="imageList.length > 0" :gutter="16">
                  <Col span="8" v-for="(item, index) in imageList" :key="index">
                  <div class="imageItem"  style="margin-bottom: 20px">
                    <a :href="item.url" target="_blank">
                      <img :src="item.url" alt="" style="width: 100%;height: 100%;">
                    </a>
                  </div>
                  </Col>
                </Row>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { leaseDetail } from '../../../api/api'
  export default {
    data () {
      return {
        imageList: [],
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
              roomName: result.roomName,
              startTime: result.startTime.split(' ')[0],
              contractDeadline: result.contractDeadline.split(' ')[0]
            }
            this.imageList = result.contractList
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
        this.formItem.id = this.$route.params.leaseId
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
  .imageItem{
    width: 100%;
    height: 220px;
    position: relative;
  }
</style>
