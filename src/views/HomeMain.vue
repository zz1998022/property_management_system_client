<template>
  <div class="home-main">
    <div>
      <!-- 小区名称 start -->
      <a-row>
        <a-col :span="6">
          <span class="home-com-name">小区名称</span>
        </a-col>
        <a-col>
          <a-select> </a-select>
        </a-col>
      </a-row>
      <!-- 小区名称 end -->
      <!-- 小区信息 start -->
      <a-row>
        <a-col :span="24">
          <span>服务器状态:</span>
        </a-col>
      </a-row>
      <!-- 小区信息 end -->
      <a-row>
        <a-col :span="24" class="home-chart">
          <div id="home-chart"></div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import * as echarts from "echarts";
import { useStore } from "@/store";
import { getCommunityName } from "@/api/community";

export default defineComponent({
  setup() {
    // 获取store
    const store = useStore();
    // 获取用户信息
    const user = computed(() => store.state.users.profile.username);
    onMounted(() => {
      // 获取DOM元素
      const homeChart = document.getElementById("home-chart") as HTMLElement;
      // 在dom挂载的时候生成图表
      generateChart(homeChart);
    });
    // 获取城市数据
    const { commList, getCommunity } = communityName();
    return { user };
  },
});

// 生成图表
function generateChart(chartDom: any) {
  type EChartsOption = echarts.EChartsOption;

  const myChart = echarts.init(chartDom);
  let option: EChartsOption;

  option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };

  option && myChart.setOption(option);
}

// 获取小区数据
function communityName() {
  const commList = ref();
  // 获取小区名字
  const getCommunity = getCommunityName()
    .then((res) => {
      if (res.code === 200) {
        commList.value = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return { commList, getCommunity };
}
</script>

<style scoped>
#home-chart {
  width: 100%;
  height: 500px;
}

.home-com-name {
  font-size: 16px;
  font-weight: bold;
}
</style>
