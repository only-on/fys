<template>
  <div style="position: relative">
    <div id="mapBox"></div>
    <div class="titleBox">
      <div class="titleLeft">
        <img :src="weather.img" alt="">
        <span>{{weather.tmp}}° {{weather.statusText}}</span>
        <span>{{fullDate}}</span>
      </div>
      <div class="titleRight">
        <i class="iconfont icon-laba"></i>
        <span id="notifyBox">北京法源寺历史文化街区智慧运管平台隆重上线  </span>
      </div>
    </div>
    <div class="asideBox">
      <happy-scroll color="rgba(24,32,71,0.6)" hide-horizontal resize right size="5">
        <aside>
          <ul class="asideMenu">
            <div class="oneMenu topMenu" @click="controlAll">
              <Icon type="md-menu" size="26"/>
              <span style="width:200px">{{slideInfo.text}}</span>
              <Icon :type="slideInfo.iconType"/>
            </div>
            <div v-show="slideInfo.isOpen">
              <li v-for="(item,index) in menuList">
                <div class="oneMenu" v-if="item.subItems !== undefined" @click="showToggle(item,index)">
                  <span>{{item.name}}</span>
                  <Icon :type="item.iconType" style="float: right;line-height: 50px"/>
                </div>
                <div class="oneMenu" v-else @click="clickMenu($event,index,0,item.type)"  ref="oneMenu">{{item.name}}</div>
                <ul v-show="item.isSubShow">
                  <li v-for="(subItem,index) in item.subItems">
                    <div class="oneMenuChild" @click="clickMenu($event,index,1,subItem.type)"  ref="subItems">{{subItem.name}}</div>
                  </li>
                </ul>
              </li>
            </div>
          </ul>
        </aside>
      </happy-scroll>
    </div>
    <div class="statisticalBox">
      <!--[1,3,10]-->
      <div class="stasticItem" :style="menuType === 1 ? 'height: 190px' : 'height: 130px'" v-if="textArr.includes(menuType)">
        <div style="position: relative">
          <img src="../../assets/image/p_header.png" alt="">
         <span class="itemTitle">{{menuType === 1 ? '房屋总资产（3000套）' : menuType === 3 ? '灯杆总数' : '工单总数'}} </span>
        </div>
        <Row>
          <Col span="12" class="houseInfo">
          {{menuType === 1 ? '公有' : menuType === 3 ? '智能灯杆数' : '已处理工单数量'}}<br> <span>1900</span>
          </Col>
          <Col span="12" class="houseInfo">
          {{menuType === 1 ? '私有' : menuType === 3 ? '普通灯杆数' : '未处理工单数量'}}<br><span>1100</span>
          </Col>
        </Row>
        <Row v-if="menuType===1">
          <Col span="12" class="houseInfo">
          已出租<br><span>2600</span>
          </Col>
          <Col span="12" class="houseInfo">
          未出租<br><span>400</span>
          </Col>
        </Row>
      </div>
      <!--[1,10,17]-->
      <div class="stasticItem" v-if="lineArr.includes(menuType)">
        <div style="position: relative">
          <img src="../../assets/image/p_header.png" alt="">
          <span class="itemTitle"> {{menuType === 1 ? '房屋租赁趋势' : menuType === 10 ? '工单趋势': '商业房屋租赁趋势'}}</span>
        </div>
        <div id="lineBox"></div>
      </div>
      <!--[3,15]-->
      <div class="stasticItem" v-if="pieArr.includes(menuType)">
        <div style="position: relative">
          <img src="../../assets/image/p_header.png" alt="">
          <span class="itemTitle"> {{menuType === 3 ? '智能灯杆占比': '街区人口统计'}}</span>
        </div>
        <div id="pieBox"></div>
      </div>
      <!--[2,8,15,17]-->
      <div class="stasticItem" v-if="pie1Arr.includes(menuType)">
        <div style="position: relative">
          <img src="../../assets/image/p_header.png" alt="">
          <span class="itemTitle"> {{menuType === 2 ? '酒店营收占比' : menuType === 8 ? '各停车场营收占比':menuType === 15 ? '人口年龄占比统计' : '各类商业房屋占比'}}</span>
        </div>
        <div id="pieBox1"></div>
      </div>
      <!--先进技术-->
      <div class="stasticItem" v-if="menuType === 4">
        <div style="position: relative">
          <img src="../../assets/image/p_header.png" alt="">
          <span class="itemTitle"> 固定资产数据统计</span>
        </div>
        <div id="barBox"></div>
      </div>
      <!--[2,8,10]-->
      <div class="stasticItem" v-if="barArr.includes(menuType)">
        <div style="position: relative">
          <img src="../../assets/image/p_header.png" alt="">
          <span class="itemTitle">{{menuType === 2 ? '酒店客房数统计' : menuType === 8 ? '停车场车位统计' : '工单处理情况统计'}}</span>
        </div>
        <div id="barBox1"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { HappyScroll } from 'vue-happy-scroll'
  import infoBox from '@/utils/InfoBox.min.js'
  import styleJson from '@/utils/mapTyle.js'
  import testImg from '@/assets/image/test.jpg'
  import $ from 'jquery'
  export default {
    components: {
      HappyScroll
    },
    data () {
      return {
        textArr:[1,3,10],
        pieArr: [3,15],
        pie1Arr: [2,8,15,17],
        barArr: [2,8,10],
        lineArr: [1,10,17],
        menuType: '',
        map: null,
        weather: {
          tmp: '',
          statusText: '',
          img: ''
        },
        fullDate: '',
        slideInfo: {
          iconType: 'ios-arrow-up',
          text: '收起',
          isOpen: true
        },
        markImg: '',
        infoWindowArr: [],
        menuList: [
          {
            name: '首页',
            isSubShow:false,
            type: -1
          },
          {
            name: '智慧资产',
            isSubShow:false,
            iconType: 'ios-arrow-down',
            subItems: [
              {
                name: '智慧房屋',
                type: 1
              },
              {
                name: '智慧酒店',
                type: 2
              },
              {
                name: '智慧灯杆',
                type: 3
              },
              {
                name: '先进技术',
                type: 4
              },
              {
                name: '智慧管网',
                type: 5
              },
              {
                name: '老城更新',
                type: 6
              },
              {
                name: '平房修缮',
                type: 7
              }
            ]
          },
          {
            name: '智慧物业',
            isSubShow:false,
            iconType: 'ios-arrow-down',
            subItems: [
              {
                name: '智慧停车',
                type: 8
              },
              {
                name: '智慧安防',
                type: 9
              },
              {
                name: '便民服务',
                type: 10
              }
            ]
          },
          {
            name: '街区文化',
            isSubShow:false,
            iconType: 'ios-arrow-down',
            subItems: [
              {
                name: '会馆文化',
                type: 11
              },
              {
                name: '历史文化',
                type: 13
              },
              {
                name: '佛教文化',
                type: 14
              },
              {
                name: '街区人口',
                type: 15
              },
            ]
          },
          {
            name: '招商运营',
            isSubShow:false,
            iconType: 'ios-arrow-down',
            subItems: [
              {
                name: '广告招商',
                type: 16
              },
              {
                name: '商业房屋',
                type: 17
              }
            ]
          },
          {
            name: '社区营造',
            isSubShow:false,
            iconType: 'ios-arrow-down',
            subItems: [
              {
                name: '社区营造',
                type: 18
              },
              {
                name: '共享生活',
                type: 19
              }
            ]
          },
        ]
      }
    },
    methods: {
      // 天气
      getWeather () {
        let thi = this
        let weaParam = {
            location: 'beijing',
            key: '9c519bfba3e746e5abad49f5632652b7'
          }
        $.ajax({
          type:'get',
          url:'https://free-api.heweather.com/s6/weather/now',
          data: weaParam,
          success:function (res) {
            let result = res.HeWeather6[0].now
            thi.weather = {
              tmp: result.tmp,
              statusText: result.cond_txt
            }
            if (result.cond_code === '100') {
              thi.weather.img = require('../../assets/image/100.png')
            } else if (result.cond_code === '101') {
              thi.weather.img = require('../../assets/image/101.png')
            } else if (result.cond_code === '104') {
              thi.weather.img = require('../../assets/image/104.png')
            } else if (result.cond_code.charAt(0) === '2') {
              thi.weather.img = require('../../assets/image/200.png')
            } else if (result.cond_code.charAt(0) === '3') {
              thi.weather.img = require('../../assets/image/306.png')
            } else if (result.cond_code.charAt(0) === '4') {
              thi.weather.img = require('../../assets/image/401.png')
            } else if (result.cond_code.charAt(0) === '5') {
              thi.weather.img = require('../../assets/image/511.png')
            }
          }
        })
      },
      // 日期
      getDate () {
        let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        week = date.getDay()
        h = h < 10 ? '0'+ h : h
        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")
        this.fullDate = year + '年' + month + '月' + day + '日 ' + weeks[week] + ' ' +h + ":" + m + ':' + s
      },
      creatInterval () {
        let timer = setInterval(this.getDate, 1000)
        this.$once('hook:beforeDestroy', function() {
          clearInterval(timer)
        })
      },
      controlAll () {
        this.slideInfo.isOpen = !this.slideInfo.isOpen
        if (this.slideInfo.isOpen) {
          this.slideInfo.iconType = 'ios-arrow-up'
          this.slideInfo.text = '收起'
        } else {
          this.slideInfo.iconType = 'ios-arrow-down'
          this.slideInfo.text = '展开'
        }
      },
      // 点击展开折叠菜单事件
      showToggle:function(item,ind){
        this.menuList.forEach(i => {
          // 判断如果数据中的menuList[i]的show属性不等于当前数据的isSubShow属性那么menuList[i]等于false
          // if (i.isSubShow !== this.menuList[ind].isSubShow) {
          //   i.isSubShow = false;
          // }
        })
        item.isSubShow = !item.isSubShow
        if (item.iconType === 'ios-arrow-down') {
          item.iconType = 'ios-arrow-up'
        } else {
          item.iconType = 'ios-arrow-down'
        }
      },
      clickMenu (event,index, isMenu, type) {
        if (type === -1) {
          this.$router.push('/user')
        }
        this.remove()
        this.menuType = type
        if (this.lastInfoWindow) {
          // 判断上一个窗体是否存在，若存在则执行close
          this.lastInfoWindow.close()
        }
        if (type === 1) {
          // 智慧房屋
          this.markImg = require('../../assets/image/house.png')
          this.addOverlay(this.map,this.markImg)
          this.$nextTick(()=> {
            this.drawLine('lineBox')
          })
        } else if (type === 2) {
          // 智慧酒店
          this.markImg = require('../../assets/image/hotel.png')
          this.addOverlay(this.map,this.markImg)
          this.$nextTick(()=> {
            this.drawPie1('pieBox1',type)
            this.drawBar1('barBox1', type)
          })
        } else if (type === 3) {
          // 智慧灯杆
          this.markImg = require('../../assets/image/deng.png')
          this.addOverlay(this.map,this.markImg)
          this.$nextTick(()=> {
            this.drawPie('pieBox',type)
          })
        } else if (type === 4) {
          // 先进技术
          this.markImg = require('../../assets/image/user.png')
          this.addOverlay(this.map,this.markImg)
          this.$nextTick(()=> {
            this.drawBar('barBox')
          })
        } else if (type === 8) {
          // 智慧停车
          this.markImg = require('../../assets/image/stopCar.png')
          this.addOverlay(this.map,this.markImg)
          this.$nextTick(()=> {
            this.drawPie1('pieBox1',type)
            this.drawBar1('barBox1', type)
          })
        } else if (type === 10) {
          //便民服务
          this.addOverlay(this.map,this.markImg)
          this.$nextTick(()=> {
            this.drawLine('lineBox')
            this.drawBar1('barBox1', type)
          })
        } else if (type === 15) {
          // 街区人口
          this.$nextTick(()=> {
            this.drawPie('pieBox')
            this.drawPie1('pieBox1',type)
          })
        } else if (type === 17) {
          // 商业房屋
          this.addOverlay(this.map,this.markImg)
          this.$nextTick(()=> {
            this.drawLine('lineBox')
            this.drawBar('barBox')
            this.drawPie1('pieBox1',type)
          })
        } else {
          this.menuType = ''
        }
        if (isMenu === 0) {
          this.$refs.oneMenu.map((item,i) => {
            if (i !== index) {
              this.$refs.oneMenu[i].style.background = 'none'
            }
            this.$refs.subItems.map((item,i) => {
              this.$refs.subItems[i].style.background = 'none'
            })
          })
        } else {
          this.$refs.subItems.map((item,i) => {
            if (i !== index) {
              this.$refs.subItems[i].style.background = 'none'
            }
            this.$refs.oneMenu.map((item,i) => {
              this.$refs.oneMenu[i].style.background = 'none'
            })
          })
        }
        event.target.style.background = '#00caee'
      },
      // 添加标注
      addOverlay (map,img) {
        let thi = this
        let markArr = [
          {
            name: '法源寺房屋1',
            img: testImg,
            addressX: 116.370005,
            addressY: 39.890352
          },
          {
            name: '法源寺房屋2',
            img: testImg,
            addressX: 116.363573,
            addressY: 39.889870
          },
          {
            name: '法源寺房屋3',
            img: testImg,
            addressX: 116.370939,
            addressY: 39.885701
          },
          {
            name: '法源寺房屋4',
            img: testImg,
            addressX: 116.360303,
            addressY: 39.887445
          },
          {
            name: '法源寺房屋5',
            img: testImg,
            addressX: 116.361586,
            addressY: 39.882629
          },

          {
            name: '法源寺房屋6',
            img: testImg,
            addressX: 116.373742,
            addressY: 39.893314
          },
        ]
        for (let i = 0; i < markArr.length; i++) {
          let s = {
            img: markArr[i].img,
            name: markArr[i].name,
            point: new BMap.Point(markArr[i].addressX,markArr[i].addressY)
          }
          let marker
          let myIcon = new BMap.Icon(img, new BMap.Size(38,38),{anchor: new BMap.Size(14, 25), infoWindowAnchor: new BMap.Size(18, 5)});
          marker = new BMap.Marker(s.point,{icon:myIcon})
          // 创建点
          map.addOverlay(marker)
          let houseCon = ` <div style="position: relative">
            <div style='word-wrap:break-word;margin: 20px 0'>${s.name}</div>
            <img src="${s.img}" alt="" style="width: 100%;height:200px">
            <p style="color:#96d4e9;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:4;overflow: hidden;margin:10px 0">法源寺，位于北京市宣武门外教子胡同南端东侧，建于唐太宗贞观十九年（公元645年），是北京最古老的名刹。法源寺，唐时为悯忠寺，清雍正时重修并改为今名，1956年在寺内成立中国佛学院、1980年又于寺内建立中国佛教图书文物馆，是中国佛教协会所属的宗教类博物馆。法源寺，1983年被国务院确定汉族地区佛教中国重点寺院，2001年6月25日，法源寺作为清代古建筑，被国务院批准为第五批全国重点文物保护单位。</p>
            <img src="./static/image/line.png" alt="" style="width: 100%;height:40px;">
            <div style="text-align: center;margin-top: -30px;color:#02bfff;font-size:16px;cursor: pointer" id="checkMore">图片，视频更多
             <i class="iconfont icon-gengduo1"></i>
            </div>

            </div>`
          let bg = './static/image/popbg.png'
          let opts = {
            boxStyle: {
              width: '500px',
              height: '450px',
              background: `url(${bg}) no-repeat`,
              backgroundSize: '100% 100%',
              padding: '20px 30px',
              color: '#fff',
              fontSize: '14px'
            },
            enableAutoPan: true,
            align: 1,
            closeIconMargin: '20px',
            closeIconUrl: require('../../assets/image/close.png'),
            closeIconZIndex: 1,
            closeIconWidth: '15px'
          }
          let infoWindow =  new BMapLib.InfoBox(map, houseCon,opts)
          // 得到所有的信息窗体
          thi.infoWindowArr.push(infoWindow)
          marker.addEventListener('mouseover',function () {
            marker.setTop(true)
            if (thi.lastInfoWindow) {
              // 判断上一个窗体是否存在，若存在则执行close
              thi.lastInfoWindow.close()
            }
            thi.lastInfoWindow = infoWindow
            infoWindow.open(marker)
            $('#checkMore').click(()=>{
              console.log(111)
            })
          })
          marker.addEventListener('mouseout',function () {
            marker.setTop(false)
          })
          marker.addEventListener('click',function () {
            infoWindow.open(marker)
          })
        }
      },
      // 删除标注
      remove () {
        let allOverlay = this.map.getOverlays()
        for (let i = 0; i < allOverlay.length; i++) {
          if (allOverlay[i].toString() == "[object Marker]") {
            this.map.removeOverlay(allOverlay[i])
          }
        }
      },
      // 折线图
      drawLine (id) {
        if (document.getElementById(id) === null) {
          return false
        }
        let myChart = echarts.init(document.getElementById(id))
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            orient: 'horizontal',
            bottom: 10,
            textStyle: {
              color: '#fff'
            },
            data: ['公有', '私有']
          },
          grid: {
            left: '3%',
            right: '5%',
            top: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,//坐标轴两边留白
            data: ['1月','2月', '3月', '4月'],
            axisLabel: { //坐标轴刻度标签的相关设置。
              interval: 0,
              textStyle: {
                color: '#fff',
                fontSize: 12,
              }
            },
            axisTick:{//坐标轴刻度相关设置。
              show: false,
            },
            axisLine:{
              show: false
            },
            splitLine: {
              show: false
            }
          },
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: 12,
                }
              },
              axisLine:{
                show: false
              },
              axisTick:{
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '公有',
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  color:'#176dd2',
                  lineStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#0231fd' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#176dd2' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                    width:2
                  },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0,
                      color: 'rgba(12,58,156,0)'
                    }, {
                      offset: 1,
                      color: 'rgba(12,58,156,1)'
                    }]),
                  }
                }
              },
              data: [ 500, 1200, 700, 1000]
            },
            {
              name: '私有',
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  color:'#7f7341',
                  lineStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#d77d02' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#fde87f' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                    width:2
                  },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0,
                      color: 'rgba(107,98,59,0)'
                    }, {
                      offset: 1,
                      color: '#7f7341'
                    }]),
                  }
                }
              },
              data: [400,500,300,600]
            }
          ]
        }
        myChart.setOption(option,true)
      },
      // 饼状图 人口统计
      drawPie (id,type) {
        if (document.getElementById(id) === null) {
          return false
        }
        let myChart = echarts.init(document.getElementById(id))
        let option = {
          title: {
            text: '207345',
            left: 'center',
            top: 'center',
            padding: [24, 0],
            textStyle: {
              color: '#29f0f3',
              fontSize: 14,
              align: 'center'
            }
          },
          series: [
            {
              type: 'pie',
              radius: [40, 60],
              hoverAnimation: false,
              clockwise: false,
              labelLine: {
                normal: {
                  show: true,
                  length: 10,
                  length2: 20,
                  lineStyle: {
                    width: 2
                  }
                }
              },
              label: {
                normal: {
                  formatter: '{c|{c}}\n{hr|}\n{b|{b}}{d|{d}%}',
                  rich: {
                    b: {
                      fontSize: 14,
                      color: '#44afff',
                      align: 'left',
                      padding: 4
                    },
                    hr: {
                      borderColor: '#42559a',
                      width: '100%',
                      borderWidth: 2,
                      height: 0
                    },
                    d: {
                      fontSize: 20,
                      color: '#cce8fe',
                      align: 'left',
                      padding: 4
                    },
                    c: {
                      fontSize: 20,
                      color: '#cce8fe',
                      align: 'left',
                      padding: 4
                    }
                  }
                }
              },
              data: [
                {
                  value: 25,
                  name: type === 3 ? '普通灯杆' :'男性',
                  itemStyle: {
                    normal: {
                      color: '#004a71'
                    }
                  }
                },
                {
                  value: 75,
                  name: type === 3 ? '智能灯杆' :'女性',
                  itemStyle: {
                    normal: {
                      color: { // 完成的圆环的颜色
                        colorStops: [{
                          offset: 0,
                          color: '#bdf637' // 0% 处的颜色
                        }, {
                          offset: 1,
                          color: '#09d4f4' // 100% 处的颜色
                        }]
                      },
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      }
                    }
                  }
                }],
              roundCap:1//可选项为1和2，不填则采用原有拼接方式
            }
          ]
        }
        myChart.setOption(option,true)
      },
      // 人口年龄
      drawPie1 (id,type) {
        if (document.getElementById(id) === null) {
          return false
        }
        let myChart = echarts.init(document.getElementById(id))
        let colors = [
          [
            {
              offset: 0,
              color: "#f27428" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#f5a870" // 100% 处的颜色
            }
          ],
          [
            {
              offset: 0,
              color: "#f3a940" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#f7ce62" // 100% 处的颜色
            }
          ],
          [
            {
              offset: 0,
              color: "#174ba1" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#205eab" // 100% 处的颜色
            }
          ],
          [
            {
              offset: 0,
              color: "#74c3ee" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#abddf8" // 100% 处的颜色
            }
          ],
          [
            {
              offset: 0,
              color: "#229495" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#4cb0d2" // 100% 处的颜色
            }
          ],
        ]
        let data2 = [
          {
            name: "君和酒店",
            value: 8000
          },
          {
            name: "假日酒店",
            value: 6000
          },
          {
            name: "全季酒店",
            value: 3000
          },
          {
            name: "桔子酒店",
            value: 2000
          },
          {
            name: "汉庭酒店",
            value: 1000
          }
        ];
        let data8 = [
          {
            name: "停车场1",
            value: 8000
          },
          {
            name: "停车场2",
            value: 6000
          },
          {
            name: "停车场3",
            value: 3000
          }
        ];
        let data15 = [
          {
            name: "12岁以下",
            value: 8000
          },
          {
            name: "12~30岁",
            value: 6000
          },
          {
            name: "30~50岁",
            value: 3000
          },
          {
            name: "50~70岁",
            value: 2000
          },
          {
            name: "70岁以上",
            value: 1000
          }
        ];
        let data17 = [
          {
            name: "公私房",
            value: 8000
          },
          {
            name: "腾退房",
            value: 6000
          },
          {
            name: "共生院",
            value: 3000
          },
          {
            name: "人才公寓",
            value: 2000
          },
          {
            name: "商业经营房",
            value: 1000
          }
        ];
        let datas = type === 2 ? data2 : type === 8 ? data8 : type === 15 ? data15 : data17
        let seriesData = datas.map((item, index) => {
          return {
            value: item.value,
            name: item.name,
            itemStyle: {
              // borderWidth: 3,
              // borderColor: "#182037",
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: colors[index > 5 ? Math.floor(Math.random() * 5 + 1) : index],
                global: false // 缺省为 false
              }
            }
          };
        });
        let option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            type: "scroll",
            right: 50,
            top: "middle",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: "#A1B5EB"
            },
            data: datas && datas.filter(item => item.name + item.value)
          },
          series: [{
            name: "占比",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: seriesData
          }]
        }
        myChart.setOption(option,true)
      },
      drawBar (id) {
        if (document.getElementById(id) === null) {
          return false
        }
        let myChart = echarts.init(document.getElementById(id))
        let option = {
          grid: {
            left: '3%',
            right: '4%',
            top: '3%',
            bottom:'5%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['古树','消防栓','灭火器','路灯','垃圾桶','电网箱'],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#1a435f",
                width: 1,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              }
            },
          }],
          yAxis: [{
            type: 'value',
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }],
          series: [{
            type: 'bar',
            data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
            barWidth: 15, //柱子宽度
            //barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#1ee0fc'
                }, {
                  offset: 1,
                  color: '#11429e'
                }]),
                opacity: 1,
              }
            }
          }]
        }
        myChart.setOption(option,true)
      },
      drawBar1 (id, type) {
        if (document.getElementById(id) === null) {
          return false
        }
        let myChart = echarts.init(document.getElementById(id))
        let data = type === 2 ? ['君和酒店','桔子酒店','全季酒店','汉庭酒店'] : type === 8 ?  ['停车场1','停车场2','停车场3','停车场4'] : ['工单1']
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '3%',
            top:'3%',
            containLabel: true
          },
          legend: {
            left: 'center',
            top:3,
            textStyle: {
              color: "#fff"
            },
            itemWidth: 12,
            itemHeight: 10,
            // itemGap: 35
          },
          xAxis: {
            type: 'category',
            data: data,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#1a435f",
                width: 1,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              }
            }
          },

          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          series: [{
            name: type === 2 ? '剩余客房数' : type === 8 ? '剩余停车位': '待处理工单数',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#fccb05'
                }, {
                  offset: 1,
                  color: '#f5804d'
                }])
              },
            },
            data: [400, 400, 300, 300, 300]
          },
            {
              name: type === 2 ? '总客房数' : type === 8 ? '总停车位' : '工单总数',
              type: 'bar',
              barWidth: '12',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#248ff7'
                  }, {
                    offset: 1,
                    color: '#6851f1'
                  }])
                }
              },
              data: [400, 600, 700, 700, 1000]
            }]
        }
        myChart.setOption(option,true)
      },
      loadMap () {
        var map = new BMap.Map("mapBox",{enableMapClick:false});
        this.map = map
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 18);
        // 设置地图鼠标滚轮放大缩小
        map.enableScrollWheelZoom()
        // map.setMapStyle({styleJson: styleJson})
        map.setMapStyleV2({styleId: '4f8d40262fc345eaccf9c3470840ced7'})
        let pointArr = [
          new BMap.Point(116.380919,39.895417),
          new BMap.Point(116.357348,39.894615),
          new BMap.Point(116.357707,39.885009),
          new BMap.Point(116.381853,39.886089)
          // new BMap.Point(116.374122,39.892588),
          // new BMap.Point(116.374619,39.889798),
          // new BMap.Point(116.376361,39.889363),
          // new BMap.Point(116.380986,39.88629)
        ]
        var polygon = new BMap.Polygon(pointArr, {strokeColor:"#1b91ff", strokeWeight:3, strokeOpacity:0.8,fillColor: "#0000ff", fillOpacity:0.1});  //创建多边形
        map.addOverlay(polygon)
        map.setViewport(pointArr)
      },
      // 消息滚动
      notifyScroll () {
        var gundong = document.getElementById("notifyBox");
        var step = 2, scrollWidth = gundong.scrollWidth;
        let thi = this, count = 0
        let scorllTimer = setInterval(function () {
          // 数据量少不滚动时
          if (count === 0) {
            if (gundong.scrollLeft === 0) {
              for (let j = 0; j < 8; j++) {
                gundong.innerHTML += gundong.innerHTML
              }
            }
          }
          gundong.scrollLeft += step;
          if (gundong.scrollLeft >= scrollWidth) {
            gundong.scrollLeft = 0
          }
          count ++
        }, 60);
        this.$once('hook:beforeDestroy', function() {
          clearInterval(scorllTimer)
        })
      },
    },
    mounted:function () {
      // 地图加载
      this.loadMap()
      // 天气
      this.getWeather()
      // 时间定时器
      this.creatInterval()
      this.notifyScroll()
      // 图表
      this.drawLine('lineBox')
      this.drawPie1('pieBox1')
    },
    created:function () {
    }
  }
</script>

<style lang="scss" scoped>
  $menuBackColor:rgba(14,18,55,0.8);
  $menuListH2:#8fbfef;
  $borderColor: rgba(26,137,244,0.5);
  $titleColor: #fff;
  $valColor: #46e1ff;
  #mapBox{
    width: 100vw;
    height: 100vh;
    background: #111b44 !important;
  }
  .titleBox{
    width: 100%;
    height: 65px;
    position: fixed;
    top:0;
    left: 0;
    z-index: 99;
    background: url("../../assets/image/header.png") no-repeat;
    background-size:  cover;
    display: flex;
    justify-content: space-between;
    .titleLeft{
      height: 100%;
      padding: 0 20px;
      display: flex;
      align-items: center;
      img{
        width: 40px;
        height: 40px;
        margin-right: 15px;
      }
      span:first-of-type{
        font-size: 20px;
        color: $titleColor;
        margin-right: 15px;
      }
      span:nth-of-type(2){
        font-size: 16px;
        color: #196bce;
      }
    }
    .titleRight{
      height: 100%;
      padding: 0 20px;
      display: flex;
      align-items: center;
      i{
        color: #eb640a;
        font-size: 20px;
        margin-right: 10px;
      }
      #notifyBox{
        overflow: hidden;
        white-space: nowrap;
        width: 400px;
        text-align: left;
      }
      span{
        color: $titleColor;
        font-size: 14px;
      }
    }
  }
  ul li {
    list-style: none;
  }
  .asideBox{
    position: absolute;
    left:0;top:150px;
    width: 300px;
    aside{
      background: $menuBackColor;
      user-select: none;
      .asideMenu{
        .topMenu {
          border-bottom: 1px solid #7e8095;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .oneMenu{
          height: 50px;
          padding: 0 20px;
          line-height: 50px;
          font-size: 16px;
          text-align: left;
          color: #fff;
          cursor: pointer;
        }
        .oneMenuChild{
          cursor: pointer;
          padding: 0 40px;
          height: 40px;
          line-height: 40px;
          text-align: left;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
  .statisticalBox{
    position: absolute;
    right:20px;top:150px;
    width: 20%;
    height: 80%;
    .stasticItem{
      width: 100%;
      height: 32%;
      margin-bottom: 5%;
      background: $menuBackColor;
      img{
        width: 100%;
        height: 35px;
      }
      .itemTitle{
        background: linear-gradient(to right, #237ddd 30%, #46e1ff);
        -webkit-background-clip: text;
        color: transparent;
        position: absolute;
        left: 0;
        right: 0;
        top:5px;
        bottom:0;
        margin: auto;
        font-size: 16px;
      }
      .houseInfo{
        color: #fff;
        padding: 10px;
        span{
          color: $valColor;
          font-size: 20px;
        }
      }
    }
  }
  #lineBox,#pieBox,#pieBox1,#barBox,#barBox1{
    width: 100%;
    height: 85%;
  }
</style>
