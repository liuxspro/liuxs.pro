<script setup>
import { ref, computed } from "vue";
const lon = ref(117.52);
const lat = ref(36.25);
const zoom = ref(8);
const input_class = "input input-bordered input-info w-full max-w-xs input-sm";

const result_xy = computed(() => {
  const n = Math.pow(2, zoom.value);
  const x = parseInt(((lon.value + 180) / 360) * n);
  const lat_degree = (lat.value * Math.PI) / 180;
  // “log”代表自然对数（也称为 ln 或 loge）
  const y = parseInt(((1 - Math.log(Math.tan(lat_degree) + 1 / Math.cos(lat_degree)) / Math.PI) * n) / 2);
  const tile = `https://tile.openstreetmap.org/${zoom.value}/${x}/${y}.png`;
  return {
    x,
    y,
    tile,
  };
});

const X = ref(211);
const Y = ref(100);
const ZOOM = ref(8);
const result_latlon = computed(() => {
  const n = Math.pow(2, ZOOM.value);
  const lon = (X.value / n) * 360 - 180;
  const lat = (Math.atan(Math.sinh(Math.PI - (Y.value / n) * 2 * Math.PI)) * 180) / Math.PI;
  return { lon, lat };
});
</script>

<template>
  <h3>根据经纬度计算其所在瓦片编号</h3>
  <div class="flex flex-col lg:flex-row justify-between">
    <div class="flex items-center mt-2">
      <span class="mx-2 shrink-0">经度(Longitude):</span>
      <input type="number" placeholder="" :class="input_class" v-model="lon" />
    </div>
    <div class="flex items-center mt-2">
      <span class="mx-2 shrink-0">纬度(Latitude):</span>
      <input type="number" placeholder="" :class="input_class" v-model="lat" />
    </div>
    <div class="flex items-center mt-2">
      <span class="mx-2 shrink-0">缩放级别(Zoom):</span>
      <input type="number" placeholder="" :class="input_class" v-model="zoom" />
    </div>
  </div>
  <div class="flex flex-row p-2">
    <div class="w-full text-center flex flex-col justify-center items-center">
      <p>
        <code class="text-2xl">x={{ result_xy.x }}</code>
        <code class="text-2xl">y={{ result_xy.y }}</code>
      </p>
    </div>
    <img :src="result_xy.tile" alt="" style="width: 256px" />
  </div>
  <h3>根据瓦片 XY 和 ZOOM 计算经纬度</h3>

  <div class="flex flex-col lg:flex-row justify-between">
    <div class="flex items-center mt-2">
      <span class="mx-2 shrink-0">X:</span>
      <input type="number" placeholder="" :class="input_class" v-model="X" />
    </div>
    <div class="flex items-center mt-2">
      <span class="mx-2 shrink-0">Y:</span>
      <input type="number" placeholder="" :class="input_class" v-model="Y" />
    </div>
    <div class="flex items-center mt-2">
      <span class="mx-2 shrink-0">Z:</span>
      <input type="number" placeholder="" :class="input_class" v-model="ZOOM" />
    </div>
  </div>
  <div>
    <p>
      瓦片西北（左上）角的坐标（经度、纬度）为：
      <code>{{ result_latlon.lon.toFixed(6) }}</code>
      <code>{{ result_latlon.lat.toFixed(6) }}</code>
    </p>
  </div>
</template>
