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
              <FormItem label="资产分类">
               {{formItem.fixedTypeName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="资产名称">
                {{formItem.fixedName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="维护类型">
                {{formItem.type === 1 ? '损坏维修' : '维护保养'}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="维护人姓名">
                {{formItem.repairer}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="手机号码">
               {{formItem.phone}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="维护时间">
                {{formItem.repairTime}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="维护图片">
                <div class="box-image" v-if="formItem.imageUrl !== null">
                  <a :href= formItem.imageUrl target="_blank">
                    <img :src=formItem.imageUrl style="width: 100px;height: 100px" alt="上传照片">
                  </a>
                </div>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="维护内容">
                  {{formItem.repairContent}}
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { fixedRepairDetail } from '../../../../api/api'
  export default {
    data () {
      return {
        formItem: {
          id: '',
          fixedTypeName: '',
          fixedName: '',
          repairContent: '',
          imageUrl: '',
          repairer: '',
          phone: '',
          repairTime: '',
          type: ''
        }
      }
    },
    methods:{
      getDetail (id) {
        let par = {
          repairId: id
        }
        fixedRepairDetail(par).then(res => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.formItem = {
              id: result.id,
              fixedTypeName: result.fixedTypeName,
              fixedName: result.fixedName,
              repairContent: result.repairContent,
              imageUrl: result.imageUrl,
              repairer: result.repairer,
              phone: result.phone,
              repairTime: result.repairTime,
              type: result.type
            }
          } else {
            this.formItem = {
              id: this.$route.params.id,
              fixedTypeName: '',
              fixedName: '',
              repairContent: '',
              imageUrl: '',
              repairer: '',
              phone: '',
              repairTime: '',
              type: ''
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
