<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         资产分类管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>分类详情</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">分类信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="分类名称">
                {{formItem.typeName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="分类图片">
                <div class="box-image" >
                  <a :href= formItem.typeImage target="_blank">
                    <img :src=formItem.typeImage style="width: 100px;height: 100px" alt="上传照片">
                  </a>
                </div>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="分类描述">
                {{formItem.describ}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="分类参数">
                <span v-for="(item,index) in formItem.params" :key="index">
                  {{item.paramName}} <span v-show="index !== formItem.params.length-1">、</span>
                </span>
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { fixedTypeDetail } from '../../../api/api'
  export default {
    data () {
      return {
        formItem: {
          id: '',
          typeName: '',
          describ: '',
          typeImage: '',
          params: []
        }
      }
    },
    methods:{
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
              typeImage: result.url,
              params: result.params
            }
          } else {
            this.formItem = {
              id: this.$route.params.id,
              typeName: '',
              describ: '',
              typeImage: '',
              params: []
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
