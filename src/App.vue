<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import WebGPU from 'three/examples/jsm/capabilities/WebGPU.js';
import WebGPURenderer from 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {loadGlTF,loadHdrTexture} from "@/core/loader.js";

let camera, scene, renderer, controls;
const viewportRef = ref();

onMounted(async () => {
  await init();
  animate();
})

async function init() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20);
  camera.position.set(- 0.75, 0.7, 1.25);

  scene = new THREE.Scene();

  // load model
  const gltf = await loadGlTF("1689750290.glb");
  scene.add(gltf);

  if (WebGPU.isAvailable()) {
    renderer = new WebGPURenderer({ antialias: true });
  } else {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  }

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  viewportRef.value.appendChild(renderer.domElement);

  scene.background = new THREE.Color(0xAAAAAA);

  loadHdrTexture("railway_bridge_2k.hdr").then(texture => {
    texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.background = texture;
      scene.environment = texture;
  })

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // controls.minDistance = 1;
  // controls.maxDistance = 10;
  controls.target.set(0, 0.35, 0);
  controls.update();

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}
</script>

<template>
  <div id="viewport" ref="viewportRef"></div>
</template>

<style scoped lang="less">
#viewport {
  width: 100vw;
  height: 100vh;
}
</style>
