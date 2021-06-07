import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './PokemonPage.module.css';
import PokeListContext from '../../store/PokeListContext';
import PokemonImage from './PokemonImage/PokemonImage';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import PokemonEvolutionChain from './PokemonEvolutionChain/PokemonEvolutionChain';

const PokemonPage = () => {
  const { pokemonData, getSelectedPokemon } =
    useContext(PokeListContext);
  const { id } = useParams();
  const [idState, setIdState] = useState(null);

 useEffect(() => {
      getSelectedPokemon(id);
   }, [getSelectedPokemon, id]);

  console.log(pokemonData)

  return (
    <div className={classes.PokemonPage}>
      {pokemonData.pokemon !== undefined && Object.keys(pokemonData.pokemon).length !== 0 ? (
        <React.Fragment>
          <div className={classes.InfoFlex}>
            <PokemonImage pokemon={pokemonData.pokemon} />
            <PokemonDetails pokemon={pokemonData.pokemon} versionsIntroduced={pokemonData.versions_introduced} />
          </div>

          <PokemonEvolutionChain />
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default PokemonPage;
