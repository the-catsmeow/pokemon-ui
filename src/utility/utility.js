const pokemonTypeColor = {
  normal: {
    light: '#C6C6A7',
    regular: '#A8A878',
    dark: '#6D6D4E',
  },
  fire: {
    light: '#F5AC78',
    regular: '#F08030',
    dark: '#9C531F',
  },
  water: {
    light: '#9DB7F5',
    regular: '#6890F0',
    dark: '#445E9C',
  },
  grass: {
    light: '#A7DB8D',
    regular: '#78C850',
    dark: '#4E8234',
  },
  electric: {
    light: '#FAE078',
    regular: '#F8D030',
    dark: '#A1871F',
  },
  ice: {
    light: '#BCE6E6',
    regular: '#98D8D8',
    dark: '#638D8D',
  },
  fighting: {
    light: '#D67873',
    regular: '#C03028',
    dark: '#7D1F1A',
  },
  poison: {
    light: '#C183C1',
    regular: '#A040A0',
    dark: '#682A68',
  },
  ground: {
    light: '#EBD69D',
    regular: '#E0C068',
    dark: '#927D44',
  },
  flying: {
    light: '#C6B7F5',
    regular: '#A890F0',
    dark: '#6D5E9C',
  },
  psychic: {
    light: '#FA92B2',
    regular: '#F85888',
    dark: '#A13959',
  },
  bug: {
    light: '#C6D16E',
    regular: '#A8B820',
    dark: '#6D7815',
  },
  rock: {
    light: '#D1C17D',
    regular: '#B8A038',
    dark: '#786824',
  },
  ghost: {
    light: '#A292BC',
    regular: '#705898',
    dark: '#493963',
  },
  dark: {
    light: '#A29288' ,
    regular: '#705848',
    dark: '#49392F',
  },
  dragon: {
    light: '#A27DFA',
    regular: '#7038F8',
    dark: '#4924A1',
  },
  steel: {
    light: '#D1D1E0',
    regular: '#B8B8D0',
    dark: '#787887',
  },
  fairy: {
    light: '#F4BDC9',
    regular: '#EE99AC',
    dark: '#9B6470',
  },
}

export const getPokemonTypeColor = (level, types) => {
  
  if (types.length === 2) {
    return {background: `linear-gradient(145deg, ${pokemonTypeColor[types[0].type.name][level]} 20%, ${pokemonTypeColor[types[1].type.name][level]} 100%)`};
  } else {
    return {backgroundColor: pokemonTypeColor[types[0].type.name][level]};
  }

  
};

