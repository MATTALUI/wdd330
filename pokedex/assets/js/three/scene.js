(async () => {
	const scene = new THREE.Scene();
	const container = document.querySelector('#dex-comtainer');
	const canvas = document.querySelector('#dex-screen');
	const camera = new THREE.PerspectiveCamera( 400, window.innerWidth / window.innerHeight, 0.1, 1000 );
	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
	const hlight = new THREE.AmbientLight(0x020202, 100);
	const dLight = new THREE.DirectionalLight(0x000000, 100);
	const controls = new THREE.OrbitControls( camera, renderer.domElement );
	const loader = new THREE.ColladaLoader();
	const pokemonHash = {};
	let currentScenePokemon = null;

	renderer.setSize(container.offsetWidth, window.innerHeight/2);
	camera.position.set( 1, 1, 20 );
	scene.add(hlight);
	dLight.position.set(0,1,0);
	dLight.castShadow = true;
	scene.add(dLight);

	const toggleSceneSpinner = () => {
		// TODO: implement this later...
	}

	const swapPokemon = async event => {
		event.preventDefault();
		const num = event.target.getAttribute('data-num');
		const pokemon = pokemonHash[num];
		if (currentScenePokemon) {
			scene.remove(currentScenePokemon);
			currentScenePokemon = null;
			toggleSceneSpinner();
		}
		if (pokemon.scene) {
			scene.add(pokemon.scene);
			currentScenePokemon = pokemon.scene;
			toggleSceneSpinner();
		} else {
			loader.load(pokemon.path, function (result) {
				pokemon.scene = result.scene;
				pokemon.scene.name = pokemon.name;
				scene.add(pokemon.scene);
				currentScenePokemon = pokemon.scene;
				toggleSceneSpinner();
			});
		}
	}

	async function loadPokemonHash() {
		const data = await fetch('./pokemon.json');
		const pokemon = await data.json();
		pokemon.forEach(pokemon => {
			pokemonHash[pokemon.num] = pokemon;
			pokemonHash[pokemon.num].scene = null;
		});
		
		// NOTE: This is just temporary until we get services hooked up
		const ol = document.createElement('ol');
		
		pokemon.forEach(pokemon => {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.innerHTML = pokemon.name;
			a.href = '';
			a.addEventListener('click', swapPokemon);
			a.setAttribute('data-num', pokemon.num);
			li.appendChild(a);
			ol.appendChild(li);
		});
		document.querySelector('#left').appendChild(ol);
		///////////////////////////////////////////////////////////////
	}
	loadPokemonHash();

	function animate() {
		renderer.render( scene, camera );
		requestAnimationFrame( animate );
		controls.update();
	}
	animate();
})();