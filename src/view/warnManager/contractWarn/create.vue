<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         租赁合同预警管理
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
              <FormItem label="预警方式" class="selfValidate">
                <RadioGroup v-model="formItem.alarmMode">
                  <Radio label="0">手机短信</Radio>
                  <Radio label="1">消息推送</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="提前预警天数" class="selfValidate">
                <InputNumber  v-model="formItem.alarmThreshold"  style="width: 300px;margin-right: 5px" :formatter="value => `${value}`.replace('.', '')"  :parser="value => value.replace('-', '')"></InputNumber>
                天
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
  import { contarctWarnAdd, contarctWarnUpdate} from '../../../api/api'
  export default {
    data () {
      return {
        formItem: {
          id: '',
          alarmThreshold: null,
          alarmMode: '0'
        }
      }
    },
    methods:{
      save () {
        if (this.formItem.alarmThreshold !== null) {
          if (this.formItem.id === '' || this.formItem.id === undefined) {
            contarctWarnAdd(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('预警规则创建成功！')
                this.$router.push({name: 'warn',params:{type:this.$route.params.type}})
              } else {
                this.$Message.error(res.data.message)
              }
            })
          } else {
            contarctWarnUpdate(this.formItem).then((res) =>{
              if (res.data.code === 1000) {
                this.$Message.success('预警规则编辑成功！')
                this.$router.push({name: 'warn', params:{param: this.$route.params.param, type:this.$route.params.type}})
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        } else {
          this.$Message.error('提前预警天数不能为空！')
        }
      },
      back () {
        this.$router.push({name: 'warn', params:{param: this.$route.params.param, type:this.$route.params.type}})
      }
    },
    created:function () {
      if (this.$route.params.row !== undefined) {
        let row = this.$route.params.row
        this.formItem = {
          id: row.id,
          alarmThreshold: row.alarmThreshold,
          alarmMode: row.alarmMode + ''
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/variable/variable.less';

</style>
