<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         固定资产预警管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>预警规则详情</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">规则信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="资产分类">
                {{formItem.typeName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="定期维护">
               {{formItem.isMaintain === '1' ? '是' : '否'}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="告警方式">
                {{formItem.warningMode === '0' ? '手机短信' : '消息通知'}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="提前预警天数">
                {{formItem.advanceDay}} 天
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="维护周期">
                {{formItem.cycle}} 天
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {fixedWarnDetail} from '../../../api/api'
  export default {
    data () {
      return {
        formItem: {
          typeName: '',
          isMaintain: '1',
          advanceDay: null,
          warningMode: '0',
          cycle: null
        }
      }
    },
    methods:{
      getDetail (id) {
        let par = {
          fixedTypeId: id
        }
        fixedWarnDetail(par).then(res => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.formItem = {
              id: result.id,
              typeName: result.typeName,
              isMaintain: result.isMaintain + '',
              advanceDay: result.advanceDay,
              warningMode: result.warningMode + '',
              cycle: result.cycle
            }
          } else {
            this.formItem = {
              id: this.$route.params.id,
              typeName: '',
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
      if (this.$route.params.row !== undefined) {
        this.formItem.id = this.$route.params.row.typeId
        this.getDetail(this.formItem.id)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/variable/variable.less';

</style>
