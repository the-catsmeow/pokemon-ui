import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';

import classes from './Card.module.css';
import StatBar from './StatBar/StatBar';
import { getPokemonTypeColor } from '../../utility/utility';

const Card = ({ pokemon, setSelectedPokemon }) => {
  const history = useHistory();
  const [flipped, setFlipped] = useState(false);

  const flip = () => {
    setFlipped((prevState) => {
      return !prevState;
    });
  };

  const onClickHandler = (pokemonData) => {
    setSelectedPokemon(pokemonData);
    return history.push('/pokemon/' + pokemonData.id);
  };

  return (
    <React.Fragment>
      {Object.keys(pokemon).length !== 0 ? (
        <div
          className={classes.CardContainer}
          onClick={() => onClickHandler(pokemon)}
          onMouseEnter={() => flip()}
          onMouseLeave={() => flip()}
        >
          <CardFront flipped={flipped} pokemon={pokemon} />
          <CardBack flipped={flipped} pokemonStats={pokemon.stats} />
        </div>
      ) : null}
    </React.Fragment>
  );
};

const CardFront = ({ flipped, pokemon }) => {
  const CardFrontStyles = [classes.Card, classes.Front];

  if (flipped) {
    CardFrontStyles.push(classes.Flipped);
  }
  return (
    <div
      className={CardFrontStyles.join(' ')}
      style={getPokemonTypeColor('regular', pokemon.types)}
    >
      <div
        className={classes.Id}
        style={getPokemonTypeColor('dark', pokemon.types.slice(0, 1))}
      >
        {pokemon.id}
      </div>
      <div
        className={classes.ImageContainer}
        style={getPokemonTypeColor('light', pokemon.types.slice(0, 1))}
      >
        <img
          className={classes.PokemonArtwork}
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
        />
      </div>
      <span className={classes.NameType}>
        <span>{pokemon.name}</span>
        <span>
          Type:{' '}
          {pokemon.types.map((typeObj, idx) => {
            if (idx !== 0) {
              return ' | ' + typeObj.type.name;
            } else {
              return typeObj.type.name;
            }
          })}
        </span>
      </span>
    </div>
  );
};

const CardBack = ({ flipped, pokemonStats }) => {
  const CardBackStyles = [classes.Card, classes.Back];

  if (flipped) {
    CardBackStyles.push(classes.Flipped);
  }

  return (
    <div
      className={CardBackStyles.join(' ')}
      style={{ backgroundColor: '#333232' }}
    >
      <span className={classes.BackHeader}>Base Stats</span>
      {pokemonStats.map((stat, idx) => {
        return <StatBar statObj={stat} key={idx} />;
      })}
    </div>
  );
};

export default Card;
