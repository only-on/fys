<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         房屋管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>房屋详情</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">房屋信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="房屋名称" >
                {{formItem.houseName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋类型" >
                {{formItem.type === '0' ? '重要房屋' : formItem.type === '1' ? '普通房屋' : '-'}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="是否租赁" >
                {{formItem.lease === '0' ? '否' : formItem.lease === '1' ? '全部出租' : formItem.lease === '2' ? '部分出租' : '-'}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋类别" >
                {{formItem.form === '1' ? '公有' : formItem.form === '2' ? '私有' : formItem.form === '3' ? '代管' : '-'}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="使用状态" >
                {{formItem.useState === '0' ? '待出租' : formItem.useState === '1' ? '部分出租中' : formItem.useState === '2' ? '全部出租中' : formItem.useState === '3' ? '自用' : formItem.useState === '4' ? '空闲' : '-'}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋面积">
                {{formItem.area}}㎡
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="详细地址">
                {{formItem.street}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋经度">
                {{formItem.lng}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋纬度">
                {{formItem.lat}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="实景图中像素位置X">
                {{formItem.pixelX}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="实景图中像素位置Y">
                {{formItem.pixelY}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋所有人姓名">
                {{formItem.owner}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋所有人身份证号">
                {{formItem.ownerIdCard}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋说明">
                {{formItem.explains}}
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { homeDetail } from '../../api/api'
  export default {
    data () {
      return {
        detailAddress: '',
        typeList: [],
        formItem: {
          // id: '',
          houseName: '',
          area: 1,
          type: '0',
          lease: '0',
          form: '1',
          useState: '3',
          owner: '',
          ownerIdCard: '',
          lng: '',
          lat: '',
          street: '',
          pixelX: null,
          pixelY: null,
          explains: ''
        }
      }
    },
    methods:{
      getDetail (id) {
        let par = {
          houseId: id
        }
        homeDetail(par).then(res => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.formItem = {
              id: result.id,
              houseName: result.houseName,
              area: result.area,
              type: result.type + '',
              lease: result.lease + '',
              form: result.form + '',
              useState: result.useState + '',
              owner: result.owner,
              ownerIdCard: result.ownerIdCard,
              lng: result.lng,
              lat: result.lat,
              street: result.street,
              pixelX: result.pixelX,
              pixelY: result.pixelY,
              explains: result.explains
            }
          } else {
            this.formItem = {
              id: this.$route.params.id,
              houseName: '',
              area: 1,
              type: '0',
              lease: '0',
              form: '1',
              useState: '3',
              owner: '',
              ownerIdCard: '',
              lng: '',
              lat: '',
              street: '',
              pixelX: null,
              pixelY: null,
              explains: ''
            }
          }
        })
      },
      back () {
        this.$router.push({name: 'house', params:{param: this.$route.params.param}})
      }
    },
    mounted:function () {
    },
    created:function () {
      if (this.$route.params.id !== undefined) {
        this.formItem.id = this.$route.params.id
        this.getDetail(this.formItem.id)
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/variable/variable.less';
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
