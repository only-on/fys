<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         房屋管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>房屋视频</span>
      </div>
    </Row>
    <div class="detailBody">
      <div  class="detailContentImage">
        <Row>
          <Select v-model="param.type" class="head-search" style="width:200px;float: left;margin-left: 20px " placeholder="视频类型" clearable @on-change="changeUser" :transfer="true">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <Button class="btn-save" style="float: right;margin-right: 20px" @click="add">创建视频</Button>
        </Row>
        <div class="content">
          <div class="empty" v-if="isEmpty">暂无数据</div>
          <div class="imageItem" v-if="!isEmpty" v-for="(item, index) in imageList" :key="index" :style="{'visibility': item.url === -1 ? 'hidden': 'visible'}">
            <div style="width:370px;height: 220px"  class="videoImg">
              <img :src="videoImg" height="220" width="370"/>
              <!--<div height="220" width="370">-->

                <!--<video-player  class="video-player vjs-custom-skin"-->
                               <!--ref="videoPlayer"-->
                               <!--:playsinline="true"-->
                               <!--:options="item.playerOptions"-->
                <!--&gt;-->
                <!--</video-player>-->
              <!--</div>-->
            </div>
            <div class="tip">
              <Row class="tipInfo">
                <div style="float:left">{{item.type === '1' || item.type === 1 ? 'AR' : item.type === '2' || item.type === 2 ? '普通视频' : item.type === '3' || item.type === 3 ? 'Bim' : ''}}</div>
              </Row>
            </div>
            <div class="mask-image">
              <Icon type="ios-trash-outline" @click.native="handleRemoveImage(item.id)" size="24" color="#fff" ></Icon>
            </div>
            <div class="tipPlay">
              <Icon type="md-play" color="#fff" size="60" @click="play(item)"/>
            </div>
          </div>
        </div>
        <div style="text-align: center;margin-top: 10px">
          <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                ref="tablePage" show-elevator :transfer="true"></Page>
        </div>
      </div>
      <Modal v-model="modal" width="600">
        <p slot="header" >创建视频
        </p>
        <div class="formContent" >
          <Form :model="form" :label-width="100" ref="formItem" style="text-align: left">

            <FormItem label="类型" class="selfValidate">
              <RadioGroup v-model="form.type" >
                <Radio label="1">AR</Radio>
                <Radio label="2">普通视频</Radio>
                <Radio label="3">Bim</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="视频" class="selfValidate">
              <div  class="file" style="">
                <input type="file" @change="handleUpload"   style="height: 30px;" ref="upload">上传视频
              </div>
              <Row v-show="img !== ''">
                <Col span="24">
                <img src="../../../assets/image/video.jpg" height="220" width="370"/>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
        <div slot="footer" style="text-align: right">
          <Button  @click="homeImageAdd">创建视频</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import { homeVideosList, uploadVideo, homeVideosAdd, homeVideosDel } from '../../../api/api'
  import { videoPlayer } from 'vue-video-player';
  import videoImg from '../../../assets/image/video.jpg'
  export default {
    components: {
      videoPlayer
    },
    data () {
      return {
        videoImg: videoImg,
        img: '',
        form: {
          houseId: '',
          videoIds: '',
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
            name: 'AR'
          },
          {
            id: 2,
            name: '普通视频'
          },
          {
            id: 3,
            name: 'Bim'
          }
        ],
        imageList: []
      }
    },
    methods: {
      play (item) {
        let video = {
          videoId: item,
          param: this.param
        }
        this.$router.push({name: 'house_video_play', params: {id: this.$route.params.id, param: this.$route.params.param, video: video}})
      },
      handleRemoveImage (id) {
        let thi = this
        thi.$Modal.confirm({
          title: '确认删除该视频?',
          onOk: () => {
            let par = {
              id: id
            }
            homeVideosDel(par).then(res => {
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
        this.form.videoIds = ''
        this.modal = true
      },
      handleUpload (file) {
        var formData = new FormData()
        for (var image of file.target.files) {
          formData.append('video_file', image)
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        uploadVideo(formData, config).then((res) => {
          if (res.data.code === 1000) {
            this.img = res.data.content.url
            this.form.videoIds = res.data.content.id
          } else {
            this.$Message.error(res.data.message)
          }
          this.$refs.upload.value = ''
        })
      },
      homeImageAdd () {
        if (this.form.videoIds !== '') {
          homeVideosAdd(this.form).then((res) => {
            if (res.data.code === 1000) {
              this.getImage(this.param)
              this.modal = false
            } else {
              this.$Message.error(res.data.message)
            }
          })
        } else {
          this.$Message.error('视频不能为空')
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
      // 视频
      getImage (par) {
        let vm = this
        homeVideosList(par).then((res) => {
          if (res.data.code === 1000) {
            vm.imageList = res.data.content.list
            vm.total = res.data.content.total
            // for (let j = 0; j < vm.imageList.length; j++) {
            //   // console.log(j);
            //   let play = {
            //     autoplay: false,
            //     muted: false,
            //     loop: false,
            //     preload: 'auto',
            //     language: 'zh-CN',
            //     aspectRatio: '16:9',
            //     fluid: true,
            //     sources: [{
            //       type: 'video/mp4',
            //       src: vm.imageList[j].url
            //     }],
            //     poster: vm.videoImg,
            //     notSupportedMessage: '此视频暂无法播放，请稍后再试'
            //   }
            //   vm.imageList[j].playerOptions = play
            // }
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
    mounted: function () {
      if (this.$route.params.id !== undefined) {
        this.param.houseId = this.$route.params.id
        this.form.houseId = this.$route.params.id
        if (this.$route.params.video !== undefined) {
          this.param = this.$route.params.video.param
        }
        this.getImage(this.param)
      }
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
    z-index: 999;
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
  .tipPlay{
    height: 60px;
    width: 60px;
    /*background-color: red;*/
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    /*height:60px;*/
    transition: height .5s;
    z-index: 9999;
    text-align: center;
    opacity: 0;
  }
  .videoImg{
    position: relative;
  }
  .imageItem:hover .tipPlay{
    opacity: 1;
  }
</style>
