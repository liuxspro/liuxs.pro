<script setup>
import { ref, computed } from "vue";

const points = ref([{}]);
const input_class = "input input-bordered input-info w-full max-w-xs input-sm";

function addPoints() {
  points.value.push({});
}

function clearPoints() {
  points.value = [{}];
}

function check_points(points) {
  if (points.length == 1 && points[0].x) {
    throw "Need more points";
  }
  for (let i = 0; i < points.length; i++) {
    if (!points[i].x || !points[i].z || !points[i].degree) {
      throw "X or Z or Degree is Empty";
    }
  }
}

const result = computed(() => {
  try {
    check_points(points.value);
    const inters = solve(points.value);
    const result = averagePoint(inters);
    if (Number.isFinite(result.x) && Number.isFinite(result.z)) {
      return [true, `Stronghold locate at ${result.x.toFixed(2)} ${result.z.toFixed(2)}`];
    }
    return [false, "X or Z is Infinity"];
  } catch (err) {
    return [false, err];
  }
});

function display(res) {
  if (res.x) {
    return [true, `Stronghold locate at ${x} ${z}`];
  } else {
    return [false, res];
  }
}

function calcIntersectionPoint(P1, P2) {
  let x1 = P1.x;
  let x2 = P2.x;
  let z1 = P1.z;
  let z2 = P2.z;
  let θ1 = (-P1.degree * Math.PI) / 180;
  let θ2 = (-P2.degree * Math.PI) / 180;
  let tanθ1 = Math.tan(θ1);
  let tanθ2 = Math.tan(θ2);
  let z = (z1 * tanθ1 - z2 * tanθ2 + x2 - x1) / (tanθ1 - tanθ2);
  let x = tanθ1 * z + x1 - z1 * tanθ1;
  let inter = { x, z };
  return inter;
}
function solve(P) {
  let intersections = [];
  for (let i = 0; i < P.length; i++) {
    for (let j = i + 1; j < P.length; j++) {
      intersections.push(calcIntersectionPoint(P[i], P[j]));
    }
  }
  return intersections;
}
function averagePoint(intersections) {
  let x = 0,
    z = 0;
  let len = intersections.length;
  for (let i = 0; i < len; i++) {
    x += intersections[i].x;
    z += intersections[i].z;
  }
  return {
    x: x / len,
    z: z / len,
  };
}
</script>

<template>
  <div class="p-2">
    <div class="flex space-x-4 justify-between" v-for="item in points">
      <div class="flex items-center mt-2">
        <span class="mr-2">X:</span>
        <input type="number" placeholder="Type here" :class="input_class" v-model="item.x" />
      </div>
      <div class="flex items-center mt-2">
        <span class="mr-2">Z:</span>
        <input type="number" placeholder="Type here" :class="input_class" v-model="item.z" />
      </div>
      <div class="flex items-center mt-2">
        <span class="mr-2">θ:</span>
        <input type="number" placeholder="Type here" :class="input_class" v-model="item.degree" />
      </div>
    </div>
    <div id="control" class="text-right mt-4">
      <button class="btn btn-sm ml-2" @click="clearPoints">Clear Points</button>
      <button class="btn btn-sm ml-2" @click="addPoints">Add Ponits</button>
    </div>

    <div role="alert" class="alert mt-4" :class="{ 'alert-error': !result[0] }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
        v-if="result[0]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
        v-if="!result[0]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ result[1] }}</span>
    </div>
  </div>
</template>

<style>
/* @import "./index.css";  tailwind css */
</style>
