<script setup>
import { ref, onMounted, computed } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { ScaleLine, Zoom } from "ol/control";
import XYZ from "ol/source/XYZ.js";

const apply_map_style = [];

const map_style = {
  label: "s.e:l|p.v:off", // 隐藏标签
  administrative: "s.t:1|s.e.g|p.v:off", // 隐藏行政区划
  road: "s.t:3|s.e.g|p.v:off", // 隐藏路网
  poi: "s.t:2|s.e.g|p.v:off", // 隐藏POI
  water: "s.t:6|s.e.l|p.v:off", // 隐藏水系
};

const sel_basemap_type = ref("p");

const basemap_types = [
  { text: "s: 卫星图", value: "s" },
  { text: "r: 街道图", value: "m" },
  { text: "p: 地形图", value: "p" },
];

const map_switch = ref({
  label: true,
  administrative: true,
  road: true,
  poi: true,
  water: true,
});

const map_url = computed(() => {
  const hidden_items = Object.keys(map_switch.value).filter((key) => map_switch.value[key] === false);
  const apply_styles = hidden_items.map((item) => map_style[item]);
  let apistyle = "";
  if (apply_styles.length > 0) {
    apistyle = "&apistyle=" + apply_styles.join(",");
  }
  return `http://mt0.google.com/vt/lyrs=${sel_basemap_type.value}&x={x}&y={y}&z={z}&s=Ga${apistyle}`;
});
// 底图
const GoogleMap = new XYZ({
  url: map_url.value,
});

let olmap;
function create_ol_map() {
  olmap = new Map({
    target: "olmap",
    layers: [
      new TileLayer({
        source: GoogleMap,
      }),
    ],
    view: new View({
      center: [11151924, 4420066],
      zoom: 8,
      constrainResolution: true, // 将 resolution 约束为最接近的整数值
      projection: "EPSG:3857",
    }),
    controls: [new ScaleLine({ units: "metric" }), new Zoom()],
  });
}

function handleBaseMapChange(e) {
  sel_basemap_type.value = e.target.value;
  GoogleMap.setUrl(map_url.value);
}

function handleChange() {
  GoogleMap.setUrl(map_url.value);
}

onMounted(() => {
  create_ol_map();
});
</script>

<template>
  <div class="mt-8">
    <p>当前瓦片地址:</p>
    <p class="font-din text-sm p-2 border rounded-md mb-4">{{ map_url }}</p>
    <div class="flex lg:flex-row flex-col">
      <div id="control" class="lg:w-1/3 lg:pr-4 w-full">
        <p>选择底图</p>
        <select class="select select-info select-sm w-full max-w-xs" v-model="sel_basemap_type"
          @change="handleBaseMapChange">
          <option v-for="option in basemap_types" :value="option.value">
            {{ option.text }}
          </option>
        </select>
        <label class="label cursor-pointer">
          <span class="label-text">标签 Label</span>
          <input type="checkbox" class="toggle toggle-sm toggle-success" v-model="map_switch.label"
            @change="handleChange" />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">行政区划 Administrative</span>
          <input type="checkbox" class="toggle toggle-sm toggle-success" v-model="map_switch.administrative"
            @change="handleChange" />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">路网 Road</span>
          <input type="checkbox" class="toggle toggle-sm toggle-success" v-model="map_switch.road"
            @change="handleChange" />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">POI</span>
          <input type="checkbox" class="toggle toggle-sm toggle-success" v-model="map_switch.poi"
            @change="handleChange" />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">水系 Water</span>
          <input type="checkbox" class="toggle toggle-sm toggle-success" v-model="map_switch.water"
            @change="handleChange" />
        </label>
      </div>
      <div id="olmap" class="w-full"></div>
    </div>
  </div>
</template>

<style>
@import "ol/ol.css";

div#olmap {
  height: 460px;
  border: 1px solid #ccc;
  border-radius: 0.5em;
}

div.ol-viewport {
  border-radius: 0.5em;
}
</style>
