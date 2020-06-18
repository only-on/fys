<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         房屋管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>房间管理</span>
      </div>
    </Row>
    <div class="detailBody">
      <div  class="detailContentImage">
        <Row style="margin: 0 0 20px 0">
          <Button class="btn-save" style="float: right;margin-right: 20px" @click="add">创建房间</Button>
        </Row>
        <Table stripe  :columns="columns" :data="dataTable" ></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import { roomList, roomDel } from '../../../api/api'
  export default {
    data () {
      return {
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
            title: '房间名称',
            key: 'roomName',
            align: 'center'
          },
          {
            title: '房间面积/㎡',
            key: 'area',
            align: 'center'
          },
          {
            title: '房间类型',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              let status = params.row.type === '0' || params.row.type === 0 ? '重要房间' : params.row.type === '1' || params.row.type === 1 ? '普通房间' : '-'
              return h('div', status)
            }
          },
          {
            title: '是否租赁',
            key: 'lease',
            align: 'center',
            render: (h, params) => {
              let status = params.row.lease === '0' || params.row.lease === 0 ? '否' : params.row.lease === '1' || params.row.lease === 1 ? '是' : '-'
              return h('div', status)
            }
          },
          {
            title: '使用状态',
            key: 'useState',
            align: 'center',
            render: (h, params) => {
              let status = params.row.useState === '0' || params.row.useState === 0 ? '待出租' : params.row.useState === '1' || params.row.useState === 1 ? '出租中' : params.row.useState === '3' || params.row.useState === 3 ? '自用' : params.row.useState === '4' || params.row.useState === 4 ? '空置' : '-'
              return h('div', status)
            }
          },
          // {
          //   title: '管理',
          //   key: 'action',
          //   align: 'center',
          //   width: 100,
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'text',
          //           size: 'small'
          //         },
          //         style: {
          //           color: '#516BEB'
          //         },
          //         on: {
          //           click: () => {
          //             // this.checkDetail(params.row)
          //           }
          //         }
          //       }, '租赁管理')
          //     ])
          //   }
          // },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 200,
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
                      this.$router.push({name: 'house_room_create', params: {id: this.$route.params.id, param: this.$route.params.param, roomId: params.row.id}})
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
                      this.$router.push({name: 'house_room_detail', params: {id: this.$route.params.id, param: this.$route.params.param, roomId: params.row.id}})
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
          houseId: ''
        },
        typeList: [
          {
            id: 1,
            name: '结构图片'
          },
          {
            id: 2,
            name: '普通图片'
          }
        ],
      }
    },
    methods: {
      handleRemoveHouse (id) {
        let thi = this
        thi.$Modal.confirm({
          title: '确认删除该房间?',
          onOk: () => {
            let par = {
              roomId: id
            }
            roomDel(par).then(res => {
              if (res.data.code === 1000) {
                thi.$Message.success('删除成功！')
                thi.getHouse(this.param)
              } else {
                thi.$Message.error(res.data.message)
              }
            })
          }
        })
      },
      add () {
        this.$router.push({name: 'house_room_create', params: {id: this.$route.params.id, param: this.$route.params.param}})
      },
      back() {
        this.$router.push({name: 'house', params:{param: this.$route.params.param}})
      },
      // 图片
      getHouse (par) {
        let vm = this
        roomList(par).then((res) => {
          if (res.data.code === 1000) {
            vm.dataTable = res.data.content
          } else {
            vm.dataTable = []
          }
        })
      }
    },
    created: function () {
      if (this.$route.params.id !== undefined) {
        this.param.houseId = this.$route.params.id
      }
      this.getHouse(this.param)
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/variable/variable.less';
</style>
