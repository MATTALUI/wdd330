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
  this.height = height; // In decimeters
  this.weight = weight; // In hectograms
  this.stats = stats || {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };
}

Pokemon.prototype.displayHeight = function() {
  const conversionConstant = 3.93701; // Convert Decimeters to inches
  const inchesInAFoot = 12;
  const totalInches = this.height * conversionConstant;
  const feet = Math.floor(totalInches / inchesInAFoot);
  const inches = (totalInches % inchesInAFoot).toFixed();

  return `HT ${feet}'${inches}"`;
};

Pokemon.prototype.displayWeight = function() {
  const conversionConstant = 0.220462;
  const lbs = (this.weight * conversionConstant).toFixed(1);

  return `WT ${lbs}lbs`;
};

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
