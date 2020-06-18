<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         资产分类管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>{{formItem.id === '' ? '创建' :'编辑'}}分类</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">分类信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="分类名称" class="selfValidate">
                <Input  v-model="formItem.typeName" style="width: 300px;float: left" placeholder="请输入分类名称" ></Input><br>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="分类图片" class="selfValidate">
                <div class="file">
                  <input type="file" @change="handleUpload" ref="upload" style="height: 30px;">上传图片
                </div>
                <div class="box-image" v-show="typeImage !== ''">
                  <a :href= typeImage target="_blank">
                    <img :src=typeImage style="width: 100px;height: 100px" alt="上传照片">
                  </a>
                  <div class="mask-image">
                    <Icon type="ios-trash-outline" @click.native="removeImage" size="24" color="#fff" ></Icon>
                  </div>
                </div>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="分类描述" class="selfValidate">
                <Input v-model="formItem.describ" maxlength="100" show-word-limit type="textarea" placeholder="请输入分类描述" :autosize="{minRows: 2,maxRows: 5}" style="width: 300px" /><br>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="分类参数">
                <div v-for="(item,index) in paramList" :key="index" style="display: flex;align-items: center">
                  <Input  v-model="item.paramName" style="width: 300px;float: left;margin-bottom: 5px" placeholder="请输入分类参数" ></Input>
                  <Button type="text" style="color:#516BEB;" @click="removeParam(index, item.paramId)">删除</Button>
                </div>
                <Button  type="dashed" icon="md-add" style="margin-top: 10px;float: left" @click="addParam">分类参数</Button>
              </FormItem>
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
  import { fixedTypeAdd, fixedTypeDetail, fixedTypeUpdate, uploadImg,fixedTypeDelParam } from '../../../api/api'
  export default {
    data () {
      return {
        typeImage: '',
        paramList: [
          {
            paramId: -1,
            paramName: ''
          }
        ],
        paramFlag: true,
        formItem: {
          id: '',
          typeName: '',
          describ: '',
          iconId: '',
          params: ''
        }
      }
    },
    methods:{
      handleUpload (file) {
        let formData = new FormData()
        for (let image of file.target.files) {
          formData.append('file', image)
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        uploadImg(formData, config).then((res) => {
          if (res.data.code === 1000) {
            this.typeImage = res.data.content.url
            this.formItem.iconId = res.data.content.id
          } else {
            this.$Message.error(res.data.message)
          }
          this.$refs.upload.value = ''
        })
      },
      removeImage () {
        this.typeImage = ''
        this.formItem.iconId = ''
      },
      addParam () {
        let s = {
          paramId: -1,
          paramName: ''
        }
        if (this.paramList.length > 0) {
          let finishItem = this.paramList[this.paramList.length - 1].paramName.trim()
          if (finishItem === '') {
            this.$Message.error('请填写分类参数')
          } else {
            for (let i = 0; i < this.paramList.length -1; i++) {
              if (finishItem === this.paramList[i].paramName.trim()) {
                this.$Message.error('分类参数相同')
                this.paramFlag = false
                break
              }
            }
            if (this.paramFlag) {
              this.paramList.push(s)
            }
          }
        } else {
          this.paramList.push(s)
        }
      },
      removeParam (index,id) {
        if (id === -1) {
          this.paramList.splice(index,1)
        } else {
          let par  = {
            paramId: id
          }
          fixedTypeDelParam(par).then(res => {
            if (res.data.code === 1000) {
              this.paramList.splice(index,1)
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
      submitVal (formData) {
        if (formData.typeName.trim().length === 0) {
          this.$Message.error('分类名称不能为空！')
          return false
        } else if (formData.typeName.trim().length > 30) {
          this.$Message.error('分类名称不能超过30字！')
          return false
        } else if (formData.iconId === '') {
          this.$Message.error('分类图片不能为空！')
          return false
        } else if (formData.describ.trim().length === 0) {
          this.$Message.error('分类描述不能为空！')
          return false
        } else {
          return true
        }
      },
      save () {
        if (this.submitVal(this.formItem)) {
          if (this.formItem.id === '' || this.formItem.id === undefined) {
            if (this.paramList.length !== 0 && this.paramList[0].paramName !== '') {
              for (let i = 0; i < this.paramList.length; i++) {
                this.formItem.params += this.paramList[i].paramName + ','
              }
              this.formItem.params.substr(0, this.formItem.params.length - 1)
            }
            fixedTypeAdd(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('分类创建成功！')
                this.$router.push({name: 'assetsCategory'})
              } else {
                this.$Message.error(res.data.message)
              }
            })
          } else {
            this.formItem.params = this.paramList
            fixedTypeUpdate(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('分类编辑成功！')
                this.$router.push({name: 'assetsCategory', params:{param: this.$route.params.param}})
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        }
      },
      getDetail (id) {
        let par = {
          fixedTypeId: id
        }
        fixedTypeDetail(par).then(res => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.formItem = {
              id: result.id,
              typeName: result.typeName,
              describ: result.describ,
              iconId: result.iconId,
              params: result.params
            }
            this.typeImage = result.url
            this.paramList = this.formItem.params
          } else {
            this.formItem = {
              id: this.$route.params.id,
              typeName: '',
              describ: '',
              iconId: '',
              params: ''
            }
          }
        })
      },
      back () {
        if (this.formItem.id === '') {
          this.$router.push({name: 'assetsCategory'})
        } else {
          this.$router.push({name: 'assetsCategory', params:{param: this.$route.params.param}})
        }
      }
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
  @import '../../../assets/styles/variable/variable.less';

</style>
