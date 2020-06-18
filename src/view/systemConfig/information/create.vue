<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         资讯管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>{{formItem.id === '' ? '创建' : '编辑'}}资讯</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">资讯信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem" >
            <Row type="flex" justify="start">
              <FormItem label="来源/作者" class="selfValidate">
                <Input  v-model="formItem.source" style="width: 300px" placeholder="请输入来源/作者"></Input><br>
              </FormItem>
            </Row>
            <Row type="flex" justify="start">
              <FormItem label="资讯标题" class="selfValidate">
                <Input  v-model="formItem.title" style="width: 300px" placeholder="请输入资讯标题"></Input><br>
              </FormItem>
            </Row>
            <Row type="flex" justify="start">
              <FormItem label="资讯图片" class="selfValidate">
                <Row>
                  <div  class="file">
                    <input type="file" @change="handleUpload"   style="height: 30px;" >上传资讯图片
                  </div>
                  <span class="notice" v-if="faceCardNotice">请上传资讯图片</span>
                </Row>
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
              <FormItem label="资讯类型" class="selfValidate">
                <RadioGroup v-model="formItem.contentType" @on-change="radioChange">
                  <Radio label="0">推送链接</Radio>
                  <Radio label="1">富文本信息</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <Row type="flex" justify="start" v-if="formItem.contentType === '0'">
              <FormItem label="推送链接" class="selfValidate">
                <Input  v-model="formItem.content"   style="width: 300px" placeholder="请输入推送链接"></Input><br>
              </FormItem>
            </Row>
            <Row type="flex" justify="start" v-if="formItem.contentType === '1'">
              <FormItem label="资讯详情" class="selfValidate">
                <vue-editor v-model="formItem.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
              </FormItem>
            </Row>
            <Row type="flex" justify="start">
              <FormItem label="即时发布" class="selfValidate">
                <i-switch v-model="formItem.isPost" size="large">
                  <span slot="true" style="padding-left: 8px"> 是</span>
                  <span slot="false" style="padding-left: 8px">否</span>
                </i-switch>
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>
      <Row type="flex" style="margin-top: 30px">
        <Button class="btn-save" @click="submit" style="padding: 5px 30px">保存</Button>
      </Row>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { uploadImg, addInformation, informationDetail, editInformation } from '../../../api/api'
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
    radioChange () {
      this.formItem.content = ''
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
    submitVal () {
      if (this.formItem.title.trim() !== '') {
        if (this.formItem.source.trim() !== '') {
          if (this.formItem.content.trim() !== '') {
            if (this.formItem.titleImageId !== '') {
              return true
            } else {
              this.faceCardNotice = true
              this.$Message.error('资讯图片不能为空！')
              return false
            }
          } else {
            this.$Message.error('资讯详情/推送链接不能为空！')
            return false
          }
        } else {
          this.$Message.error('来源/作者不能为空！')
          return false
        }
      } else {
        this.$Message.error('资讯标题不能为空！')
        return false
      }
    },
    //  新增
    submit () {
      if (this.submitVal()) {
        if (this.formItem.id === '' || this.formItem.id === undefined) {
          addInformation(this.formItem).then((res) => {
            if (res.data.code === 1000) {
              this.$Message.success('资讯创建成功！')
              this.back()
            } else {
              this.$Message.error(res.data.message)
            }
          })
        } else {
          editInformation(this.formItem).then((res) => {
            if (res.data.code === 1000) {
              this.$Message.success('资讯编辑成功！')
              this.back()
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      }
    },
    back () {
      if (this.formItem.id === '') {
        this.$router.push({name: 'information'})
      } else {
        this.$router.push({name: 'information', params:{param: this.$route.params.param}})
      }
    },
    // 富文本图片上传————————————————————————————————————————————
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      // console.log(file)
      // console.log(111)
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
