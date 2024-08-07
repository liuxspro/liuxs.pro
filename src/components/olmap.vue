<script setup>

import { ref, onMounted } from "vue";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

// let olmap;
const olmap = ref()

function create_ol_map() {
  olmap.value = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
}
onMounted(() => {
  create_ol_map();
});






</script>


<template>
  <div>
    <label class="label cursor-pointer">
      <span class="label-text">路网</span>
      <input type="checkbox" class="toggle toggle-sm toggle-success" checked="checked" />
    </label>

  </div>

  <div id="map"></div>
</template>


<style>
@import 'ol/ol.css';

div#map {
  width: 100%px;
  height: 460px;
  border: 1px solid #ccc;
  border-radius: 0.5em;
}

div.ol-viewport {
  border-radius: 0.5em;
}
</style>