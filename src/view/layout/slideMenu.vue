<template>
  <div>
    <div class="header">
      <div class="login_title">北京法源寺历史文化街区智慧运营平台</div>
      <div class="userInfo">
        <span>{{userName}}</span>
        <div style="position: relative;display: inline-block;">
          <Icon type="md-contact" size="30" style="margin-right: 10px;line-height: 60px"/>
          <div class="userSlider">
           <div @click="goMap">
             <i class="iconfont icon-ditu"></i>
             <span>地图</span>
           </div>
            <div @click="logOut">
              <i class="iconfont icon-tuichu"></i>
              <span>退出</span>
            </div>
            <Icon type="md-arrow-dropup" size="25" style="position: absolute;top:-15px;right:15px;color: #fff"/>
          </div>
        </div>
      </div>
    </div>
      <nav class="slider">
        <happy-scroll color="rgba(5,15,58,1)" hide-horizontal resize right size="5">
          <Menu :active-name="activeName"  width="180" @on-select="clickMenuItems">
          <MenuItem  name="map">
            <Icon type="ios-home-outline" size="25"/>
            <span class="menuText">首页</span>
          </MenuItem>
          <Submenu name="assetsCategory">
            <template slot="title">
              <i class="iconfont icon-ziyuan"  style="font-size: 20px"></i>
              智慧资产
            </template>
            <MenuItem name="house">智慧房屋</MenuItem>
            <MenuItem name="assetsCategory">固定资产分类</MenuItem>
            <MenuItem name="assets">固定资产登记</MenuItem>
            <MenuItem name="dev">四合院修缮</MenuItem>
            <MenuItem name="dev">智慧酒店</MenuItem>
            <MenuItem name="dev">智慧管网</MenuItem>
            <MenuItem name="dev">公共设施</MenuItem>
          </Submenu>
          <Submenu name="assets_Main">
            <template slot="title">
              <i class="iconfont icon-wuyeguanli"></i>
              智慧物业
            </template>
            <MenuItem name="assets_Main">固定资产管维</MenuItem>
            <MenuItem name="dev">智慧停车</MenuItem>
            <MenuItem name="dev">智慧安防</MenuItem>
            <MenuItem name="dev">便民服务</MenuItem>
            <MenuItem name="dev">文化生活服务</MenuItem>
            <MenuItem name="dev">定制服务</MenuItem>
            <MenuItem name="dev">灯杆信息管理</MenuItem>
            <MenuItem name="dev">人员定位</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <i class="iconfont icon-wenhua" style="font-size: 26px"></i>
              街区文化
            </template>
            <MenuItem name="dev">会馆文化</MenuItem>
            <MenuItem name="dev">历史文化</MenuItem>
            <MenuItem name="dev">佛教文化</MenuItem>
            <MenuItem name="dev">街区人口</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <i class="iconfont icon-huabanfuben"></i>
              招商运营
            </template>
            <MenuItem name="dev">广告招商</MenuItem>
            <MenuItem name="dev">商业房屋</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <i class="iconfont icon-shequ-active"></i>
              社区营造
            </template>
            <MenuItem name="dev">社区营造</MenuItem>
            <MenuItem name="dev">共享生活</MenuItem>
          </Submenu>
            <Submenu name="5">
              <template slot="title">
                <i class="iconfont icon-zhishikuguanli"></i>
                运管知识库
              </template>
              <MenuItem name="dev">运管类别</MenuItem>
              <MenuItem name="dev">运管知识库</MenuItem>
            </Submenu>
            <Submenu name="information">
              <template slot="title">
                <i class="iconfont icon-xitongpeizhi" style="font-size: 26px"></i>
                系统配置
              </template>
              <MenuItem name="information">资讯管理</MenuItem>
              <MenuItem name="warn">预警管理</MenuItem>
              <MenuItem name="dev">摄像头接入</MenuItem>
            </Submenu>
          <MenuItem  name="user">
            <i class="iconfont icon-yonghu" style="font-size: 22px"></i>
            <span class="menuText">用户管理</span>
          </MenuItem>
          <MenuItem  name="log">
            <Icon type="ios-list-box-outline" size="25"/>
            <span class="menuText">操作日志</span>
          </MenuItem>
        </Menu>
        </happy-scroll>
      </nav>
  </div>
</template>

<script>
  import { HappyScroll } from 'vue-happy-scroll'
  import { userLogout } from '../../api/api'
    export default {
      components: {
        HappyScroll
      },
       data () {
         return {
           activeName: '',
           userName: ''
         }
       },
      methods: {
        clickMenuItems (key) {
          key = key.indexOf('/') === 0 ? key : '/' + key
          this.$router.push({ path: key })
        },
        goMap () {
          this.$router.push('map')
        },
        logOut () {
          userLogout().then(res => {
            if (res.data.code === 1000) {
              sessionStorage.removeItem('token')
              // sessionStorage.removeItem('role')
              sessionStorage.removeItem('user')
              this.$router.push({ path: '/' })
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
      created:function () {
        this.activeName = this.$route.name
        this.userName = sessionStorage.getItem('user') !== null ? JSON.parse(sessionStorage.getItem('user')) : ''
      }
    }
</script>

<style lang="less" scoped >
  @import "../../assets/styles/variable/variable.less";
  .iconfont{
    font-size: 24px;
  }
  .header{
    height: 60px;
    background:@layout-header-background;
    color: #fff;
    padding: 0 40px;
  }
  .login-img{
    vertical-align: middle;
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: 15px;
    float: left;
  }
  .login_title {
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
    font-size: 18px;
    line-height: 60px;
    float: left;
  }
  .header>div:last-child{
    float: right;
    font-size: 14px;
    line-height: 60px;
    cursor: pointer;
  }
  .slider{
    width: 180px;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    background: @layout-background;
    overflow: auto;
  }
  .userSlider{
    width:120px;
    height: 80px;
    padding: 0 30px;
    position: absolute;
    left:-75px;
    top:60px;
    z-index: 99;
    color: #666;
    background: #fff;
    box-shadow:0px 2px 17px 0px rgba(190,190,190,0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    transition: all .1s;
    visibility: hidden;
  }
  .userSlider div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 30px;
  }
  .userInfo{
    display: flex;
    align-items: center;
  }
  .userInfo>span{
    margin-right: 5px;
  }
  .userInfo:hover .userSlider{
    visibility: visible;
  }
  .menuText{
    font-size: 14px;
  }
  //滚动条
  /deep/.happy-scroll-content{
    border-right: none !important;
  }
</style>
