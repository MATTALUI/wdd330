import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
// import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
// import ''
			// Our Javascript will go here.
			const scene = new THREE.Scene();
			scene.background = new THREE.Color(0xdddddd);
			const camera = new THREE.PerspectiveCamera( 400, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );



			const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			const hlight = new THREE.AmbientLight(0x404040, 100);
			scene.add(hlight);

			const dLight = new THREE.DirectionalLight(0x000000, 100);
			dLight.position.set(0,1,0);
			dLight.castShadow = true;
			scene.add(dLight);



      var geo = new THREE.EdgesGeometry( cube.geometry );
      var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
      var wireframe = new THREE.LineSegments( geo, mat );
      wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
      cube.add( wireframe );

			





			let car;
			const loader = new GLTFLoader();
			loader.load( '/car/scene.gltf', function ( gltf ) {

				car = gltf.scene;
				// scene.add( gltf.scene );
				animate();

			}, undefined, function ( error ) {

				console.error( error );

			} );

			// let man;
			// const loader = new FBXLoader();
			// loader.load( '/man.fbx', function ( fbx ) {
      //   fbx.scale.setScalar(0.1);
      //   fbx.traverse(c => c.castShadow = true);

			// 	man = fbx;
			// 	scene.add( fbx );
			// 	animate();

			// }, undefined, function ( error ) {

			// 	console.error( error );

			// } );


			function animate() {
				
				// cube.rotation.x += 0.01;
				// cube.rotation.y += 0.01;
				// car.rotation.x += 0.01;
				// car.rotation.y += 0.01;
				
				
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
      }


      document.addEventListener('keydown', function(event) {
        switch(event.keyCode) {
          case 38: // UP
            console.log('UP');
            cube.rotation.x -= 0.25;
            break;
          case 37: // Left
            console.log('Left');
            cube.rotation.y -= 0.25;
            break;
          case 40: // Down
            console.log('Down');
            cube.rotation.x += 0.25;
            break;
          case 39: // Right
            console.log('Right');
            cube.rotation.y += 0.25;
            break;
          default:
            console.log('key pressed!', event);
        }
        
      });