import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvasNode: HTMLCanvasElement | null = document.querySelector('.canvas');
if (canvasNode === null) {
	throw new Error('canvasNode не найден');
}
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
};
const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
	color: '#00ff83'
});
const mesh = new THREE.Mesh(geometry, material);
const light = new THREE.PointLight(0xffffff, 1, 100);
const camera = new THREE.PerspectiveCamera(
	45,
	sizes.width / sizes.height,
	0.1,
	100
);
const renderer = new THREE.WebGLRenderer({canvas: canvasNode});
const controls = new OrbitControls(camera, canvasNode);

light.position.set(0, 10, 10);
camera.position.z = 20;
scene.add(mesh);
scene.add(light);
scene.add(camera);
controls.enableDamping = true;
controls.dampingFactor = 0.01;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
	controls.update();
	renderer.render(scene, camera);

	requestAnimationFrame(loop);
};

loop();


























export {}