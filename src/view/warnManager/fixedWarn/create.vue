<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         固定资产预警管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>{{formItem.id === '' ? '创建' :'编辑'}}预警规则</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">规则信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="资产分类" class="selfValidate">
                <span v-if="$route.params.row !== undefined"> {{typeName}}</span>
                <Select v-else v-model="typeId" style="width:300px" placeholder="请选择资产分类" clearable>
                  <Option v-for="item in typeList" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row type="flex" v-show="$route.params.row !== undefined">
              <FormItem label="定期维护" class="selfValidate">
                <RadioGroup v-model="formItem.isMaintain" @on-change="changeMaintain">
                  <Radio label="1">是</Radio>
                  <Radio label="0">否</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <div v-show="formItem.isMaintain === '1'">
              <Row type="flex">
                <FormItem label="告警方式" class="selfValidate">
                  <RadioGroup v-model="formItem.warningMode">
                    <Radio label="0">手机短信</Radio>
                    <Radio label="1">消息推送</Radio>
                  </RadioGroup>
                </FormItem>
              </Row>
              <Row type="flex">
                <FormItem label="提前预警天数" class="selfValidate">
                  <InputNumber  v-model="formItem.advanceDay"  style="width: 300px;margin-right: 5px" :formatter="value => `${value}`.replace('.', '')"  :parser="value => value.replace('-', '')"></InputNumber>
                  天
                </FormItem>
              </Row>
              <Row type="flex">
                <FormItem label="维护周期" class="selfValidate">
                  <InputNumber  v-model="formItem.cycle"  style="width: 300px;margin-right: 5px" :formatter="value => `${value}`.replace('.', '')"  :parser="value => value.replace('-', '')"></InputNumber>
                  天
                </FormItem>
              </Row>
            </div>
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
  import { fixedWarnAdd, unWarnPull, fixedWarnDetail, fixedWarnUpdate} from '../../../api/api'
  export default {
    data () {
      return {
        typeId: '',
        typeList:[],
        typeName: '',
        formItem: {
          id: '',
          isMaintain: '1',
          advanceDay: null,
          warningMode: '0',
          cycle: null
        }
      }
    },
    methods:{
      // 资产分类下拉
      getTypeList () {
        unWarnPull().then(res => {
          if (res.data.code === 1000) {
            this.typeList = res.data.content
          } else {
            this.typeList = []
          }
        })
      },
      changeMaintain () {
        this.formItem.advanceDay = null
        this.formItem.cycle = null
        this.formItem.warningMode = '0'
      },
      submitVal (formData) {
        if (formData.advanceDay === null) {
          this.$Message.error('提前预警天数不能为空！')
          return false
        } else if (formData.cycle === null) {
          this.$Message.error('维护周期不能为空！')
          return false
        } else if (formData.advanceDay >= formData.cycle) {
          this.$Message.error('提前预警天数必须小于维护周期！')
          return false
        } else {
          return true
        }
      },
      save () {
        if (this.formItem.isMaintain === '0' || this.submitVal(this.formItem)) {
          this.formItem.id = this.typeId
          if (this.$route.params.row === undefined) {
            fixedWarnAdd(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('预警规则创建成功！')
                this.$router.push({name: 'warn'})
              } else {
                this.$Message.error(res.data.message)
              }
            })
          } else {
            fixedWarnUpdate(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('预警规则编辑成功！')
                this.$router.push({name: 'warn', params:{param: this.$route.params.param}})
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
        fixedWarnDetail(par).then(res => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.formItem = {
              id: result.id,
              isMaintain: result.isMaintain + '',
              advanceDay: result.advanceDay,
              warningMode: result.warningMode + '',
              cycle: result.cycle
            }
            this.typeName = result.typeName
          } else {
            this.formItem = {
              id: this.$route.params.id,
              isMaintain: '1',
              advanceDay: null,
              warningMode: '0',
              cycle: null
            }
          }
        })
      },
      back () {
        this.$router.push({name: 'warn', params:{param: this.$route.params.param}})
      }
    },
    created:function () {
      this.getTypeList()
      if (this.$route.params.row !== undefined) {
        this.formItem.id = this.$route.params.row.typeId
        this.typeId = this.formItem.id
        this.getDetail(this.formItem.id)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/variable/variable.less';

</style>
