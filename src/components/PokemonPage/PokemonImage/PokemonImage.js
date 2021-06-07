import React from 'react';
import classes from './PokemonImage.module.css';

import { getPokemonTypeColor } from '../../../utility/utility';

const PokemonImage = ({ pokemon }) => {
  return (
    <div
      className={classes.PokeImgContainer}
      style={getPokemonTypeColor('regular', pokemon.types)}
    >
      <div
        className={classes.PokeImgCircle}
        style={getPokemonTypeColor('light', pokemon.types.slice(0, 1))}
      ></div>
      <img
        className={classes.PokeImg}
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
      />
    </div>
  );
};

export default PokemonImage;
