<template>
  <router-view />
</template>

<script setup>

import { RouterView } from 'vue-router'
import useScalePage from '@/hooks/useScalePage'

// 大屏适配
let option = {
  targetX: 1920,
  targetY: 1080,
  targetRatio: 16 / 9

}
useScalePage(option)

</script>

<style scoped>

</style>
