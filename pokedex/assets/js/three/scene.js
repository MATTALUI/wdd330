(async () => {
	const scene = new THREE.Scene();
	const container = document.querySelector('#dex-container');
	const canvas = document.querySelector('#dex-screen');
	const camera = new THREE.PerspectiveCamera( 400, window.innerWidth / window.innerHeight, 0.1, 1000 );
	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
	const hlight = new THREE.AmbientLight(0x020202, 100);
	const dLight = new THREE.DirectionalLight(0x000000, 100);
	const controls = new THREE.OrbitControls( camera, renderer.domElement );
	const loader = new THREE.ColladaLoader();
	let currentScenePokemon = null;

	renderer.setSize(container.offsetWidth, window.innerHeight/2);
	camera.position.set( 1, 1, 20 );
	dLight.position.set(0,1,0);
	dLight.castShadow = true;
	scene.add(hlight);
	scene.add(dLight);

	const toggleSceneSpinner = () => {
		document.querySelector('#loader-container').classList.toggle('hidden');
	}

	POKEDEX.flickerWTPLights = () => {
		scene.remove(hlight);
		scene.remove(dLight);
		setTimeout(() => {
			scene.add(hlight);
			scene.add(dLight);
		}, 6000);
	};

	POKEDEX.swapPokemon = async num => {
		const pokemon = POKEDEX.pokemonHash[num];
		if (currentScenePokemon) {
			scene.remove(currentScenePokemon);
			currentScenePokemon = null;
		}
		toggleSceneSpinner();
		await POKEDEX.wait(); // I made the spinner; you'll see it, dang it!
		if (pokemon.scene) {
			toggleSceneSpinner();
			scene.add(pokemon.scene);
			currentScenePokemon = pokemon.scene;
		} else {
			loader.load(pokemon.path, async result => {
				toggleSceneSpinner();
				pokemon.scene = result.scene;
				pokemon.scene.name = pokemon.name;
				scene.add(pokemon.scene);
				currentScenePokemon = pokemon.scene;
			});
		}
	}

	function animate() {
		renderer.render( scene, camera );
		requestAnimationFrame( animate );
		controls.update();
	}
	animate();
})();
