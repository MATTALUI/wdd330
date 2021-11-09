const scene = new THREE.Scene();
const container = document.querySelector('#dex-comtainer');
const canvas = document.querySelector('#dex-screen');
const camera = new THREE.PerspectiveCamera( 400, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(container.offsetWidth, window.innerHeight/2);

camera.position.set( 1, 1, 20 );

const hlight = new THREE.AmbientLight(0x020202, 100);
scene.add(hlight);

const dLight = new THREE.DirectionalLight(0x000000, 100);
dLight.position.set(0,1,0);
dLight.castShadow = true;
scene.add(dLight);

const controls = new THREE.OrbitControls( camera, renderer.domElement );


const loader = new THREE.ColladaLoader();

document.addEventListener('keypress', function(event) {
	const { keyCode } = event;
	if (keyCode === 32 && mons.length) {
		console.log('Swap mons');
		scene.remove(mons[currentIndex]);
		currentIndex++;
		if (currentIndex === mons.length) {
			currentIndex = 0;
		}
		scene.add(mons[currentIndex]);
	}
});

let currentIndex = 0;
let mons = [];
	
async function loadMons() {
	const data = await fetch('./temp.json');
	const pokemon = await data.json();
	await Promise.all(pokemon.map(pokemon => new Promise((resolve, rej) => {
		loader.load(pokemon.path, function (result) {
		result.scene.name = pokemon.name;
		mons.push(result.scene);
		resolve();
		});
	})));
	scene.add(mons[currentIndex]);
	animate();
	
}
loadMons();

function animate() {
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
	controls.update();
}