<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         房屋管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>租赁管理</span>
      </div>
    </Row>
    <div class="detailBody">
      <div  class="detailContentImage">
        <Row style="margin: 0 0 20px 20px">
          <Input v-model.trim="param.keyWord" class="head-search" placeholder="租客姓名" style="width:250px;float: left;margin-right: 20px" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"/>
          <Select v-model="param.state" class="head-search" style="width:150px;float: left;margin-right: 20px;text-align: left" placeholder="租赁状态" clearable @on-change="changeSelect">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <Select v-model="param.roomId" class="head-search" style="width:150px;float: left;margin-right: 20px;text-align: left" placeholder="租赁房间" clearable @on-change="changeSelect">
            <Option v-for="item in roomsList" :value="item.id" :key="item.id">{{ item.roomName }}</Option>
          </Select>
          <Button class="btn-save" style="float: right;margin-right: 20px" @click="add">创建租赁</Button>
        </Row>
        <Table stripe  :columns="columns" :data="dataTable" ></Table>
        <div style="text-align: center;margin-top: 10px">
          <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                ref="tablePage" show-elevator :transfer="true"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { _debounce } from "@/utils/public"
  import { leaseList, roomList, leaseStop } from '../../../api/api'
  export default {
    data () {
      return {
        roomsList: [],
        size: [10, 20, 30, 40, 50],
        total: 0,
        page: 1,
        rows: 10,
        columns: [
          {
            title: '序号',
            width: 100,
            align: 'center',
            render: (h, params) => {
              let type
              type = params.index + 1
              return h('div', type)
            }
          },
          {
            title: '租客姓名',
            key: 'tenantName',
            align: 'center'
          },
          {
            title: '租赁房间',
            key: 'roomName',
            align: 'center'
          },
          {
            title: '租赁状态',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              let status = params.row.state === '1' || params.row.state === 1 ? '生效中' : params.row.state === '2' || params.row.state === 2 ? '人工终止' : params.row.state === '3' || params.row.state === 3 ? '合同到期' : '-'
              return h('div', status)
            }
          },
          {
            title: '联系方式',
            key: 'tenantPhone',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'ios-image-outline',
                    size: 28
                  },
                  style: {
                    color: '#516BEB',
                    cursor: 'pointer',
                    marginRight: '8px',
                    display: params.row.state === '1' || params.row.state === 1 ? 'inline' : 'none'
                  },
                  on: {
                    click: () => {
                      // console.log(1245)
                      this.$router.push({name: 'house_lease_images', params: {id: this.$route.params.id, param: this.$route.params.param, leaseId: params.row.id}})
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    type: 'ios-create-outline',
                    size: 28
                  },
                  style: {
                    color: '#516BEB',
                    cursor: 'pointer',
                    marginRight: '8px',
                    display: params.row.state === '1' || params.row.state === 1 ? 'inline' : 'none'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'house_lease_create', params: {id: this.$route.params.id, param: this.$route.params.param, leaseId: params.row.id}})
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    type: 'ios-list-box-outline',
                    size: 24
                  },
                  style: {
                    color: '#516BEB',
                    cursor: 'pointer',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'house_lease_detail', params: {id: this.$route.params.id, param: this.$route.params.param, leaseId: params.row.id}})
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    type: 'ios-close-circle-outline',
                    size: 24
                  },
                  style: {
                    color: '#516BEB',
                    cursor: 'pointer',
                    display: params.row.state === '1' || params.row.state === 1 ? 'inline' : 'none'
                  },
                  on: {
                    click: () => {
                      this.handleRemoveHouse(params.row.id)
                    }
                  }
                })
              ])
            }
          }
        ],
        dataTable: [{
          id: 1
        }],
        isEmpty: true,
        param: {
          pageNum: 1,
          pageSize: 10,
          state: '',
          houseId: '',
          keyWord: ''
        },
        typeList: [
          {
            id: 1,
            name: '生效中'
          },
          {
            id: 2,
            name: '人工终止'
          },
          {
            id: 3,
            name: '合同到期'
          }
        ],
      }
    },
    methods: {
      handleRemoveHouse (id) {
        let thi = this
        thi.$Modal.confirm({
          title: '确认终止该租赁?',
          onOk: () => {
            let par = {
              id: id
            }
            leaseStop(par).then(res => {
              if (res.data.code === 1000) {
                thi.$Message.success('终止成功！')
                thi.getHouse(this.param)
              } else {
                thi.$Message.error(res.data.message)
              }
            })
          }
        })
      },
      add () {
        this.$router.push({name: 'house_lease_create', params: {id: this.$route.params.id, param: this.$route.params.param}})
      },
      back() {
        this.$router.push({name: 'house', params:{param: this.$route.params.param}})
      },
      changeSelect() {
        this.page = 1
        this.param.pageNum = 1
        this.getHouse(this.param)
      },
      keywordChange: _debounce(function () {
        this.page = 1
        this.param.pageNum = 1
        this.getHouse(this.param)
      }) ,
      backKeyword () {
        this.param.keyWord = ''
        this.page = 1
        this.param.pageNum = 1
        this.getHouse(this.param)
      },
      // 点击分页页码
      change (page) {
        this.page = page
        this.param.pageNum = this.page
        this.getHouse(this.param)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.param.pageSize = this.rows
        this.getHouse(this.param)
      },
      // 图片
      getHouse (par) {
        let vm = this
        leaseList(par).then((res) => {
          if (res.data.code === 1000) {
            vm.dataTable = res.data.content.list
            vm.total = res.data.content.total
            vm.rows = res.data.content.pageSize
            vm.page = res.data.content.pageNum
          } else {
            vm.dataTable = []
            vm.total = 0
            vm.rows = 10
            vm.page = 1
          }
          if (vm.$refs.tablePage !== undefined) {
            vm.$refs.tablePage.currentPage = vm.page
          }
        })
      }
    },
    created: function () {
      if (this.$route.params.id !== undefined) {
        this.param.houseId = this.$route.params.id
      }
      this.getHouse(this.param)
      let vm = this
      let para = {
        houseId: this.$route.params.id
      }
      roomList(para).then((res) => {
        if (res.data.code === 1000) {
          vm.roomsList = res.data.content
        } else {
          vm.roomsList = []
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/variable/variable.less';
</style>
