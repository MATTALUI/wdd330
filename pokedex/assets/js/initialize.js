(() => {
  POKEDEX.wait = (ms=500) => new Promise((res, rej) => {
		setTimeout(() => { // Simulate slow for the spinner
			res();
		}, ms);
	});

  (async () => {
    const data = await fetch('./pokemon.json');
    const pokemon = await data.json();
    pokemon.forEach(pokemon => {
      POKEDEX.pokemonHash[pokemon.num] = pokemon;
      POKEDEX.pokemonHash[pokemon.num].scene = null;
    });
    // const randKey = Object.keys(POKEDEX.pokemonHash)[Math.floor(Math.random() * Object.keys(POKEDEX.pokemonHash).length - 1)];
    // const randMon = POKEDEX.pokemonHash[randKey];
    // POKEDEX.swapPokemon(randMon.num);
    const handleLinkClick = event => {
      event.preventDefault();
      const num = event.target.getAttribute('data-num');
      POKEDEX.swapPokemon(num);
    }
  
    const ol = document.createElement('ol');
      
      pokemon.forEach(pokemon => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.innerHTML = pokemon.name;
        a.href = '';
        a.addEventListener('click', handleLinkClick);
        a.setAttribute('data-num', pokemon.num);
        li.appendChild(a);
        ol.appendChild(li);
      });
      // document.querySelector('#left').appendChild(ol);
  })();


})();


















/*
const handleLinkClick = event => {
		event.preventDefault();
		const num = event.target.getAttribute('data-num');
		swapPokemon(num);
	}

const ol = document.createElement('ol');
    
    pokemon.forEach(pokemon => {
    	const li = document.createElement('li');
    	const a = document.createElement('a');
    	a.innerHTML = pokemon.name;
    	a.href = '';
    	a.addEventListener('click', handleLinkClick);
    	a.setAttribute('data-num', pokemon.num);
    	li.appendChild(a);
    	ol.appendChild(li);
    });
    document.querySelector('#left').appendChild(ol);

*/