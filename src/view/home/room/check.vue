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
        <span>房间详情</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">房间信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="房间名称" >
                {{formItem.roomName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房间类型" >
                {{formItem.type === '0' ? '重要房间' : formItem.type === '1' ? '普通房间' : '-'}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="是否租赁" >
                {{formItem.lease === '0' ? '否' : formItem.lease === '1' ? '是' : '-'}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="使用状态" >
                {{formItem.useState === '0' ? '待出租' : formItem.useState === '1' ? '出租中' : formItem.useState === '3' ? '自用' : formItem.useState === '4' ? '空闲' : '-'}}

              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房间面积">
                {{formItem.area}}㎡
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房间说明" >
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
  import { roomDetail } from '../../../api/api'
  export default {
    data () {
      return {
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
