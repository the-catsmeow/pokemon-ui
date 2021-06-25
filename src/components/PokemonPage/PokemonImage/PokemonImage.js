import React from 'react';
import classes from './PokemonImage.module.css';

import { getPokemonTypeColor } from '../../../utility/utility';

const PokemonImage = ({ pokemon, styles, desktopOnly }) => {

  let styleContainerRules = getPokemonTypeColor('regular', pokemon.types);
  let styleCircleRules = getPokemonTypeColor('light', pokemon.types.slice(0, 1));
  let styleImgRules = {};

  let containerClasses = [classes.PokeImgContainer];

  if(styles) {
    styleContainerRules = {
      ...styleContainerRules,
      ...styles
    }
    styleCircleRules = {
      ...styleContainerRules,
      ...styles
    }
    styleImgRules = {
      ...styles
    }
  }

  if(desktopOnly) {
    containerClasses.push(classes.DesktopOnly)
  }

  return (
    <div
      className={containerClasses.join(' ')}
      style={styleContainerRules}
    >
      <div
        className={classes.PokeImgCircle}
        style={styleCircleRules}
      ></div>
      <img
        className={classes.PokeImg}
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        style={styleImgRules}
      />
    </div>
  );
};

export default PokemonImage;
