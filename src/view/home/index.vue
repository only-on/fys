<template>
  <div class="body">
    <div class="content">
      <Row style="margin-bottom: 20px">
        <Input v-model="paramnter.houseName" class="head-search" placeholder="房屋名称" style="width:250px;float: left;margin-right: 20px" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"/>
        <Select v-model="paramnter.type" class="head-search" style="width:150px;float: left;margin-right: 20px;text-align: left" placeholder="房屋类型" clearable @on-change="changeSelect">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="paramnter.lease" class="head-search" style="width:150px;float: left;margin-right: 20px;text-align: left" placeholder="是否租赁" clearable @on-change="changeSelect">
          <Option v-for="item in typeList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="paramnter.form" class="head-search" style="width:150px;float: left;margin-right: 20px;text-align: left" placeholder="房屋类别" clearable @on-change="changeSelect">
          <Option v-for="item in typeList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="paramnter.useState" class="head-search" style="width:150px;float: left;margin-right: 20px;text-align: left" placeholder="使用状态" clearable @on-change="changeSelect">
          <Option v-for="item in typeList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button class="btn-save" style="float: right" @click="add">创建房屋</Button>
      </Row>
      <Table stripe  :columns="columns" :data="dataTable" ></Table>
      <div class="pages-block">
        <div class="pages-right">
          <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                ref="tablePage" show-elevator :transfer="true"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { _debounce } from "@/utils/public"
  import { homeList, homeDel } from '../../api/api'
  export default {
    data () {
      return {
        typeList: [
          {
            label: '重要房屋',
            value: 0
          },
          {
            label: '普通房屋',
            value: 1
          }
        ],
        typeList2: [
          {
            label: '否',
            value: 0
          },
          {
            label: '全部出租',
            value: 1
          },
          {
            label: '部分出租',
            value: 2
          }
        ],
        typeList3: [
          {
            label: '公有',
            value: 1
          },
          {
            label: '私有',
            value: 2
          },
          {
            label: '代管',
            value: 3
          }
        ],
        typeList4: [
          {
            label: '待出租',
            value: 0
          },
          {
            label: '部分出租中',
            value: 1
          },
          {
            label: '全部出租中',
            value: 2
          },
          {
            label: '自用',
            value: 3
          },
          {
            label: '空闲',
            value: 4
          }
        ],
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        paramnter: {
          houseName: '',
          pageNum: 1,
          pageSize: 10,
          type: '',
          lease: '',
          form: '',
          useState: ''
        },
        columns: [
          {
            title: '序号',
            width: 100,
            align: 'center',
            render: (h, params) => {
              let type
              if (this.paramnter.pageNum > 1) {
                type = (this.page - 1) * this.rows + params.index + 1
              } else {
                type = params.index + 1
              }
              return h('div', type)
            }
          },
          {
            title: '房屋名称',
            key: 'houseName',
            align: 'center'
          },
          {
            title: '房屋类型',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              let status = params.row.type === '0' || params.row.type === 0 ? '重要房屋' : params.row.type === '1' || params.row.type === 1 ? '普通房屋' : '-'
              return h('div', status)
            }
          },
          {
            title: '是否租赁',
            key: 'lease',
            align: 'center',
            render: (h, params) => {
              let status = params.row.lease === '0' || params.row.lease === 0 ? '否' : params.row.lease === '1' || params.row.lease === 1 ? '全部出租' : params.row.lease === '2' || params.row.lease === 2 ? '部分出租' : '-'
              return h('div', status)
            }
          },
          // {
          //   title: '产权所有人',
          //   key: 'operTime',
          //   align: 'center'
          // },
          {
            title: '房屋类别',
            key: 'form',
            align: 'center',
            render: (h, params) => {
              let status = params.row.form === '1' || params.row.form === 1 ? '公有' : params.row.form === '2' || params.row.form === 2 ? '私有' : params.row.form === '3' || params.row.form === 3 ? '代管' : '-'
              return h('div', status)
            },
          },
          {
            title: '使用状态',
            key: 'useState',
            align: 'center',
            render: (h, params) => {
              let status = params.row.useState === '0' || params.row.useState === 0 ? '待出租' : params.row.useState === '1' || params.row.useState === 1 ? '部分出租中' : params.row.useState === '2' || params.row.useState === 2 ? '全部出租中' : params.row.useState === '3' || params.row.useState === 3 ? '自用' : '空闲'
              return h('div', status)
            }
          },
          {
            title: '管理',
            key: 'action',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#516BEB',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'house_room', params:{id: params.row.id, param: this.paramnter}})
                    }
                  }
                }, '房间管理'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#516BEB',
                    display: params.row.lease !== 0 ? 'inline' : 'none'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'house_lease', params:{id: params.row.id, param: this.paramnter}})
                    }
                  }
                }, '租赁管理')
              ])
            }
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
                    type: 'ios-videocam-outline',
                    size: 28
                  },
                  style: {
                    color: '#516BEB',
                    cursor: 'pointer',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      // this.edit(params.row.id)
                      this.$router.push({name: 'house_video', params:{id: params.row.id, param: this.paramnter}})
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    type: 'ios-image-outline',
                    size: 28
                  },
                  style: {
                    color: '#516BEB',
                    cursor: 'pointer',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      // console.log(1245)
                      this.$router.push({name: 'house_images', params:{id: params.row.id, param: this.paramnter}})
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
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row.id)
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
                      this.check(params.row.id)
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    type: 'ios-trash-outline',
                    size: 24
                  },
                  style: {
                    color: '#516BEB',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id)
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
      }
    },
    methods: {
      add () {
        this.$router.push({name: 'house_create'})
      },
      edit (id) {
        this.$router.push({name: 'house_create', params:{id:id, param: this.paramnter}})
      },
      check (id) {
        this.$router.push({name: 'house_detail', params:{id:id, param: this.paramnter}})
      },
      remove (id) {
        let thi = this
        thi.$Modal.confirm({
          title: '确认删除该房屋信息?',
          onOk: () => {
            let par = {
              houseId: id
            }
            homeDel(par).then(res => {
              if (res.data.code === 1000) {
                thi.$Message.success('删除成功！')
                thi.getTableDatas(thi.paramnter)
              } else {
                thi.$Message.error(res.data.message)
              }
            })
          }
        })
      },
      changeSelect () {
        this.paramnter.pageNum = 1
        this.page = 1
        var thi = this
        thi.getTableDatas(thi.paramnter)
      },
      timeChange (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter.startTime = change[0]
          this.paramnter.endTime = change[1]
        } else {
          this.paramnter.startTime = undefined
          this.paramnter.endTime = undefined
        }
        this.paramnter.pageNum = 1
        this.page = 1
        var thi = this
        thi.getTableDatas(thi.paramnter)
      },
      keywordChange: _debounce(function () {
        this.paramnter.houseName = this.paramnter.houseName.trim()
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      }) ,
      backKeyword () {
        this.paramnter.houseName = ''
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      },
      // 点击分页页码
      change (page) {
        this.page = page
        this.paramnter.pageNum = this.page
        this.getTableDatas(this.paramnter)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.paramnter.pageSize = this.rows
        this.getTableDatas(this.paramnter)
      },
      getTableDatas (param) {
        homeList(param).then((res) => {
          if (res.data.code === 1000) {
            this.dataTable = res.data.content.list
            this.total = res.data.content.total
            this.rows = res.data.content.pageSize
            this.page = res.data.content.pageNum
          } else {
            this.dataTable = []
            this.total = 0
            this.rows = 10
            this.page = 1
          }
          if (this.$refs.tablePage !== undefined) {
            this.$refs.tablePage.currentPage = this.page
          }
        })
      }
    },
    created:function () {
      if (this.$route.params.param !== undefined) {
        this.paramnter = this.$route.params.param
      }
      this.getTableDatas(this.paramnter)
    }
  }
</script>

<!--<style lang="less" scoped>-->
<!--</style>-->
