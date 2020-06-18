<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         用户管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>用户详情</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">用户信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="真实姓名">
                {{formItem.realName}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="手机号码">
                {{formItem.phone}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="用户性别">
              {{formItem.sex === '0' ? '男' : '女'}}
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="用户角色">
              {{formItem.type === 2 ? '超级管理员' : formItem.type === 3 ? '运维管理员' : '普通用户' }}
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formItem: {
          id: '',
          realName: '',
          phone: '',
          type: '',
          sex: '0'
        },
        roleList: [
          {
            value: 2,
            label: '超级管理员'
          },
          {
            value: 3,
            label: '运维管理员'
          },
          {
            value: 4,
            label: '普通用户'
          }
        ]
      }
    },
    methods:{
      back () {
        if (this.formItem.id === '') {
          this.$router.push({name: 'user'})
        } else {
          this.$router.push({name: 'user', params:{param: this.$route.params.param}})
        }
      }
    },
    created:function () {
      if (this.$route.params.row !== undefined) {
        let row = this.$route.params.row
        this.formItem = {
          id: row.id,
          realName: row.realName,
          phone: row.phone,
          sex: row.sex + '',
          type: row.type
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/variable/variable.less';

</style>
