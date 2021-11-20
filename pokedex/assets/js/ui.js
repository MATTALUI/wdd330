(() => {
  const searchInput = document.querySelector('input');
  const searchButton = document.querySelector('#search-btn');
  const clearButton = document.querySelector('#clear-btn');
  const searchResultsContainer = document.querySelector('#poke-results');
  const pokeInfoScreen = document.querySelector('#dex-info-screen');
  const addToTeamButton = document.querySelector('#add-to-team');
  const loaderTemplate = `<span>Loading...</span>`;
  let currentViewPokemon = null;


  const inputRotation = setInterval(() => {
    if(Object.keys(POKEDEX.pokemonHash).length === 0) { return; }
    const randKey = Object.keys(POKEDEX.pokemonHash)[Math.floor(Math.random() * Object.keys(POKEDEX.pokemonHash).length - 1)];
    const randMon = POKEDEX.pokemonHash[randKey];
    searchInput.setAttribute('placeholder', randMon.name);
  }, 5000);


  const stopPlaceholderRotation = event => {
    clearInterval(inputRotation);
    searchInput.removeEventListener('focus', stopPlaceholderRotation);
  };

  const buildPokemonStatEle = pokemon => {
    const template = document.querySelector('#dex-info-screen-template');
    const resultItemEle = template.content.cloneNode(true);

    resultItemEle.querySelector('.dex-info-name').innerHTML = pokemon.name;
    resultItemEle.querySelector('.dex-info-height').innerHTML = pokemon.displayHeight();
    resultItemEle.querySelector('.dex-info-weight').innerHTML = pokemon.displayWeight();
    resultItemEle.querySelector('.dex-info-hp').innerHTML = pokemon.stats.hp;
    resultItemEle.querySelector('.dex-info-sp').innerHTML = pokemon.stats.speed;
    resultItemEle.querySelector('.dex-info-at').innerHTML = pokemon.stats.attack;
    resultItemEle.querySelector('.dex-info-def').innerHTML = pokemon.stats.defense;
    resultItemEle.querySelector('.dex-info-sat').innerHTML = pokemon.stats.specialAttack;
    resultItemEle.querySelector('.dex-info-sdef').innerHTML = pokemon.stats.specialDefense;
    resultItemEle.querySelector('.dex-flavour').innerHTML = pokemon.flavour;
    resultItemEle.querySelector('.dex-info-sprite').src = pokemon.sprite;

    return resultItemEle;
  };

  const seePokemonStats = async event => {
    const pokemonNumber = event.target.getAttribute('data-num');
    POKEDEX.swapPokemon(pokemonNumber);

    // Fetch Pokemon Information
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
    const pokemonData = await res.json();
    const speciesRes = await fetch(pokemonData.species.url);
    const speciesData = await speciesRes.json();
    currentViewPokemon = Pokemon.fromPokemonAPIData({
      ...pokemonData,
      ...speciesData,
    });

    // Set Pokedex data
    const pokemonStatEle = buildPokemonStatEle(currentViewPokemon);
    pokeInfoScreen.innerHTML = '';
    pokeInfoScreen.appendChild(pokemonStatEle);

    // Enable add to team button
    addToTeamButton.removeAttribute('disabled');
    addToTeamButton.classList.add('quickflash');
    setTimeout(() => {
      addToTeamButton.classList.remove('quickflash');
    }, 1000);
  };

  const searchPokemon = async event => {
    searchResultsContainer.innerHTML = loaderTemplate;
    await POKEDEX.wait(500);
    const searchTerm = searchInput.value;
    if (!searchInput || Object.keys(POKEDEX.pokemonHash).length === 0) { return; }

    const options = Object.values(POKEDEX.pokemonHash).filter(
      pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    searchResultsContainer.innerHTML = '';
    if (!options.length) {
      searchResultsContainer.innerHTML = '<span>No Wild Pokemon Here</span>';
    } else {
      options.forEach(pokemon => {
        const template = document.querySelector('#poke-search-item-template');
        const resultItemEle = template.content.cloneNode(true);

        resultItemEle.querySelector('.result-num').innerHTML = `#${pokemon.num}`;
        resultItemEle.querySelector('.result-name').innerHTML = `${pokemon.name}`;
        resultItemEle.querySelector('button').setAttribute('data-num', pokemon.num);
        resultItemEle.querySelector('button').addEventListener('click', seePokemonStats);

        searchResultsContainer.appendChild(resultItemEle);
      });
    }
  };

  const addToTeam = event => {
    if (!currentViewPokemon) { return; }
    console.log('Add to team', currentViewPokemon);
  };


  const clearSearch = event => {
    searchInput.value = '';
  };


  searchInput.addEventListener('focus', stopPlaceholderRotation);
  searchButton.addEventListener('click', searchPokemon);
  clearButton.addEventListener('click', clearSearch);
  addToTeamButton.addEventListener('click', addToTeam);
})();
