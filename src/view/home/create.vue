<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         房屋管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>{{formItem.id === '' || formItem.id === undefined ? '创建' :'编辑'}}房屋</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">房屋信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="房屋名称" class="selfValidate">
                <Input  v-model="formItem.houseName" style="width: 300px;float: left" placeholder="请输入房屋名称" ></Input>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋类型" class="selfValidate">
                <RadioGroup v-model="formItem.type" style="float: left;">
                  <!--<Radio label="" style="margin-right: 20px">全部资讯</Radio>-->
                  <Radio label="0" style="margin-right: 20px">重要房屋</Radio>
                  <Radio label="1" style="margin-right: 20px">一般房屋</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="是否租赁" class="selfValidate">
                <RadioGroup v-model="formItem.lease" style="float: left;" @on-change="leaseChange">
                  <!--<Radio label="" style="margin-right: 20px">全部资讯</Radio>-->
                  <Radio label="0" style="margin-right: 20px">否</Radio>
                  <Radio label="1" style="margin-right: 20px">全部出租</Radio>
                  <Radio label="2" style="margin-right: 20px">部分出租</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋类别" class="selfValidate">
                <RadioGroup v-model="formItem.form" style="float: left;">
                  <!--<Radio label="" style="margin-right: 20px">全部资讯</Radio>-->
                  <Radio label="1" style="margin-right: 20px">公有</Radio>
                  <Radio label="2" style="margin-right: 20px">私有</Radio>
                  <Radio label="3" style="margin-right: 20px">代管</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="使用状态" class="selfValidate">
                <RadioGroup v-model="formItem.useState" style="float: left;">
                  <!--<Radio label="" style="margin-right: 20px">全部资讯</Radio>-->
                  <Radio label="0" style="margin-right: 20px"v-show="formItem.lease !== '0'">待出租</Radio>
                  <Radio label="1" style="margin-right: 20px"v-show="formItem.lease !== '0'">部分出租中</Radio>
                  <Radio label="2" style="margin-right: 20px" v-show="formItem.lease !== '0'">全部出租中</Radio>
                  <Radio label="3" style="margin-right: 20px" v-show="formItem.lease === '0'">自用</Radio>
                  <Radio label="4" style="margin-right: 20px" v-show="formItem.lease === '0'">空闲</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋面积">
                <InputNumber  v-model="formItem.area"  style="width: 300px; float: left;margin-right: 5px" :formatter="value => `${value}`.replace(/\d+\.\d{2,}/g, `${value}`.substr(0, `${value}`.indexOf('.')+3))"
                              :parser="value => value.replace('-', '')" :min="1" :max="99999999"></InputNumber>㎡
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="详细地址">
                <span v-if="formItem.street === ''" class="noticeTextGray">请在地图上点击选择地址或输入框搜索地址</span>
                {{formItem.street}}
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
              <FormItem label="房屋经度">
                <Input  v-model="formItem.lng" style="width: 300px;float: left" ></Input>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋纬度">
                <Input  v-model="formItem.lat" style="width: 300px;float: left" ></Input>
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
            <Row type="flex">
              <FormItem label="房屋所有人姓名">
                <Input  v-model="formItem.owner" style="width: 300px;float: left" placeholder="请输入房屋所有人姓名" ></Input>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="房屋所有人身份证号">
                <Input  v-model="formItem.ownerIdCard" style="width: 300px;float: left" placeholder="请输入房屋所有人身份证号" @on-change="idCardVal(formItem.ownerIdCard)"></Input>
                <span class="notice" v-if="idCardNotice">请输入合法的二代身份证号码</span>
              </FormItem>
            </Row>
            <Row type="flex">
              <Col span="24">
              <FormItem label="房屋说明">
                <Input v-model="formItem.explains" maxlength="100" show-word-limit type="textarea" placeholder="请输入房间说明" :autosize="{minRows: 2,maxRows: 5}" style="width: 100%" /><br>
              </FormItem>
              </Col>
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
  import { homeAdd, homeDetail, homeUpdate } from '../../api/api'
  export default {
    data () {
      return {
        idCardNotice: false,
        mobilePhoneNotice: false,
        map: null,
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
      idCardVal (string) {
        this.formItem.tenantIdCard = string.trim()
        let validataPrice = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (this.formItem.tenantIdCard !== '') {
          if (!validataPrice.test(string.trim())) {
            this.idCardNotice = true
          } else {
            this.idCardNotice = false
          }
        } else {
          this.idCardNotice = false
        }
      },
      leaseChange () {
        if (this.formItem.lease === '0') {
          this.formItem.useState = '3'
        } else {
          this.formItem.useState = '0'
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
          thi.formItem.street = value.province +  value.city +  value.district +  value.street +  value.business
          thi.setPlace()
        })
        thi.map.addEventListener('onclick',function (e) {
          thi.formItem.lng = e.point.lng
          thi.formItem.lat = e.point.lat
          let geoc = new BMap.Geocoder()
          geoc.getLocation(e.point, function(rs){
            var addComp = rs.addressComponents
            thi.formItem.street = addComp.province + addComp.city + addComp.district+ addComp.street + addComp.streetNumber
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
        if (formData.houseName.toString().trim().length === 0) {
          this.$Message.error('房屋名称不能为空！')
          return false
        } else if (this.idCardNotice === true) {
          this.$Message.error('身份证格式不合法！')
          return false
        } else {
          return true
        }
      },
      save () {
        if (this.submitVal(this.formItem)) {
          if (this.formItem.id === '' || this.formItem.id === undefined) {
            homeAdd(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('房屋创建成功！')
                this.back()
              } else {
                this.$Message.error(res.data.message)
              }
            })
          } else {
            homeUpdate(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('房屋编辑成功！')
                this.back()
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        }
      },
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
        if (this.formItem.id === '') {
          this.$router.push({name: 'house'})
        } else {
          this.$router.push({name: 'house', params:{param: this.$route.params.param}})
        }
      }
    },
    mounted:function () {
      this.loadMap()
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
