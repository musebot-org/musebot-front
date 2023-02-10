<script setup lang="ts">
const route = useRoute()
const value = ref('')

watch(
  () => route.name,
  (v) => {
    if (v === 'started') {
      visible.value = true
    }
  }
)
const visible = ref(true)

const showVideo = ref(false)

let player: any = {}
let videoReady = ref(false)
const onShowVideo = async () => {
  showVideo.value = true
  await nextTick()
  if (videoReady.value) return
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script')

  tag.src = 'https://www.youtube.com/iframe_api'
  var firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: 'dp6YlibDO6g',
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    })
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event: { target: { playVideo: () => void } }) {
    event.target.playVideo()
    videoReady.value = true
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false
  function onPlayerStateChange(event: { data: any }) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000)
      done = true
    }
  }
  function stopVideo() {
    player.stopVideo()
  }
}

const onClose = () => {
  showVideo.value = false
  player?.stopVideo()
}

const submit = async() => {
  if(!value.value) {

  }
}
</script>

<template>
  <div class="home">
    <img :src="$imgUrl('musebot.png')" class="title" alt="" />
    <div class="desc">Next-Gen NFTs Engine Powered by AIGC</div>

    <img :src="$imgUrl('l_lb.png')" class="lb" alt="" />
    <img :src="$imgUrl('l_down.png')" class="ldown" alt="" />

    <div class="left"></div>

    <div class="modal" v-if="visible">
      <div class="content">
        <div class="">Our product is still in preparation.</div>
        <div>Will keep you posted when everything is ready.</div>
        <div class="text">You can try our demo:</div>
        <div class="demo" @click="onShowVideo">Run The Demo</div>
      </div>

      <img
        :src="$imgUrl('close.png')"
        class="close"
        @click="visible = false"
        alt=""
      />
    </div>
    <!-- <CreateNft /> -->

    <div class="video-modal" v-show="showVideo">
      <div class="video-wrap">
        <img
          :src="$imgUrl('close.png')"
          class="close"
          @click="onClose"
          alt=""
          v-show="videoReady"
        />
        <div class="" id="player"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@function w($p) {
  @return calc($p / 1440) * 100vw;
}
@function h($p) {
  @return calc($p / 1024) * 100vh;
}
.video-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 12;

  .video-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .close {
      position: absolute;
      top: -28px;
      right: -28px;
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
  }
}
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 580px;
  height: 388px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: linear-gradient(
    122.16deg,
    rgba(73, 73, 73, 0.442) 0.03%,
    rgba(44, 44, 44, 0.65) 39.86%
  );
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(9px);
  /* Note: backdrop-filter has minimal browser support */

  .close {
    cursor: pointer;
    position: absolute;
    top: 28px;
    right: 28px;
    width: 22px;
    height: 22px;
  }

  .content {
    width: 360px;
    font-weight: 400;
    font-size: 14px;
    line-height: 173.8%;
    text-align: center;
    .ctitle {
      font-size: 24px;
    }
    .input {
      width: 361px;
      border: 2px solid rgba(245, 245, 245, 0.88);
      border-radius: 5px;
      margin-top: 36px;
    }

    :deep(.el-textarea) {
      .el-textarea__inner {
        background-color: transparent;
        border: none;
        box-shadow: none;
        color: #f5f5f5;
      }
    }
    .demo {
      width: 361px;
      height: 68px;
      line-height: 68px;
      background: rgba(98, 191, 54, 0.88);
      border-radius: 5px;
      margin-top: 20px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
    }
  }
}
.left {
  position: absolute;
  width: 170px;
  height: 94px;
  left: 0px;
  top: 309px;

  background: linear-gradient(
    101.42deg,
    rgba(98, 191, 54, 0.88) -24.47%,
    rgba(98, 191, 54, 0) 90.91%
  );
}
.lb {
  position: absolute;
  width: 252px;
  height: 70px;
  left: 74px;
  bottom: h(93);
}
.tr {
  position: absolute;
  width: 161px;
  height: 66px;
  right: 75px;
  top: h(93);
}
.ldown {
  position: absolute;
  width: 39.93px;
  height: 407.94px;
  right: 57px;
  bottom: h(93);
}
.home {
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url(@/assets/bg_home.png);
  background-repeat: no-repeat;
  background-position: w(627) h(229);
  background-size: 618px 596px;

  .title {
    position: absolute;
    left: w(223);
    top: h(281);
    width: 618px;
    height: 90px;
  }

  .desc {
    position: absolute;
    width: 642px;
    height: 234px;
    right: w(211);
    top: h(512);
    font-weight: 400;
    font-size: 64px;
    color: #f5f5f5;
    text-align: left;
  }
}
</style>
