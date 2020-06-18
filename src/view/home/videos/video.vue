<template>
    <div>
      <Row type="flex" justify="start" class="titleBar">
        <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
        <div style="margin:10px 30px">
       <span>
         房屋管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
          <span>房屋视频播放</span>
        </div>
      </Row>
      <div class="detailBody">
        <div class="detailContentImage" style="width: 700px;height: 440px">

          <div >
            <video-player  class="video-player vjs-custom-skin"
                           ref="videoPlayer"
                           :playsinline="true"
                           :options="playerOptions"
                           @play="onPlayerPlay($event)"
                           @pause="onPlayerPause($event)"
            >
            </video-player>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player';
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
        }],
        poster: "../../../assets/image/video.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        // height: 100,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      url: ''
    }
  },
  methods: {
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player){
      // alert("pause");
    },
    back () {
      this.$router.push({name: 'house_video', params: {id: this.$route.params.id, param: this.$route.params.param, video: this.$route.params.video}})
    }
  },
  created: function () {
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  mounted () {
    this.$nextTick(function () {
      // console.log(this.$route.params.video)
      this.playerOptions.sources[0].src = this.$route.params.video.videoId.url
    })
  }
}
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/variable/variable.less';
</style>
