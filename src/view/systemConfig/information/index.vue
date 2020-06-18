<template>
  <div class="body">
    <div class="content">
      <Row style="margin-bottom: 20px">

        <RadioGroup v-model="paramnter.isPost" style="float: left;padding-top: 5px" @on-change="changeSelect">
          <Radio label="" style="margin-right: 20px">全部资讯</Radio>
          <Radio label="0" style="margin-right: 20px">未发布</Radio>
          <Radio label="1" style="margin-right: 20px">已发布</Radio>
        </RadioGroup>
        <Input v-model="paramnter.keyword" class="head-search" placeholder="资讯标题" style="width:250px;float: left;margin-right: 20px" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"/>

        <Button class="btn-save" style="float: right" @click="add">创建资讯</Button>
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
  import { informationList, delInformation } from '../../../api/api'
  export default {
    data () {
      return {
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        paramnter: {
          keyword: '',
          pageNum: 1,
          pageSize: 10,
          isPost: ''
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
            title: '资讯标题',
            key: 'title',
            align: 'center'
          },
          {
            title: '作者/来源',
            key: 'source',
            align: 'center'
          },
          {
            title: '资讯类型',
            key: 'contentType',
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.contentType === 0 ? '推送链接' : '富文本信息')
            }
          },
          {
            title: '浏览数',
            key: 'viewCount',
            align: 'center'
          },
          {
            title: '资讯状态',
            key: 'isPost',
            align: 'center',
            render: (h, params) => {
              let status = params.row.post === 'false' || params.row.post === false ? '未发布' : params.row.post === 'true' || params.row.post === true ? '已发布' : '-'
              return h('div', status)
            }
          },
          {
            title: '操作',
            key: 'action',
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
        dataTable: [],
      }
    },
    methods: {
      add () {
        this.$router.push({name: 'information_create'})
      },
      edit (id) {
        this.$router.push({name: 'information_create', params:{id:id, param: this.paramnter}})
      },
      check (id) {
        this.$router.push({name: 'information_detail', params:{id:id, param: this.paramnter}})
      },
      remove (id) {
        let thi = this
        thi.$Modal.confirm({
          title: '确认删除该资讯?',
          onOk: () => {
            let par = {
              id: id
            }
            delInformation(par).then(res => {
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
        informationList(param).then((res) => {
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
