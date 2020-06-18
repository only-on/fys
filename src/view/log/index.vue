<template>
  <div class="body">
    <div class="content">
      <Row style="margin-bottom: 20px">
        <Input v-model="paramnter.keyword" class="head-search" placeholder="操作内容" style="width:250px;float: left;margin-right: 20px" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"/>
        <DatePicker class="head-search" type="datetimerange"  placeholder="操作时间" style="float: left;width: 300px;margin-right: 20px" @on-change="timeChange" :editable="false" ></DatePicker>
        <Select v-model="paramnter.type" class="head-search" style="width:200px;float: left;margin-right: 20px;text-align: left" placeholder="操作端" clearable @on-change="changeSelect">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
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
  import { logList } from '../../api/api'
  export default {
    data () {
      return {
        typeList: [
          {
            label: 'web端',
            value: 0
          },
          {
            label: '小程序',
            value: 1
          },
          {
            label: 'APP',
            value: 2
          }
        ],
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        paramnter: {
          keyword: '',
          pageNum: 1,
          pageSize: 10,
          type: ''
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
            title: '操作内容',
            key: 'title',
            align: 'center'
          },
          {
            title: '操作用户',
            key: 'operName',
            align: 'center'
          },
          {
            title: '操作结果',
            key: 'errorMsg',
            align: 'center'
          },
          {
            title: '操作时间',
            key: 'operTime',
            align: 'center'
          },
          {
            title: '操作端',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              let status = params.row.type === '0' || params.row.type === 0 ? 'web端' : params.row.post === '1' || params.row.post === 1 ? '小程序' : 'APP'
              return h('div', status)
            }
          }
        ],
        dataTable: [],
      }
    },
    methods: {
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
        logList(param).then((res) => {
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

<style lang="less" scoped>
</style>
