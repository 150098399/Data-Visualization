import * as echarts from 'echarts'
import {onUnmounted } from 'vue'

export default function useEchart(divEl) {
  const echartsInstance = echarts.init(divEl, null, {renderer: 'svg'})

  onUnmounted(() => {
    echartsInstance.dispose()
  })

  function setOption(option) {
    echartsInstance.setOption(option)
  }

  function resizeEchart() {
    echartsInstance.resize()
  }

  return {
    echartsInstance,
    setOption,
    resizeEchart
  }
}