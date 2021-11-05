(() => {
  console.log('Hello, world!');
  const prevButton = document.querySelector('#prevButton');
  const nextButton = document.querySelector('#nextButton');
  const pokeList = document.querySelector('#pokemon');

  let current = 'https://pokeapi.co/api/v2/pokemon';
  let next = null;
  let prev = null;

  const getPokemon = async () => {
    const response = await fetch(current);
    const data = await response.json();

    next = data.next;
    prev = data.previous;

    if (!prev) {
      prevButton.setAttribute('disabled', true);
    } else {
      prevButton.removeAttribute('disabled');
    }

    if (!next) {
      nextButton.setAttribute('disabled', true);
    } else {
      nextButton.removeAttribute('disabled');
    }
    const pokemonInfo = await Promise.all(data.results.map(async ({ url }) => {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    }));

    pokeList.innerHTML = '';
    pokemonInfo.forEach(({ name, sprites}) => {
      const li = document.createElement('li');
      li.innerHTML = name;

      const img = document.createElement('img');
      img.src = sprites.front_default;
      li.appendChild(img);

      pokeList.appendChild(li);
    });
  };

  const previousPage = async () => {
    console.log('previous');
    current = prev;
    await getPokemon();
  };

  const nextPage = async () => {
    console.log('next');
    current = next;
    await getPokemon();
  };

  getPokemon();
  prevButton.addEventListener('click', previousPage);
  nextButton.addEventListener('click', nextPage);
})();
