<template>
  <div class="wrapper">
    <div class="title">
      <div class="title-content">Connect your wallet</div>
      <div class="close" @click="emit('close')">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.8"
            d="M15.17 11L21.4244 4.74562C22.1919 3.97812 22.1919 2.73375 21.4244 1.96562L20.0344 0.575625C19.2669 -0.191875 18.0225 -0.191875 17.2544 0.575625L11 6.83L4.74563 0.575625C3.97813 -0.191875 2.73375 -0.191875 1.96563 0.575625L0.575625 1.96562C-0.191875 2.73312 -0.191875 3.9775 0.575625 4.74562L6.83 11L0.575625 17.2544C-0.191875 18.0219 -0.191875 19.2662 0.575625 20.0344L1.96563 21.4244C2.73312 22.1919 3.97813 22.1919 4.74563 21.4244L11 15.17L17.2544 21.4244C18.0219 22.1919 19.2669 22.1919 20.0344 21.4244L21.4244 20.0344C22.1919 19.2669 22.1919 18.0225 21.4244 17.2544L15.17 11Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>
    </div>
    <div class="content">
      <div
        v-for="i in list"
        class="detail"
        :class="{ disabled: i.disabled }"
        @click="connent(i)"
      >
        <div class="detail-image">
          <img
            :src="$imgUrl('wallet/' + i.pic + '.png')"
            :width="i.picSize"
            :height="i.picSize"
          />
        </div>
        <div class="detail-content">
          {{ i.name }}
        </div>
        <div class="tags">
          <div class="tag" v-for="j in i.tag">{{ j.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import store from "../store";
// fine stick doll bid case domain parade mushroom much poverty leaf mass
// clarify cupboard cry destroy jewel emerge better broccoli valve minute another burst
const emit = defineEmits(["close"]);

const list = ref([
  {
    name: "Metamask",
    pic: "metamask",
    picSize: 58,
    disabled: true,
    tag: [
      {
        name: "COMMING SOON",
      },
    ],
  },
  {
    name: "Martian Aptos wallet",
    pic: "martian",
    picSize: 47,
    id: "martian",
    link: "https://martianwallet.xyz/",
    tag: [
      {
        name: "APTOS",
      },
    ],
  },
  {
    name: "Petra Aptos Wallet",
    pic: "petra",
    picSize: 48,
    id: "aptos",
    link: "https://petra.app/",
    tag: [
      {
        name: "APTOS",
      },
    ],
  },
]);

const connent = async (info: any) => {
  if (!info.id) {
    return;
  }
  if (window[info.id]) {
    const { address } = await window[info.id].connect();
    if (address) {
      emit("close");
      store.address = address;
    } else {
      alert("cannot get your address");
    }
  } else {
    window.open(info.link, "_blank");
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 580px;
  height: 388px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(122.16deg,
      rgba(73, 73, 73, 0.5984) 0.03%,
      rgba(44, 44, 44, 0.88) 39.86%);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(9px);
  border-radius: 10px;
  z-index: 99;
}

.title {
  margin-top: 24px;
  margin-bottom: 36px;
  text-align: center;
  display: flex;
  color: #f5f5f5;
  font-weight: 400;
  font-size: 24px;
}

.title-content {
  width: 90%;
}

.close {
  cursor: pointer;
}

.detail {
  width: 481px;
  height: 76px;
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #f5f5f5;

  &:hover {
    border-color: #5eb038;
    color: #5eb038;
  }

  &.disabled {
    cursor: not-allowed;

    &:hover {
      border-color: #f5f5f5;
      color: #f5f5f5;
    }

    & .tag {
      background: rgba(245, 245, 245, 0.2);
    }
  }
}

.detail-image {
  width: 100px;
  text-align: center;
}

.detail-content {
  font-weight: 400;
  font-size: 24px;
}

.tags {
  margin-left: 30px;
  font-size: 12px;
  color: #ffffff;
}

.tag {
  padding: 1px 5px;
  background: #5eb038;
  border-radius: 2px;

  &.disbaled {
    background: #f5f5f5;
  }
}
</style>
