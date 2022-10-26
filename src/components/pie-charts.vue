<template>
  <div ref="divRef" :style="{width: width, height: height}"></div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'
  import useEchart from '@/hooks/useEcharts.js'
  const props = defineProps({
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    echartsDatas: {
      type: Array,
      default: () => {}
    }
  })

  watch(()=> props.echartsDatas, (newV,oldV)=>{
    setupEcahrt(newV)
  })

  let divRef = ref(null)
  let myChart = null
  onMounted(() => {
    setupEcahrt(props.echartsDatas)
  })

  function setupEcahrt(echartsDatas = []) {
    if (!myChart) {
      myChart = useEchart(divRef.value)
    }
    let option = getOption(echartsDatas)
    myChart.setOption(option)
  }



  function getOption(echartsDatas) {
    let colors = echartsDatas.map((item) => {
      return item.color;
    });

    let data = echartsDatas.map((item) => {
      return {
        value: item.value,
        name: item.name,
      };
    });

    let total = echartsDatas.reduce((a, b) => {
      return a + b.value * 1;
    }, 0);

    let option = {
      color: colors,
      title: {
        text: `{nameSty| 充电桩总数}\n{number|${total}}`,
        top: "50%",
        left: "30%",
        textStyle: {
          rich: {
            nameSty: {
              fontSize: 19,
              color: "white",
              padding: [10, 0],
            },
            number: {
              fontSize: 24,
              color: "white",
              padding: [4, 0, 0, 20],
            },
          },
        },
      },
      legend: {
        orient: "vertical",
        right: "10%",
        top: "18%",
        itemGap: 20,
        itemWidth: 16,
        itemHeigth: 16,
        icon: "rect",
        formatter: function (name) {
          var currentItem = echartsDatas.find((item) => item.name === name);
          return (
            "{nameSty|" +
            currentItem.name +
            "}\n" +
            "{numberSty|" +
            currentItem.value +
            "个 }" +
            "{preSty|" +
            currentItem.percentage +
            "}"
          );
        },
        textStyle: {
          rich: {
            nameSty: {
              fontSize: 12,
              color: "#FFFFFF",
              padding: [10, 14],
            },
            numberSty: {
              fontSize: 12,
              color: "#40E6ff",
              padding: [0, 0, 0, 14],
            },
            preSty: {
              fontSize: 12,
              color: "#40E6ff",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          center: ["40%", "57%"],
          radius: ["30%", "75%"],
          label: {
            show: false,
          },
          data: data,
          roseType: "area",
        },
      ],
    };

    return option
  }

</script>

<style scoped></style>
