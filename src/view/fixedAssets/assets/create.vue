<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         固定资产登记
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>{{formItem.id === '' ? '创建' :'编辑'}}固定资产</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">资产信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="资产名称" class="selfValidate">
                <Input  v-model="formItem.fixedAssetsName" style="width: 300px;float: left" placeholder="请输入资产名称" ></Input>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="资产分类" class="selfValidate">
                <Select v-model="formItem.type" style="width:300px" placeholder="请选择资产分类" clearable @on-change="changeType">
                  <Option v-for="item in typeList" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="分类参数" v-show="formItem.type !== ''&& formItem.type !== undefined">
                  <div v-for="(item,index) in paramList" :key="item.paramId" style="margin-bottom: 5px;text-align: left">
                    <span>{{item.paramName}}</span> - <Input v-model="item.value" style="width:150px" placeholder="参数值" ></Input>
                  </div>
                <span v-if="paramList.length === 0" class="noticeTextGray">暂无分类参数</span>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="所属单位" class="selfValidate">
                <Input  v-model="formItem.belongUnit" style="width: 300px;float: left" placeholder="请输入所属单位" ></Input>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="设置过期时间" class="selfValidate">
                <RadioGroup v-model="formItem.isExpire" @on-change="changeExpire">
                  <Radio label="1">是</Radio>
                  <Radio label="0">否</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <div v-show="formItem.isExpire === '1'">
              <Row type="flex">
                <FormItem label="过期日期" class="selfValidate">
                  <DatePicker type="datetime" placeholder="过期日期" v-model="expireTime" style="float: left;width: 300px;" :editable="false" @on-change="changeDate"></DatePicker>
                </FormItem>
              </Row>
              <Row type="flex">
                <FormItem label="提前提醒天数" class="selfValidate">
                  <InputNumber  v-model="formItem.earlierNotice"  style="width: 300px;margin-right: 5px" :formatter="value => `${value}`.replace('.', '')"  :parser="value => value.replace('-', '')"></InputNumber>
                  天
                </FormItem>
              </Row>
              <Row type="flex">
                <FormItem label="提醒方式" class="selfValidate">
                  <RadioGroup v-model="formItem.noticeType">
                    <Radio label="0">手机短信</Radio>
                    <Radio label="1">消息推送</Radio>
                  </RadioGroup>
                </FormItem>
              </Row>
            </div>
            <Row type="flex">
              <FormItem label="资产状态">
                <Select v-model="formItem.status" style="width:300px;float: left;" placeholder="资产状态" clearable >
                  <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="监管人姓名">
                <Input  v-model="formItem.supervisor" style="width: 300px;float: left" placeholder="请输入监管人姓名" ></Input>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="联系电话">
                <Input  v-model="formItem.phone" style="width: 300px;float: left" placeholder="请输入联系电话" @on-change="mobilePhoneVal(formItem.phone)"></Input>
                <span class="notice" v-if="mobilePhoneNotice">请输入合法的手机号码</span>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="详细地址">
                <span v-if="formItem.position === ''" class="noticeTextGray">请在地图上点击选择地址或输入框搜索地址</span>
                {{formItem.position}}
              </FormItem>
            </Row>
            <Row type="flex" justify="start" style="height:430px;">
              <Col span="15">
              <FormItem>
                <div id="outer-box">
                  <div id="container" tabindex="0"></div>
                  <div id="panel">
                    <input id="searchInput" placeholder="输入关键字搜索地址"/>
                    <div id="searchResults"></div>
                  </div>
                </div>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex">
              <FormItem label="资产经度">
                <Input  v-model="formItem.lng" style="width: 300px;float: left" placeholder="例如116.404"></Input>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="资产纬度">
                <Input  v-model="formItem.lat" style="width: 300px;float: left" placeholder="例如39.915"></Input>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="实景图中像素位置X">
                <InputNumber  v-model="formItem.pixelX" style="width: 300px;float: left" ></InputNumber>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="实景图中像素位置Y">
                <InputNumber  v-model="formItem.pixelY" style="width: 300px;float: left" ></InputNumber>
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
  import { fixedAssetadd, fixedAssetDetail, fixedAssetUpdate, fixedTypePull, fixedAssetCatePull } from '../../../api/api'
  export default {
    data () {
      return {
        expireTime: '',
        paramList: [],
        mobilePhoneNotice: false,
        map: null,
        detailAddress: '',
        typeList: [],
        statusList: [
          {
            value: 1,
            label: '正常使用'
          },
          {
            value: 2,
            label: '维修中'
          },
          {
            value: 3,
            label: '淘汰未用'
          }
        ],
        formItem: {
          id: '',
          fixedAssetsName: '',
          type: '',
          belongUnit: '',
          isExpire: '0',
          expireTime: '',
          earlierNotice: null,
          noticeType: '0',
          status: '',
          supervisor: '',
          phone: '',
          lng: '',
          lat: '',
          position: '',
          pixelX: null,
          pixelY: null,
          params: []
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
      // 资产分类选择
      changeType (change) {
        if (change !== '' && change !== undefined) {
          this.getParamPull(change)
        } else {
          this.paramList = []
        }
      },
      // 资产分类参数下拉
      getParamPull (id) {
        let par = {
          typeId: id
        }
        fixedAssetCatePull(par).then(res => {
          if (res.data.code === 1000) {
            this.paramList = res.data.content
            for (let i = 0; i < this.paramList.length; i++) {
              this.paramList[i].value = ''
            }
          } else {
            this.paramList = []
          }
        })
      },
      changeExpire (change) {
        this.formItem.expireTime = ''
        this.formItem.earlierNotice = null
        this.formItem.noticeType = '0'
      },
      changeDate (change) {
        if (change !== '' && change !== undefined) {
          this.formItem.expireTime = change
        } else {
          this.formItem.expireTime = ''
        }
      },
      mobilePhoneVal (string) {
        this.formItem.phone = string.trim()
        let validataPrice = /(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/
        if (this.formItem.phone !== '') {
          if (!validataPrice.test(string.trim())) {
            this.mobilePhoneNotice = true
          } else {
            this.mobilePhoneNotice = false
          }
        } else {
          this.mobilePhoneNotice = false
        }
      },
      loadMap () {
        let thi = this
        let map = new BMap.Map("container",{enableMapClick:false})
        thi.map = map
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 18)
        // 设置地图鼠标滚轮放大缩小
        map.enableScrollWheelZoom()
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
          {"input" : "searchInput"
            ,"location" : map
          })
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
          let value = e.item.value
          thi.formItem.position = value.province +  value.city +  value.district +  value.street +  value.business
          thi.setPlace()
        })
        thi.map.addEventListener('onclick',function (e) {
          thi.formItem.lng = e.point.lng
          thi.formItem.lat = e.point.lat
          let geoc = new BMap.Geocoder()
          geoc.getLocation(e.point, function(rs){
            var addComp = rs.addressComponents
            thi.formItem.position = addComp.province + addComp.city + addComp.district+ addComp.street + addComp.streetNumber
          })
        })
      },
      setPlace(){
        let thi = this
        thi.map.clearOverlays();
        var local = new BMap.LocalSearch(thi.map, { //智能搜索
          onSearchComplete: function () {
            var pp = local.getResults().getPoi(0).point//获取第一个智能搜索的结果
            thi.formItem.lng = pp.lng
            thi.formItem.lat = pp.lat
            thi.map.centerAndZoom(pp, 18)
            thi.map.addOverlay(new BMap.Marker(pp))
          }
        })
        local.search(this.detailAddress)
      },
      submitVal (formData) {
        if (formData.fixedAssetsName.trim().length === 0) {
          this.$Message.error('固定资产名称不能为空！')
          return false
        } else if (formData.type === '' || formData.type === undefined) {
          this.$Message.error('固定资产分类不能为空！')
          return false
        } else if (formData.belongUnit.trim().length === 0) {
          this.$Message.error('所属单位不能为空！')
          return false
        } else if (formData.isExpire === '1' && formData.expireTime === '') {
          this.$Message.error('过期日期不能为空!')
          return false
        } else if (formData.isExpire === '1' && formData.earlierNotice === null) {
          this.$Message.error('提前提醒天数不能为空!')
          return false
        } else if (this.mobilePhoneNotice) {
          this.$Message.error('请输入合法的手机号码!')
          return false
        } else {
          return true
        }
      },
      save () {
        this.formItem.params =  []
        for (let i = 0; i < this.paramList.length; i++) {
          let s = {
            paramId: this.paramList[i].paramId,
            value: this.paramList[i].value,
            intro: ''
          }
          this.formItem.params.push(s)
        }
        if (this.submitVal(this.formItem)) {
          if (this.formItem.id === '' || this.formItem.id === undefined) {
            fixedAssetadd(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('固定资产创建成功！')
                this.$router.push({name: 'assets'})
              } else {
                this.$Message.error(res.data.message)
              }
            })
          } else {
            fixedAssetUpdate(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('固定资产编辑成功！')
                this.$router.push({name: 'assets', params:{param: this.$route.params.param}})
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        }
      },
      getDetail (id) {
        let par = {
          fiexdAssetsId: id
        }
        fixedAssetDetail(par).then(res => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.formItem = result
            this.formItem.isExpire = result.isExpire + ''
            this.formItem.noticeType = result.noticeType + ''
            this.expireTime = result.expireTime
            this.getParamPull(result.type)
            for (let i = 0; i < result.params.length; i++) {
              let s = {
                paramId: result.params[i].id,
                value: result.params[i].value,
                paramName: result.params[i].paramName
              }
              this.formItem.params[i] = s
              this.paramList[i] = s
            }
          } else {
            this.formItem = {
              id: this.$route.params.id,
              fixedAssetsName: '',
              type: '',
              belongUnit: '',
              isExpire: '0',
              expireTime: '',
              earlierNotice: null,
              noticeType: '0',
              status: '',
              supervisor: '',
              phone: '',
              lng: '',
              lat: '',
              position: '',
              pixelX: null,
              pixelY: null
            }
          }
        })
      },
      back () {
        if (this.formItem.id === '') {
          this.$router.push({name: 'assets'})
        } else {
          this.$router.push({name: 'assets', params:{param: this.$route.params.param}})
        }
      }
    },
    mounted:function () {
      this.loadMap()
    },
    created:function () {
      this.getTypeList()
      if (this.$route.params.id !== undefined) {
        this.formItem.id = this.$route.params.id
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
