<script setup lang="ts"></script>

<template>
  <div class="home">
    <img :src="$imgUrl('l_lb.png')" class="lb" alt="" />
    <img :src="$imgUrl('feature/f1.png')" class="f1" alt="" />
    <img :src="$imgUrl('feature/f2.png')" class="f2" alt="" />
    <img :src="$imgUrl('feature/f3.png')" class="f3" alt="" />

    <div class="rb ta">
      <div class="flex-a-j mr30">
        <img :src="$imgUrl('feature/arrow-right.png')" class="ldown" alt="" />
      </div>
      <a
        href="https://t.me/MuseBot_AI"
        target="_blank"
        class="icon-twitter mr30 flex-a-j"
      >
        <div class="w32 h32 mr3">
          <img :src="$imgUrl('tg.png')" class="twitter" alt="" />
        </div>
      </a>
      <a
        href="https://twitter.com/MuseBot_AI"
        target="_blank"
        class="icon-twitter flex-a-j"
      >
        <div class="w40 h40 mt5 ml2">
          <img :src="$imgUrl('twitter.png')" class="twitter" alt="" />
        </div>
      </a>
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

.rb {
  position: absolute;
  right: 55px;
  bottom: h(93);
  display: flex;
  align-items: center;
}

.icon-twitter {
  width: 50px;
  height: 50px;
  border: 1px solid #f5f5f5;
  border-radius: 50%;
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
  width: 88px;
  height: auto;
}

.home {
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url(@/assets/feature/bg.png);
  background-repeat: no-repeat;
  background-position: w(0) h(0);
  background-size: auto;

  .f1 {
    position: absolute;
    top: h(228);
    right: w(482);
    width: w(439);
    height: auto;
  }

  .f2 {
    position: absolute;
    top: h(307);
    right: w(77);
    width: w(342);
    height: auto;
  }

  .f3 {
    position: absolute;
    top: h(599);
    right: w(392);
    width: w(445);
    height: auto;
  }
}
</style>
