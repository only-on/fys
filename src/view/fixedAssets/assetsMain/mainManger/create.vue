<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         固定资产管维
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>{{formItem.id === '' ? '创建' :'编辑'}}维护记录</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">维护记录</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="资产分类" class="selfValidate">
                <Select v-model="fixedType" style="width:300px;float: left;" placeholder="资产分类" clearable @on-change="changeType">
                  <Option v-for="item in typeList" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="资产名称" class="selfValidate">
                <Select v-model="formItem.fiexdAssetsId" style="width:300px;float: left;" placeholder="资产名称" clearable>
                  <Option v-for="item in fixedList" :value="item.fixedId" :key="item.fixedId">{{ item.fixedName }}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="维护类型" class="selfValidate">
                <RadioGroup v-model="formItem.type">
                  <Radio label="2">维护保养</Radio>
                  <Radio label="1">损坏维修</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="维护人姓名" class="selfValidate">
                <Input  v-model="formItem.repairer" style="width: 300px;float: left" placeholder="维护人姓名" ></Input><br>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="手机号码" class="selfValidate">
                <Input  v-model="formItem.phone"   placeholder="手机号码" style="width: 300px; float: left" @on-change="mobilePhoneVal(formItem.phone)"></Input>
                <span class="notice" v-if="mobilePhoneNotice">请输入合法的手机号码</span><br>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="维护时间" class="selfValidate">
                <DatePicker type="datetime" placeholder="维护时间" v-model="repairTime" style="float: left;width: 300px;" :editable="false" @on-change="changeDate"></DatePicker>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="维护图片">
                <div class="file">
                  <input type="file" @change="handleUpload" ref="upload" style="height: 30px;">上传图片
                </div>
                <div class="box-image" v-show="typeImage !== '' && typeImage !== null">
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
              <FormItem label="维护内容">
                <Input v-model="formItem.repairContent" maxlength="100" show-word-limit type="textarea" placeholder="请输入维护内容" :autosize="{minRows: 2,maxRows: 5}" style="width: 300px" /><br>
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
  import { fixedRepairAdd, fixedRepairDetail, fixedTypePull, fixedPull, fixedRepairUpdate, uploadImg } from '../../../../api/api'
  export default {
    data () {
      return {
        repairTime: '',
        fixedType: '',
        typeList: [],
        fixedList: [],
        mobilePhoneNotice: false,
        typeImage: '',
        formItem: {
          id: '',
          fiexdAssetsId: '',
          repairContent: '',
          imageId: '',
          repairer: '',
          phone: '',
          repairTime: '',
          type: '2'
        }
      }
    },
    methods:{
      // 资产分类下拉
      getTypeList () {
        fixedTypePull().then(res => {
          if (res.data.code === 1000) {
            this.typeList = res.data.content
          } else {
            this.typeList = []
          }
        })
      },
      changeType (change) {
        this.getFixed(change)
      },
      // 资产下拉
      getFixed (id) {
        let par = {
          typeId: id
        }
        fixedPull(par).then(res => {
          if (res.data.code === 1000) {
            this.fixedList = res.data.content
          } else {
            this.fixedList = []
          }
        })
      },
      mobilePhoneVal (string) {
        this.formItem.phone = string.trim()
        var validataPrice = /(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/
        if (!validataPrice.test(string.trim())) {
          this.mobilePhoneNotice = true
        } else {
          this.mobilePhoneNotice = false
        }
      },
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
            this.formItem.imageId = res.data.content.id
          } else {
            this.$Message.error(res.data.message)
          }
          this.$refs.upload.value = ''
        })
      },
      removeImage () {
        this.typeImage = ''
        this.formItem.imageId = ''
      },
      changeDate (change) {
        if (change !== '' && change !== undefined) {
          this.formItem.repairTime = change
        } else {
          this.formItem.repairTime = ''
        }
      },
      submitVal (formData) {
        if (this.fixedType === '' || this.fixedType === undefined) {
          this.$Message.error('资产分类不能为空！')
          return false
        } else if (formData.fiexdAssetsId === '' || formData.fiexdAssetsId === undefined) {
          this.$Message.error('固定资产不能为空！')
          return false
        } else if (formData.repairer.trim().length === 0) {
          this.$Message.error('维护人姓名不能为空！')
          return false
        } else if (formData.phone === '') {
          this.$Message.error('手机号码不能为空！')
          return false
        } else if (this.mobilePhoneNotice === true) {
          this.$Message.error('请输入合法的手机号码！')
          return false
        } else if (formData.repairTime === '') {
          this.$Message.error('维护时间不能为空！')
          return false
        } else {
          return true
        }
      },
      save () {
        if (this.submitVal(this.formItem)) {
          if (this.formItem.id === '' || this.formItem.id === undefined) {
            fixedRepairAdd(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('维护记录创建成功！')
                this.$router.push({name: 'assets_Main'})
              } else {
                this.$Message.error(res.data.message)
              }
            })
          } else {
            fixedRepairUpdate(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('维护记录编辑成功！')
                this.$router.push({name: 'assets_Main', params:{param: this.$route.params.param}})
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        }
      },
      getDetail (id) {
        let par = {
          repairId: id
        }
        fixedRepairDetail(par).then(res => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.formItem = {
              id: result.id,
              fiexdAssetsId: result.fiexdAssetsId,
              repairContent: result.repairContent,
              imageId: result.imageId,
              repairer: result.repairer,
              phone: result.phone,
              repairTime: result.repairTime,
              type: result.type + ''
            }
            this.repairTime = result.repairTime
            this.fixedType = result.fixedTypeId
            this.getFixed(result.fixedTypeId)
            this.typeImage = result.imageUrl
          } else {
            this.formItem = {
              id: this.$route.params.id,
              fiexdAssetsId: '',
              repairContent: '',
              imageId: '',
              repairer: '',
              phone: '',
              repairTime: ''
            }
          }
        })
      },
      back () {
        if (this.formItem.id === '') {
          this.$router.push({name: 'assets_Main'})
        } else {
          this.$router.push({name: 'assets_Main', params:{param: this.$route.params.param}})
        }
      }
    },
    created:function () {
      // 资产分类下拉
      this.getTypeList()
      if (this.$route.params.id !== undefined) {
        this.formItem.id = this.$route.params.id
        this.getDetail(this.formItem.id)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/styles/variable/variable.less';

</style>
