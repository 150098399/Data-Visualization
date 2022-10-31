<template>
  <main class="screen-bg">
    <div class="header">

    </div>
    <!-- 左边 -->
    <div class="left-top">
      <pie-charts :echartsDatas="charginPile"></pie-charts>
    </div>
    <div class="left-bottom">
      <line-charts :echartsDatas="processMonitoring"></line-charts>
    </div>
    <!-- 右边 -->
    <div class="right-top"></div>
    <div class="right-center">
      <bar-charts :echartsDatas="chargingStatistics"></bar-charts>
    </div>
    <div class="right-bottom">
      <right-bottom-svg :echartsDatas="exceptionMonitoring"></right-bottom-svg>
    </div>
    <!-- 中间 -->
    <div class="center">
      <center-svg></center-svg>
    </div>
    <div class="bottom">
      <bottom-panel></bottom-panel>
    </div>
  </main>
</template>

<script setup>
  import PieCharts from '@/components/pie-charts.vue'
  import LineCharts from '@/components/line-charts.vue'
  import barCharts from '@/components/bar-charts.vue'
  import RightBottomSvg from '@/components/right-bottom-svg.vue'
  import CenterSvg from '@/components/center-svg.vue'
  import BottomPanel from '@/components/bottom-panel.vue'
  import { ref } from 'vue'
  import { charginPileData, processMonitoringData, chargingStatisticsData, exceptionMonitoringData } from './config/home-data'
  import { getPowerScreenData } from '@/services'

  let charginPile = ref( charginPileData )
  let processMonitoring = ref(processMonitoringData)
  let chargingStatistics = ref(chargingStatisticsData)
  let exceptionMonitoring = ref(exceptionMonitoringData)

  getPowerScreenData().then(res => {
    charginPile.value = res.data.chargingPile.data
    processMonitoring.value = res.data.processMonitoring.data
    chargingStatistics.value = res.data.chargingStatistics.data
    exceptionMonitoring.value = res.data.exceptionMonitoring.data
  })
  

</script>

<style scoped>
.screen-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/bg.png);
  background-repeat: no-repeat;
}

.header {
  position: absolute;
  top: 21px;
  left: 0;
  right: 0;
  height: 56px;
  background-image: url(@/assets/images/bg_header.svg);
  background-repeat: no-repeat;
}

.left-top {
  position: absolute;
  top: 116px;
  left: 16px;

  width: 536px;
  height: 443px;
  background-image: url(@/assets/images/bg_left-top.svg);
  background-repeat: no-repeat;
}

.left-bottom {
  position: absolute;
  bottom: 49px;
  left: 16px;

  width: 536px;
  height: 443px;
  background-image: url(@/assets/images/bg_left_bottom.svg);
  background-repeat: no-repeat;
}

.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;
    
  background-image: url(@/assets/images/bg_right_top.svg);
  background-repeat: no-repeat;
}
.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;

  background-image: url(@/assets/images/bg_right_center.svg);
  background-repeat: no-repeat;
}
.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(@/assets/images/bg_right_bottom.svg);
  background-repeat: no-repeat;

}

.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
    
}

.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;
    
  background-image: url(@/assets/images/bg_bottom.svg);
  background-repeat: no-repeat;
}


</style>