import {onMounted, onUnmounted} from 'vue'
import _ from 'lodash'

// 大屏适配
export default function useScalePage(option) {
  const resizeFunc = _.throttle(function() {
    triggerScale()
  },100)
  
  onMounted(() => {
    triggerScale()
    window.addEventListener('resize',resizeFunc)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', resizeFunc)
  })
  // 大屏适配
  function triggerScale() {
      let targetX = option.targetX || 1920
      let targetY = option.targetY || 1080
      let targetRatio = option.targetRatio || 16 / 9
      let curX = document.documentElement.clientWidth || document.body.clientWidth
      let curY = document.documentElement.clientHeight || document.body.clientHeight
      let scaleRatio = curX / targetX // 缩放比例
      let curRatio = curX / curY
  
      // 超宽屏
      if (curRatio > targetRatio) {
        scaleRatio = curY / targetY
        document.body.style = `width:${targetX}px;height:${targetY}px;transform: scale(${scaleRatio}) translateX(-50%); left: 50%`
      } else {
        document.body.style = `width:${targetX}px;height:${targetY}px;transform: scale(${scaleRatio})`
      }
  }
}