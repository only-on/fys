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
        <span>租赁图片</span>
      </div>
    </Row>
    <div class="detailBody">
      <div>
        <Row>
          <Button class="btn-save" style="float: right;margin-right: 20px" @click="add">创建图片</Button>
        </Row>
        <div class="content">
          <div class="empty" v-if="imageList.length < 1">暂无数据</div>
          <Row v-if="imageList.length > 0" :gutter="16">
            <Col span="6" v-for="(item, index) in imageList" :key="index">
            <div class="imageItem"  style="margin-bottom: 20px;">
              <a :href="item.url" target="_blank">
                <img :src="item.url" alt="" style="width: 100%;height: 220px;">
              </a>
              <div class="mask-image">
                <Icon type="ios-trash-outline" @click.native="handleRemoveImage(item.id)" size="24" color="#fff" ></Icon>
              </div>
            </div>
            </Col>

          </Row>
        </div>
      </div>
      <Modal v-model="modal" >
        <p slot="header" >创建图片
        </p>
        <div class="formContent">
          <Form :model="form" :label-width="150" ref="formItem">

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
  import { leaseImagesList, uploadImg, leaseImagesAdd, leaseImagesDelete } from '../../../api/api'
  export default {
    data () {
      return {
        img: '',
        form: {
          houseLeaseId: '',
          imageIds: ''
        },
        modal: false,
        isEmpty: true,
        param: {
          houseLeaseId: ''
        },
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
            leaseImagesDelete(par).then(res => {
              if (res.data.code === 1000) {
                thi.$Message.success('删除成功！')
                thi.getImage(this.param.houseLeaseId)
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
          leaseImagesAdd(this.form).then((res) => {
            if (res.data.code === 1000) {
              this.getImage(this.param.houseLeaseId)
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
        this.$router.push({name: 'house_lease', params: {id: this.$route.params.id, param: this.$route.params.param}})
      },
      // 图片
      getImage (par) {
        let parp = {
          houseLeaseId: par
        }
        // console.log(parp)
        leaseImagesList(parp).then(res => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.imageList = result
            // console.log(this.imageList)
            // let num = this.imageList.length % 4
            // if (num !== 0) {
            //   for (let i = 0; i < (4 - num); i++) {
            //     this.imageList.push({url: -1})
            //   }
            // }
          }
        })
      }
    },
    created: function () {
      if (this.$route.params.leaseId !== undefined) {
        this.form.houseLeaseId = this.$route.params.leaseId
        this.param.houseLeaseId = this.$route.params.leaseId
        this.getImage(this.$route.params.leaseId)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/variable/variable.less';
  .content{
    margin-top: 20px;
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*justify-content:space-around;*/
    min-height: 500px;
  }
  .imageItem{
    width: 100%;
    height: 220px;
    position: relative;
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
    height: 30px;
    font-size:22px;
    text-align: center;
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
