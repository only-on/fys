<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         固定资产登记
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>固定资产详情</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">资产信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="资产名称">
                {{formItem.fixedAssetsName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="资产分类">
              {{formItem.typeName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="分类参数">
                <div v-for="(item,index) in paramList" :key="item.paramId" style="margin-bottom: 5px;text-align: left">
                  <span>{{item.paramName}}</span> - {{item.value}}
                </div>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="所属单位">
                {{formItem.belongUnit}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="设置过期时间">
                {{formItem.isExpire === '1' ? '是' : '否'}}
              </FormItem>
            </Row>
            <div v-if="formItem.isExpire === '1'">
              <Row type="flex">
                <FormItem label="过期日期">
                  {{formItem.expireTime}}
                </FormItem>
              </Row>
              <Row type="flex">
                <FormItem label="提前提醒天数">
                  {{formItem.earlierNotice}} 天
                </FormItem>
              </Row>
              <Row type="flex">
                <FormItem label="提醒方式">
                  {{formItem.noticeType === '0' ? '手机短信' : '消息通知'}}
                </FormItem>
              </Row>
            </div>
            <Row type="flex">
              <FormItem label="资产状态">
               {{getStatus(formItem.status)}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="监管人姓名">
               {{formItem.supervisor}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="联系电话">
               {{formItem.phone}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="详细地址">
                {{formItem.position}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="资产经度">
                {{formItem.lng}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="资产纬度">
                {{formItem.lat}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="实景图中像素位置X">
                {{formItem.pixelX}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="实景图中像素位置Y">
                {{formItem.pixelY}}
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { fixedAssetDetail } from '../../../api/api'
  export default {
    data () {
      return {
        paramList: [],
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
          typeName: '',
          belongUnit: '',
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
      getStatus (status) {
        for (let i = 0; i < this.statusList.length; i++) {
          if (status === this.statusList[i].value) {
            return this.statusList[i].label
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
            for (let i = 0; i < result.params.length; i++) {
              let s = {
                paramId: result.params[i].id,
                value: result.params[i].value,
                paramName: result.params[i].paramName
              }
              this.paramList[i] = s
            }
          } else {
            this.formItem = {
              id: this.$route.params.id,
              fixedAssetsName: '',
              typeName: '',
              belongUnit: '',
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
