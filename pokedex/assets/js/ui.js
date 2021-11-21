(() => {
  const storageTeamKey = 'POKEDEX::MYTEAM';
  const maxTeamSize = 6; // This is how many you're allowed in the games
  const searchInput = document.querySelector('input');
  const searchButton = document.querySelector('#search-btn');
  const clearButton = document.querySelector('#clear-btn');
  const releaseButton = document.querySelector('#release');
  const searchResultsContainer = document.querySelector('#poke-results');
  const myTeamContainer = document.querySelector('#my-team');
  const pokeInfoScreen = document.querySelector('#dex-info-screen');
  const addToTeamButton = document.querySelector('#add-to-team');
  const wtpButton = document.querySelector('#whos-that-pokemon');
  const loaderTemplate = `<span>Loading...</span>`;
  const myTeam = (
    JSON.parse(localStorage.getItem(storageTeamKey)) || []
  ).map(p => new Pokemon(p));
  const sfx = {
    wtp: document.querySelector('#sfx-wtp'),
    ball: document.querySelector('#sfx-ball'),
    selection: document.querySelector('#sfx-selection'),
    pc: document.querySelector('#sfx-pc'),
  };
  console.log(myTeam);

  let currentViewPokemon = null;
  let currentViewPokemonTeamIndex = null;



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

  const buildPokemonTeamEle = (pokemon, index) => {
    const template = document.querySelector('#team-member-template');
    const resultItemEle = template.content.cloneNode(true);

    resultItemEle.querySelector('.team-member__name').innerHTML = pokemon.name;
    resultItemEle.querySelector('.team-member__sprite').src = pokemon.sprite;
    resultItemEle.querySelector('.team-member__hp').innerHTML = `${pokemon.stats.hp}/${pokemon.stats.hp}`;
    resultItemEle.querySelector('.team-member').setAttribute('data-index', index);
    resultItemEle.querySelector('.team-member').setAttribute('data-num', pokemon.num);
    resultItemEle.querySelector('.team-member').addEventListener('click', seeTeamMemberStats);

    return resultItemEle;
  };

  const quickFlashButton = buttonEle => {
    buttonEle.classList.add('quickflash');
    setTimeout(() => {
      buttonEle.classList.remove('quickflash');
    }, 1000);
  }

  const renderCurrentViewPokemon = () => {
    // Set Pokedex data
    const pokemonStatEle = buildPokemonStatEle(currentViewPokemon);
    pokeInfoScreen.innerHTML = '';
    pokeInfoScreen.appendChild(pokemonStatEle);

    if (currentViewPokemonTeamIndex !== null) {
      releaseButton.removeAttribute('disabled');
      quickFlashButton(releaseButton);
    } else {
      releaseButton.setAttribute('disabled', 'true');
    }

    // Enable add to team button
    if (myTeam.length >= maxTeamSize) { return; }
    addToTeamButton.removeAttribute('disabled');
    quickFlashButton(addToTeamButton);
  };

  const seeTeamMemberStats = event => {
    const index = +event.target.closest('.team-member').getAttribute('data-index');
    const pokemon = myTeam[index];

    currentViewPokemonTeamIndex = index;
    currentViewPokemon = pokemon;

    POKEDEX.swapPokemon(pokemon.num);
    renderCurrentViewPokemon(true);
  };

  const seePokemonStats = async event => {
    const pokemonNumber = event.target.getAttribute('data-num');
    POKEDEX.swapPokemon(pokemonNumber);

    // Fetch Pokemon Information
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
    const pokemonData = await res.json();
    const speciesRes = await fetch(pokemonData.species.url);
    const speciesData = await speciesRes.json();
    currentViewPokemonTeamIndex = null;
    currentViewPokemon = Pokemon.fromPokemonAPIData({
      ...pokemonData,
      ...speciesData,
      species: {
        // This is a little hack to override the name with an already formatted one
        name: POKEDEX.pokemonHash[pokemonNumber].name,
      },
    });

    renderCurrentViewPokemon();
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

  const saveTeam = () => {
    localStorage.setItem(storageTeamKey, JSON.stringify(myTeam));
  };

  const renderTeam = () => {
    myTeamContainer.innerHTML = '';
    myTeam.forEach((pokemon, index) => {
      const ele = buildPokemonTeamEle(pokemon, index);
      myTeamContainer.appendChild(ele);
    });
  };

  const addToTeam = event => {
    sfx.ball.play();
    if (!currentViewPokemon || myTeam.length >= maxTeamSize) { return; }
    myTeam.push(currentViewPokemon);
    saveTeam();
    renderTeam();
    console.log(myTeam);
    if (myTeam.length >= maxTeamSize) {
      addToTeamButton.setAttribute('disabled', 'true');
    }
  };


  const clearSearch = event => {
    searchInput.value = '';
  };

  const playWTP = event => {
    sfx.wtp.play();
  };

  const releaseTeamMember = event => {
    if (currentViewPokemonTeamIndex == null) { return; }
    sfx.pc.play();
    const pokemon = myTeam[currentViewPokemonTeamIndex];
    myTeam.splice(currentViewPokemonTeamIndex, 1);
    currentViewPokemonTeamIndex = null;
    saveTeam();
    renderTeam();
    renderCurrentViewPokemon();
  };


  searchInput.addEventListener('focus', stopPlaceholderRotation);
  searchButton.addEventListener('click', searchPokemon);
  clearButton.addEventListener('click', clearSearch);
  addToTeamButton.addEventListener('click', addToTeam);
  wtpButton.addEventListener('click', playWTP);
  releaseButton.addEventListener('click', releaseTeamMember);
  renderTeam();
})();
