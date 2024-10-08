<script setup>
import { ref, onMounted } from "vue";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileDebug from "ol/source/TileDebug.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

const olmap = ref({});

function create_ol_map() {
  olmap.value = new Map({
    target: "olmap",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new TileLayer({
        source: new TileDebug({ projection: "EPSG:3857" }),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 1,
      enableRotation: false, // 禁用旋转
      constrainResolution: true, // 将 resolution 约束为最接近的整数值
      projection: "EPSG:3857",
      multiWorld: true, // 设置了这个才显示z=0和1的瓦片？
    }),
  });
}

onMounted(() => {
  create_ol_map();
});
</script>

<template>
  <div id="olmap"></div>
</template>
<style>
@import "ol/ol.css";

div#olmap {
  height: 512px;
  border: 1px solid #ccc;
  border-radius: 0.5em;
}

div.ol-viewport {
  border-radius: 0.5em;
}
</style>
