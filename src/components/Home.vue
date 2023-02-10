<script setup lang="ts">
import store from '../store';

const visible = ref(false)

const onClick = () => {
  if (store.address) {
    visible.value = true
    getstartedClickTrack()
  } else {
    store.showModal = true
  }
}
</script>

<template>
  <div class="home flex-a">
    <div class="content">
      <img :src="$imgUrl('musebot.png')" class="title" alt="" />
      <div class="desc">Next-Gen NFTs Engine Powered by AIGC</div>
      <div class="btn flex-a-j" @click="onClick">Get Started</div>
      <div class="left"></div>
    </div>
    <img :src="$imgUrl('l_lb_s.png')" class="lb" alt="" />
    <img :src="$imgUrl('l_down.png')" class="ldown" alt="" />

    <el-dialog
      v-model="visible"
      append-to-body
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <CreateNft @close="visible = false" />
    </el-dialog>

    <el-dialog
      v-model="store.showModal"
      append-to-body
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <WalletModal @close="store.showModal = false" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@function w($p) {
  @return calc($p / 1440) * 100vw;
}

@function h($p) {
  @return calc($p / 1024) * 100vh;
}

.btn {
  width: 268px;
  height: 66px;
  border: 3px solid #5eb038;
  border-radius: 5px;
  color: #62bf36;
  font-size: 36px;
  cursor: pointer;
  margin-top: 6vh;

  &:hover {
    background-color: #62bf36;
    color: #f5f5f5;
  }
}

.content {
  position: relative;
  padding-left: 222px;
}

.left {
  position: absolute;
  width: 170px;
  height: 14vh;
  left: 0px;
  top: 20px;

  background: linear-gradient(101.42deg,
      rgba(98, 191, 54, 0.88) -24.47%,
      rgba(98, 191, 54, 0) 90.91%);
}

.lb {
  position: absolute;
  width: 84px;
  height: 82px;
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
  // background-image: url(@/assets/l_lb.png), url(@/assets/l_tr.png),
  //   url(@/assets/l_down.png), url(@/assets/bg_home.png);
  // background-repeat: no-repeat;
  // background-position: w(74) h(861), w(1205) h(93), w(1343) h(523),
  //   w(627) h(229);
  // background-size: w(252) h(70), w(161) h(66), w(40) h(408), 618px 596px;

  .title {
    width: auto;
    height: 18vh;
  }

  .desc {
    width: 60vh;
    font-weight: 400;
    font-size: 6.6vh;
    color: #f5f5f5;
    text-align: left;
    margin-top: 2vh;
  }
}
</style>
