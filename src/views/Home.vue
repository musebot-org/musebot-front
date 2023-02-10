<template>
  <div class="main">
    <swiper
      :direction="'vertical'"
      :slidesPerView="1"
      :spaceBetween="30"
      :mousewheel="true"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="mySwiper"
      @init="onInit"
      @slideChange="onSlideChange"
    >
      <swiper-slide><Home /></swiper-slide>
      <swiper-slide><About /></swiper-slide>
      <swiper-slide><Feature /></swiper-slide>
      <!-- <swiper-slide><Started /></swiper-slide> -->
    </swiper>

    <div class="header">
      <router-link to="/" class="logo" @click="navClickTrack('homepage')">
        <span>MuseBot</span>
        <span class="green">「Beta」</span>
      </router-link>
    </div>
    <div class="tabs">
      <router-link class="link" to="/" @click="navClickTrack('homepage')">
        HOMEPAGE
      </router-link>
      <router-link class="link" to="/about" @click="navClickTrack('about')">
        About
      </router-link>
      <router-link class="link" to="/feature" @click="navClickTrack('feature')">
        Feature
      </router-link>
    </div>

    <div
      class="connect-btn addr"
      v-if="store.address"
      @click="store.address = ''"
    >
      <span class="address">{{ format(store.address) }}</span>
      <span class="disconnect">Disconnect</span>
    </div>
    <div class="connect-btn" @click="onConnect" v-else>CONNECT WALLET</div>
  </div>
</template>
<script setup lang="ts">
import store from "../store";
import { Wallet, getList, connect } from "../utils/wallet";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import Feature from "@/components/Feature.vue";
import Started from "@/components/Started.vue";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Mousewheel, Pagination } from "swiper";

const modules = [Mousewheel];

const route = useRoute();
const router = useRouter();
const swiperIns = ref();
const onInit = (e: any) => {
  swiperIns.value = e;
};

const modalOpen = ref(false)

const routes = ["home", "about", "feature", "started"];

const onSlideChange = (e: any) => {
  const name = routes[e.activeIndex];
  router.push({ name });
};
watch(
  () => route.name,
  (v) => {
    const i = routes.indexOf(String(v));
    swiperIns.value.slideTo(i);
  }
);

onMounted(() => {
  const i = routes.indexOf(String(route.name));
  swiperIns.value.slideTo(i);

  homeVisitTrack();
});

const format = (s: string) => {
  return s.substring(0, 8) + "..." + s.substring(s.length - 4);
};

const onConnect = async () => {
  store.showModal = true
  // walletClickTrack();
  // try {
  //   const wallet = await connect(1);
  //   console.log(
  //     "%c [ wallet ]-75",
  //     "font-size:13px; background:pink; color:#bf2c9f;",
  //     wallet
  //   );
  //   store.address = wallet.getAddress();
  // } catch (error) { }
};

</script>

<style lang="scss">
@function w($p) {
  @return calc($p / 1440) * 100vw;
}

@function h($p) {
  @return calc($p / 1024) * 100vh;
}

.green {
  color: #62bf36;
}

.main {
  .header {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    top: h(83);
    left: 74px;
    z-index: 11;

    .logo {
      font-family: "Nasalization";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-transform: uppercase;
      color: #f5f5f5;
      text-decoration: none;
    }
  }

  .tabs {
    position: fixed;
    display: flex;
    align-items: center;
    top: h(83);
    left: 50%;
    transform: translateX(-50%);
    z-index: 11;

    .link {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      /* identical to box height */
      text-transform: uppercase;
      color: #f5f5f5;
      text-decoration: none;

      &:not(:last-child) {
        margin-right: 34px;
      }

      &.router-link-active {
        color: #62bf36;
      }
    }
  }

  .connect-btn {
    cursor: pointer;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: h(75);
    right: w(75);
    font-size: 16px;
    line-height: 19px;
    color: rgba(98, 191, 54, 0.88);
    width: 205px;
    height: 35px;
    border: 2px solid rgba(98, 191, 54, 0.88);
    border-radius: 5px;
    z-index: 11;

    &:hover {
      background: rgba(98, 191, 54, 0.88);
      color: #f5f5f5;
    }

    &.addr {
      color: #f5f5f5;

      .disconnect {
        display: none;
      }

      &:hover {
        .address {
          display: none;
        }

        .disconnect {
          display: block;
        }
      }
    }
  }
}
</style>
<style lang="scss">
#app,
.main {
  height: 100%;
  position: relative;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  font-size: 18px;
  background-color: #111;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
