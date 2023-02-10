<template>
  <router-view></router-view>
</template>
<style lang="scss">
@font-face {
  font-family: "Nasalization";
  src: url(./assets/nasalization-rg.otf);
  font-weight: 100;
}

a {
  text-decoration: none;
}
</style>

<script setup lang="ts">
import store from './store';
onMounted(() => {
  const address = localStorage.getItem('address')
  if (address) {
    store.address = address
  }
})
</script>
