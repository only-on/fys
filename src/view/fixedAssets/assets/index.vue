<template>
  <div class="body">
    <div class="content">
      <Row style="margin-bottom: 20px">
        <Input v-model="paramnter.keyword" placeholder="资产名称" class="head-search" style="width:250px;float: left;margin-right: 20px" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"/>
        <Select v-model="paramnter.typeId" style="width:200px;float: left;margin-right: 20px" placeholder="资产分类" class="head-search" clearable @on-change="changeSelect">
          <Option v-for="item in typeList" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
        </Select>
        <Select v-model="paramnter.status" style="width:200px;float: left;margin-right: 20px" placeholder="资产状态" class="head-search"  clearable @on-change="changeSelect">
          <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button class="btn-save" style="float: right" @click="add">创建资产</Button>
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
  import { fixedAssetList, fixedTypePull, fixedAssetDel } from '../../../api/api'
  export default {
    data () {
      return {
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        paramnter: {
          pageNum: 1,
          pageSize: 10,
          keyword: '',
          typeId: ''
        },
        typeList: [],
        statusList: [
          {
            value: 1,
            label: '正常使用'
          },
          {
            value: 2,
            label: '维修中'
          },
          {
            value: 3,
            label: '淘汰未用'
          }
        ],
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
            title: '资产名称',
            key: 'fixedAssetsName',
            align: 'center'
          },
          {
            title: '分类名称',
            key: 'typeName',
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              for (let i = 0; i < this.statusList.length; i++) {
                if (params.row.status === this.statusList[i].value) {
                  return h('div', this.statusList[i].label)
                }
              }
            }
          },
          {
            title: '位置',
            key: 'position',
            align: 'center'
          },
          {
            title: '所属单位',
            key: 'belongUnit',
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
                      this.$router.push({name: 'assets_create', params: {param: this.paramnter, id: params.row.id}})
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
                      this.$router.push({name: 'assets_detail', params: {param: this.paramnter, id: params.row.id}})
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
      add () {
        this.$router.push({name: 'assets_create'})
      },
      delItem (id) {
        let thi = this
        thi.$Modal.confirm({
          title: '确认删除该资产?',
          onOk: () => {
            let par = {
              fiexdAssetsId: id
            }
            fixedAssetDel(par).then(res => {
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
        fixedAssetList(param).then((res) => {
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
      // 资产分类下拉
      this.getTypeList()
      this.getTableDatas(this.paramnter)
    }
  }
</script>

<style lang="less" scoped>
</style>
