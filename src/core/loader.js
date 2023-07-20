import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export function loadGlTF(fileName) {
    return new Promise((resolve, reject) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/libs/draco/gltf/');

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        loader.setPath('/model/')

        loader.load(fileName, function (gltf) {
            let scene = gltf.scene;
            scene.animations.push(...gltf.animations);
            resolve(scene);
        })
    })
}

export function loadHdrTexture(fileName) {
    return new Promise((resolve, reject) => {
        const loader = new RGBELoader();
        loader.setPath('/texture/hdr/');

        loader.load(fileName, function (texture) {
            resolve(texture);
        })
    })
}