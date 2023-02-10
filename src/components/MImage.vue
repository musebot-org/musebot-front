<template>
  <el-image @error="onerror" v-bind="$attrs" :fit="fit" class="muse-image">
    <!-- 加载中 -->
    <template #placeholder>
      <div class="skeleton__item animate">
        <!-- <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M64 896V128h896v768H64z m64-128l192-192 116.352 116.352L640 448l256 307.2V192H128v576z m224-480a96 96 0 1 1-0.064 192.064A96 96 0 0 1 352 288z"
          ></path>
        </svg> -->
      </div>
    </template>

    <!-- 加载失败 -->
    <template #error>
      <div class="skeleton__item animate">
        <!-- <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M64 896V128h896v768H64z m64-128l192-192 116.352 116.352L640 448l256 307.2V192H128v576z m224-480a96 96 0 1 1-0.064 192.064A96 96 0 0 1 352 288z"
          ></path>
        </svg> -->
      </div>
    </template>
  </el-image>
</template>

<script setup lang="ts">
interface Props {
  fit?: string
}
const emit = defineEmits(['error'])
withDefaults(defineProps<Props>(), {
  fit: 'cover'
})

const onerror = (err: any) => {
  emit('error', err)
}
</script>

<style lang="scss" scoped>
.muse-image {
  vertical-align: bottom;
  width: 100%;
  height: 100%;
}
.skeleton__item {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #353e4c !important;
  background-image: linear-gradient(
    90deg,
    #353e4c,
    #8a90a2,
    #353e4c
  ) !important;
  background-size: 200px 100%;
  border-radius: 8px;
  background-repeat: no-repeat;

  &.animate {
    animation: skeleton-loading 1.2s ease-in-out infinite;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: #dcdde0;
    width: 30%;
    height: 30%;
  }
}

@keyframes skeleton-loading {
  // 0% {
  //   background-position: -200px 0;
  // }
  // to {
  //   background-position: calc(200px + 100%) 0;
  // }
  0% {
    background-position: -200px 0;
  }
  to {
    background-position: calc(200px + 100%) 0;
  }
}
</style>
