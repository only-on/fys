<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         房屋管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>房屋图片</span>
      </div>
    </Row>
    <div class="detailBody">
      <div  class="detailContentImage">
        <Row>
          <Select v-model="param.type" class="head-search" style="width:200px;float: left;margin-left: 20px " placeholder="图片类型" clearable @on-change="changeUser" :transfer="true">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <Button class="btn-save" style="float: right;margin-right: 20px" @click="add">创建图片</Button>
        </Row>
        <div class="content">
          <div class="empty" v-if="isEmpty">暂无数据</div>
          <div class="imageItem" v-if="!isEmpty" v-for="(item, index) in imageList" :key="index" :style="{'visibility': item.url === -1 ? 'hidden': 'visible'}">
            <a :href="item.url" target="_blank">
              <img :src="item.url" alt="" style="width: 370px;height: 220px;">
            </a>
            <div class="tip">
              <Row class="tipInfo">
                <div style="float:left">{{item.type === '1' || item.type === 1 ? '结构图片' : item.type === '2' || item.type === 2 ? '普通图片' : ''}}</div>
              </Row>
            </div>
            <div class="mask-image">
              <Icon type="ios-trash-outline" @click.native="handleRemoveImage(item.id)" size="24" color="#fff" ></Icon>
            </div>
          </div>
        </div>
        <div style="text-align: center;margin-top: 10px">
          <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                ref="tablePage" show-elevator :transfer="true"></Page>
        </div>
      </div>
      <Modal v-model="modal" >
        <p slot="header" >创建图片
        </p>
        <div class="formContent">
          <Form :model="form" :label-width="150" ref="formItem">

            <FormItem label="类型" class="selfValidate">
              <RadioGroup v-model="form.type" >
                <Radio label="1">结构图片</Radio>
                <Radio label="2">普通图片</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="图片" class="selfValidate">
              <div  class="file" style="">
                <input type="file" @change="handleUpload"   style="height: 30px;" ref="upload">上传图片
              </div>
              <Row v-show="img !== ''">
                <Col span="4">
                <a :href=img target="_blank">
                  <img :src=img style="width: 100px;height: 100px" alt="暂未传照片">
                </a>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
        <div slot="footer" style="text-align: right">
          <Button  @click="homeImageAdd">创建图片</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import { homeImagesList, uploadImg, homeImagesAdd, homeImagesDel } from '../../../api/api'
  export default {
    data () {
      return {
        img: '',
        form: {
          houseId: '',
          imageIds: '',
          type: '1'
        },
        modal: false,
        isEmpty: true,
        param: {
          pageNum: 1,
          pageSize: 8,
          type: '',
          houseId: ''
        },
        size: [8, 16, 32, 40, 48],
        total: 0,
        page: 1,
        rows: 8,
        typeList: [
          {
            id: 1,
            name: '结构图片'
          },
          {
            id: 2,
            name: '普通图片'
          }
        ],
        imageList: []
      }
    },
    methods: {
      handleRemoveImage (id) {
        let thi = this
        thi.$Modal.confirm({
          title: '确认删除该图片?',
          onOk: () => {
            let par = {
              id: id
            }
            homeImagesDel(par).then(res => {
              if (res.data.code === 1000) {
                thi.$Message.success('删除成功！')
                thi.getImage(this.param)
              } else {
                thi.$Message.error(res.data.message)
              }
            })
          }
        })
      },
      add () {
        this.img = ''
        this.form.imageIds = ''
        this.modal = true
      },
      handleUpload (file) {
        var formData = new FormData()
        for (var image of file.target.files) {
          formData.append('file', image)
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        uploadImg(formData, config).then((res) => {
          if (res.data.code === 1000) {
            this.img = res.data.content.url
            this.form.imageIds = res.data.content.id
          } else {
            this.$Message.error(res.data.message)
          }
          this.$refs.upload.value = ''
        })
      },
      homeImageAdd () {
        if (this.form.imageIds !== '') {
          homeImagesAdd(this.form).then((res) => {
            if (res.data.code === 1000) {
              this.getImage(this.param)
              this.modal = false
            } else {
              this.$Message.error(res.data.message)
            }
          })
        } else {
          this.$Message.error('图片不可以为空')
        }
      },
      back() {
        this.$router.push({name: 'house', params:{param: this.$route.params.param}})
      },
      changeUser (change) {
        this.getImage(this.param)
      },
      // 点击分页页码
      change (page) {
        this.page = page
        this.param.pageNum = this.page
        this.getImage(this.param)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.param.pageSize = this.rows
        this.getImage(this.param)
      },
      // 图片
      getImage (par) {
        let vm = this
        homeImagesList(par).then((res) => {
          if (res.data.code === 1000) {
            vm.imageList = res.data.content.list
            vm.total = res.data.content.total
            let num = vm.imageList.length % 4
            if (num !== 0) {
              for (let i = 0; i < (4 - num); i++) {
                vm.imageList.push({url: -1})
              }
            }
            if (vm.total === 0) {
              vm.isEmpty = true
            } else {
              vm.isEmpty = false
            }
          } else {
            vm.imageList = []
            vm.total = 0
            vm.isEmpty = true
          }
        })
      }
    },
    created: function () {
      if (this.$route.params.id !== undefined) {
        this.param.houseId = this.$route.params.id
        this.form.houseId = this.$route.params.id
      }
      this.getImage(this.param)
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/variable/variable.less';
  .content{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around;
    min-height: 500px;
  }
  .imageItem{
    width: 370px;
    height: 220px;
    position: relative;
    margin-bottom: 30px;
  }
  .tip{
    position: absolute;
    bottom:0;
    width: 100%;
    height:25px;
    background: @layout-header-background;
    transition: height .5s;
    font-size: 14px;
    color: #fff;
  }
  .imageItem:hover .tip{
    height:0px;
    color: transparent;
  }
  .tipInfo:first-child{
    padding: 15px 15px 5px;
  }
  .tipInfo:last-child{
    padding: 0 15px 0;
  }
  .empty{
    position: absolute;
    top:0;bottom:0;
    margin-top: auto;
    margin-bottom: auto;
    height: 30px;
    font-size:22px;
  }
  .imageItem:hover .mask-image{
    opacity: 1;
  }
  .mask-image{
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: @layout-header-background;
    transition: height .5s;
    font-size: 14px;
    color: #fff;
    opacity: 0;
  }
</style>
