<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         资讯管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>资讯详情</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">资讯信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem" >
            <Row type="flex" justify="start">
              <FormItem label="来源/作者">
                {{formItem.source}}
              </FormItem>
            </Row>
            <Row type="flex" justify="start">
              <FormItem label="资讯标题" >
                {{formItem.title}}
              </FormItem>
            </Row>
            <Row type="flex" justify="start">
              <FormItem label="资讯图片" >
                <Row v-show="img !== ''">
                  <Col span="4">
                  <a :href=img target="_blank">
                    <img :src=img style="width: 100px;height: 100px" alt="暂未传照片">
                  </a>
                  </Col>
                </Row>
              </FormItem>
            </Row>
            <Row type="flex" justify="start">
              <FormItem label="资讯类型" >
                {{formItem.contentType === '0' ? '推送链接' : '富文本信息'}}
              </FormItem>
            </Row>
            <Row type="flex" justify="start" v-if="formItem.contentType === '0'">
              <FormItem label="推送链接" >
                {{formItem.content}}
              </FormItem>
            </Row>
            <Row type="flex" justify="start" v-if="formItem.contentType === '1'">
              <FormItem label="资讯详情">
                <vue-editor v-model="formItem.content" useCustomImageHandler disabled></vue-editor>
              </FormItem>
            </Row>
            <Row type="flex" justify="start">
              <FormItem label="即时发布">
                {{formItem.isPost === true ? '是': '否'}}
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import { uploadImg, informationDetail } from '../../../api/api'
  export default {
    components: {
      VueEditor
    },
    data () {
      return {
        faceCardNotice: false,
        img: '',
        formItem: {
          id: '',
          isPost: true,
          contentType: '0',
          titleImageId: '',
          title: '',
          source: '',
          content: ''
        }
      }
    },
    methods: {
      getDetail (id) {
        let p = {
          id: id
        }
        informationDetail(p).then((res) => {
          // console.log(res)
          if (res.data.code === 1000) {
            this.formItem.isPost = res.data.content.isPost
            this.formItem.contentType = res.data.content.contentType.toString()
            this.formItem.titleImageId = res.data.content.titleImageId
            this.formItem.title = res.data.content.title
            this.formItem.source = res.data.content.source
            this.formItem.content = res.data.content.content
            this.img = res.data.content.titleImage.url
          }
        })
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
            this.faceCardNotice = false
            this.formItem.titleImageId = res.data.content.id
            this.img = res.data.content.url
          }
        })
      },
      back () {
        if (this.formItem.id === '') {
          this.$router.push({name: 'information'})
        } else {
          this.$router.push({name: 'information', params:{param: this.$route.params.param}})
        }
      },
      // 富文本图片上传————————————————————————————————————————————
      handleImageAdded (file, Editor, cursorLocation) {
        // console.log(file)
        var formData = new FormData()
        formData.append('file', file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        uploadImg(formData, config).then((res) => {
          let url = res.data.content.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url)
        })
      }
    },
    created: function () {
      if (this.$route.params.id !== undefined) {
        this.formItem.id = this.$route.params.id
        this.getDetail(this.formItem.id)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/variable/variable.less';
</style>
