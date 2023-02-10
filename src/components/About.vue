<script setup lang="ts"></script>

<template>
  <div class="about">
    <div class="left">
      <div class="title">Enter MuseBot</div>
      <div class="line"></div>

      <div class="text mt70">
        MuseBot aims to build an AIGC NFTs platform that leverages creators by
        integrating one-stop creation tools with a highly efficient marketplace.
        Our visions are to eliminate the barriers of NFT creation for ordinary
        people, accelerate the process of NFT creation and become the think tank
        of NFT inspirations for professional creators, and provide trading and
        cocreation ecosystems for artists and collectors.
      </div>
    </div>

    <!-- <img :src="$imgUrl('l_tr.png')" class="tr" alt="" /> -->
    <img :src="$imgUrl('about/arrow.png')" class="ldown" alt="" />

    <div class="left_bg"></div>
  </div>
</template>

<style lang="scss" scoped>
@function w($p) {
  @return calc($p / 1440) * 100vw;
}
@function h($p) {
  @return calc($p / 1024) * 100vh;
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
  height: 107.94px;
  right: 316px;
  bottom: h(93);
}
.left_bg {
  position: absolute;
  width: 725px;
  height: 77px;
  left: 0;
  bottom: h(93);

  background: linear-gradient(
    102.29deg,
    rgba(98, 191, 54, 0.88) 4.53%,
    rgba(98, 191, 54, 0) 109.41%
  );
}
.about {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url(@/assets/about/bg.png);
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto auto;
  .left {
    margin-left: 90px;
    .title {
      width: 532px;
      font-size: 64px;
      line-height: 76px;
      text-align: left;
    }
    .line {
      width: 532px;
      height: 9px;
      background: #ffffff;
      border-radius: 5px;
      margin: 24px 0 90px;
    }
    .text {
      width: 532px;
    }
    .btn {
      width: 306px;
      height: 78px;
      font-weight: 400;
      font-size: 36px;
      line-height: 43px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: capitalize;
      color: #62bf36;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        color: #f5f5f5;
      }

      background-image: url(@/assets/about/btn_bg1.png),
        url(@/assets/about/btn_bg2.png);
      background-repeat: no-repeat;
      background-position: left top, right bottom;
    }
  }
  .right {
    width: 568px;
    height: 350px;
    font-weight: 400;
    font-size: 24px;
    line-height: 146.3%;
    text-align: left;
  }
}
</style>
