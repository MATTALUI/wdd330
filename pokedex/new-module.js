console.log('Connected');
// import * as THREE from './threepo/build/three.module'
// import { OrbitControls } from './three/examples/jsm/controls/OrbitControls'
// import { FBXLoader } from './three/examples/jsm/loaders/FBXLoader'
// import Stats from './three/examples/jsm/libs/stats.module'

// Our Javascript will go here.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
const camera = new THREE.PerspectiveCamera( 400, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.body.appendChild( renderer.domElement );



const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 5;

const hlight = new THREE.AmbientLight(0x404040, 100);
scene.add(hlight);

const dLight = new THREE.DirectionalLight(0x000000, 100);
dLight.position.set(0,1,0);
dLight.castShadow = true;
scene.add(dLight);

function animate() {
				
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // car.rotation.x += 0.01;
  // car.rotation.y += 0.01;
  renderer.render( scene, camera );
  requestAnimationFrame( animate );
}
animate();