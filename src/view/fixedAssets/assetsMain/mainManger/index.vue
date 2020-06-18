<template>
  <div class="body">
    <div class="content">
      <Row style="margin-bottom: 20px">
        <Input v-model="paramnter.keyword" placeholder="维护人、手机号码" class="head-search" style="width:250px;float: left;margin-right: 20px" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"/>

        <Select v-model="paramnter.fixedType" style="width:200px;float: left;margin-right: 20px" placeholder="资产分类" class="head-search" clearable @on-change="changeType">
          <Option v-for="item in typeList" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
        </Select>
        <Select v-model="paramnter.fixedId" style="width:200px;float: left;margin-right: 20px" placeholder="固定资产" class="head-search" clearable @on-change="changeSelect">
          <Option v-for="item in fixedList" :value="item.fixedId" :key="item.fixedId">{{ item.fixedName }}</Option>
        </Select>
        <Select v-model="paramnter.type" style="width:200px;float: left;margin-right: 20px" placeholder="维护类型" class="head-search" clearable @on-change="changeSelect">
          <Option value="2">维护保养</Option>
          <Option value="1">损坏维修</Option>
        </Select>
        <DatePicker type="datetimerange" placeholder="维护时间" style="float: left;width: 300px;" :editable="false" @on-change="changeDate"></DatePicker>
        <Button class="btn-save" style="float: right" @click="add">创建维护记录</Button>
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
  import { fixedRepairList, fixedTypePull, fixedPull,fixedRepairDel } from '../../../../api/api'
  export default {
    data () {
      return {
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        typeList: [],
        fixedList: [],
        paramnter: {
          pageNum: 1,
          pageSize: 10,
          keyword: '',
          fixedType: '',
          fixedId: '',
          startTime: '',
          endTime: ''
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
            title: '分类名称',
            key: 'fixedTypeName',
            align: 'center'
          },
          {
            title: '资产名称',
            key: 'fiexedName',
            align: 'center'
          },
          {
            title: '维护类型',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.type === 1 ? '损坏维修' : '维护保养')
            }
          },
          {
            title: '维护人',
            key: 'repairer',
            align: 'center'
          },
          {
            title: '手机号码',
            key: 'phone',
            align: 'center'
          },
          {
            title: '维护时间',
            key: 'repairTime',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            width: 260,
            render: (h, params) => {
              return h('div', [
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
                      this.$router.push({name: 'record_create', params: {param: this.paramnter, id: params.row.id}})
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
                      this.$router.push({name: 'record_detail', params: {param: this.paramnter, id: params.row.id}})
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
                    cursor: 'pointer',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.delItem(params.row.id)
                    }
                  }
                })
              ])
            }
          }
        ],
        dataTable: [],
      }
    },
    methods: {
      // 资产分类下拉
      getTypeList () {
        fixedTypePull().then(res => {
          if (res.data.code === 1000) {
            this.typeList = res.data.content
          } else {
            this.typeList = []
          }
        })
      },
      changeType (change) {
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
        this.getFixed(change)
      },
      // 资产下拉
      getFixed (id) {
        let par = {
          typeId: id
        }
        fixedPull(par).then(res => {
          if (res.data.code === 1000) {
            this.fixedList = res.data.content
          } else {
            this.fixedList = []
          }
        })
      },
      add () {
        this.$router.push({name: 'record_create'})
      },
      delItem (id) {
        let thi = this
        thi.$Modal.confirm({
          title: '确认删除该资产维护记录?',
          onOk: () => {
            let par = {
              repairId: id
            }
            fixedRepairDel(par).then(res => {
              if (res.data.code === 1000) {
                thi.$Message.success('删除成功！')
                thi.getTableDatas(thi.paramnter)
              } else {
                thi.$Message.error(res.data.message)
              }
            })
          }
        });
      },
      changeDate (change) {
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
        this.paramnter.keyword = this.paramnter.keyword.trim()
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      }) ,
      backKeyword () {
        this.paramnter.keyword = ''
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      },
      changeSelect () {
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
        fixedRepairList(param).then((res) => {
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
      this.isManager = sessionStorage.getItem('roleType') === '4' ? false : true
      if (!this.isManager) {
        this.columns.splice(this.columns.length - 1, 1)
      }
      if (this.$route.params.param !== undefined) {
        this.paramnter = this.$route.params.param
      }
      // 资产分类下拉
      this.getTypeList()
      // 资产下拉
      this.getFixed()
      this.getTableDatas(this.paramnter)
    }
  }
</script>

<style lang="less" scoped>
</style>
