function Pokemon({
  num,
  name,
  stats,
  sprite,
  height,
  weight,
  types=[],
}={}) {
  this.num = num;
  this.name = name;
  this.types = types;
  this.sprite = sprite;
  this.height = height;
  this.weight = weight;
  this.stats = stats || {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };
}

Pokemon.fromPokemonAPIData = function(pokemonAPIData) {
  const nameMap = {
    ['special-defense']: "specialDefense",
    ['special-attack']: "specialAttack",
  };
  const stats = pokemonAPIData.stats.reduce((stats, apiStat) => {
    const statName = nameMap[apiStat.stat.name] || apiStat.stat.name;
    stats[statName] = apiStat.base_stat;

    return stats;
  }, {});
  const types = pokemonAPIData.types.map(t => t.type.name);
  const pokemon = new Pokemon({
    num: pokemonAPIData.id,
    name: pokemonAPIData.species.name,
    sprite: pokemonAPIData.sprites.front_default,
    height: pokemonAPIData.height,
    weight: pokemonAPIData.weight,
    stats,
    types,
  });

  return pokemon;
};
