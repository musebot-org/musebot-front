<script setup lang="ts">
import { Wallet, getList, connect } from "./utils/wallet";
const format = (s: string) => {
  return s.substring(0, 8) + "..." + s.substring(s.length - 4);
};

const addr = ref("");
const onConnect = async () => {
  walletClickTrack();
  console.log(
    "%c [ onConnect ]-9",
    "font-size:13px; background:pink; color:#bf2c9f;",
    onConnect
  );
  try {
    const wallet = await connect(1);
    addr.value = wallet.getAddress();
  } catch (error) {
    console.log(
      "%c [ error ]-18",
      "font-size:13px; background:pink; color:#bf2c9f;",
      error
    );
  }
};
const visible = ref(false);

const onClick = () => {
  visible.value = true;
  getstartedClickTrack();
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id) as HTMLHtmlElement;
  const top = el.offsetHeight - 170;
  window.scrollTo({
    top,
  });
};

onMounted(() => {
  homeVisitTrack();
});
</script>
<template>
  <div class="mmain">
    <div class="header pl30 pr30">
      <div class="h80 flex-a spa">
        <router-link to="/" class="flex-a fs14">
          <span>MuseBot</span>
          <span class="green">「Beta」</span>
        </router-link>

        <div class="connect-btn addr" v-if="addr" @click="addr = ''">
          <span class="address">{{ format(addr) }}</span>
          <!-- <span class="disconnect">Disconnect</span> -->
        </div>
        <div class="connect-btn" @click="onConnect" v-else>CONNECT WALLET</div>
      </div>
      <!-- <div class="h53 flex-a cfff">
        <div class="">
          <a href="#about">ABOUT</a>
        </div>
        <div class="flex1 ta">
          <span @click="scrollTo('feature')">Feature</span>
        </div>
        <div class="">
          <a href="#about">Get started</a>
        </div>
      </div> -->
    </div>

    <div class="home mt48">
      <img :src="$imgUrl('musebot.png')" class="logo h57 ml74" alt="" />
      <div class="left"></div>
      <div class="w212 mt29 ml78 fs22">
        Next-Gen NFTs Engine Powered by AIGC
      </div>

      <div class="mt46 ml78 btn-started" @click="onClick">Get Started</div>

      <div class="mt74 ml58 fs22 uline">Enter MuseBot</div>
      <div class="w291 mt24 ml57">
        MuseBot aims to build an AIGC NFTs platform that leverages creators by
        integrating one-stop creation tools with a highly efficient marketplace.
        Our visions are to eliminate the barriers of NFT creation for ordinary
        people, accelerate the process of NFT creation and become the think tank
        of NFT inspirations for professional creators, and provide trading and
        cocreation ecosystems for artists and collectors.
      </div>

      <img :src="$imgUrl('m/arrow_h.png')" class="ldown" alt="" />
      <!-- <img :src="$imgUrl('m/bg1.png')" class="bg1" alt="" /> -->
    </div>
    <div id="feature" class="feature pb120 mt75">
      <div class="feature-title fs22">Feature</div>
      <div class="ml31 mt53">
        <div class="mb65 w363">
          <img :src="$imgUrl('m/f1.png')" class="" alt="" />
        </div>
        <div class="mb65 w330">
          <img :src="$imgUrl('m/f2.png')" class="" alt="" />
        </div>
        <div class="w324">
          <img :src="$imgUrl('m/f3.png')" class="" alt="" />
        </div>
      </div>

      <div class="flex-a bottom">
        <img :src="$imgUrl('m/arrow2.png')" class="w59 mr25" alt="" />

        <a
          href="https://twitter.com/MuseBot_AI"
          target="_blank"
          class="icon-twitter flex-a-j"
        >
          <div class="w33 h33 mt4">
            <img :src="$imgUrl('twitter.png')" class="twitter" alt="" />
          </div>
        </a>
      </div>
    </div>

    <el-dialog
      v-model="visible"
      append-to-body
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <CreateNftM @close="visible = false" />
    </el-dialog>
  </div>
</template>
<!-- main -->
<style lang="scss">
@font-face {
  font-family: "Nasalization";
  src: url(./assets/nasalization-rg.otf);
  font-weight: 100;
}

a {
  text-decoration: none;
}
body {
  font-family: Nasalization, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #f5f5f5;
  margin: 0;
  padding: 0;
  background-color: #111;
}

.mmain {
  padding-top: 80px;
  font-size: 14px;
  color: #f5f5f5;
  background-image: url(@/assets/m/bg_bottom.png);
  background-repeat: no-repeat;
  background-size: auto;
  background-position: left bottom;

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid rgba($color: #f5f5f5, $alpha: 0.2);
    background-color: #111;
    z-index: 1;

    .connect-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 19px;
      color: rgba(98, 191, 54, 0.88);
      width: 157px;
      height: 31px;
      border: 2px solid rgba(98, 191, 54, 0.88);
      border-radius: 5px;
      z-index: 11;

      &.addr {
        color: #f5f5f5;

        .disconnect {
          display: none;
        }
        &:hover {
          .address {
            // display: none;
          }
          .disconnect {
            display: block;
          }
        }
      }
    }
  }
}
</style>
<!-- home -->
<style lang="scss" scoped>
.home {
  position: relative;
  background-image: url(@/assets/bg_home.png);
  background-repeat: no-repeat;
  background-position: 147px 40px;
  background-size: 213px auto;
  .ldown {
    position: absolute;
    width: 13pxpx;
    right: 40px;
    top: 152px;
  }
  .bg1 {
    position: absolute;
    bottom: -150px;
    left: 0;
  }
  .btn-started {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 155px;
    height: 47px;
    border: 2px solid rgba(98, 191, 54, 0.88);
    border-radius: 5px;
    font-size: 22px;
    color: #62bf36;
  }
  .left {
    position: absolute;
    left: 0px;
    width: 63px;
    height: 44px;
    top: 7px;

    background: linear-gradient(
      103.56deg,
      rgba(98, 191, 54, 0.88) -43.93%,
      rgba(98, 191, 54, 0) 89.49%
    );
  }
  .uline {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 177px;
      height: 3px;
      background: #ffffff;
      border-radius: 5px;
    }
  }
}
</style>
<!-- feature -->
<style lang="scss" scoped>
.feature {
  position: relative;
  img {
    max-width: 100%;
  }

  .bottom {
    position: absolute;
    bottom: 40px;
    right: 40px;
    .icon-twitter {
      width: 43px;
      height: 43px;
      border: 1px solid #f5f5f5;
      border-radius: 50%;
    }
  }
}
.feature-title {
  width: 388px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: linear-gradient(
    102.29deg,
    rgba(98, 191, 54, 0.88) 4.53%,
    rgba(98, 191, 54, 0) 109.41%
  );
}
</style>
