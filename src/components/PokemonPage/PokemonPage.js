import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './PokemonPage.module.css';
import PokeListContext from '../../store/PokeListContext';
import PokemonImage from './PokemonImage/PokemonImage';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import PokemonEvolutionChain from './PokemonEvolutionChain/PokemonEvolutionChain';

const PokemonPage = () => {
  const { pokemonData, getSelectedPokemon, isLoading } = useContext(PokeListContext);
  const { id } = useParams();
  const [loadingLocal, setloadingLocal] = useState(true);

  useEffect(() => {
    setloadingLocal(true)
    async function fetchData() {
      await getSelectedPokemon(id);
      setloadingLocal(false);
    }
    fetchData();
  }, [getSelectedPokemon, id]);

  return (
    <div className={classes.PokemonPage}>
      {!isLoading && !loadingLocal ? (
        <React.Fragment>
          <div className={classes.InfoFlex}>
            <PokemonImage pokemon={pokemonData.pokemon} />
            <PokemonDetails
              pokemon={pokemonData.pokemon}
              versionsIntroduced={pokemonData.versions_introduced}
              species={pokemonData.species}
            />
          </div>

          <PokemonEvolutionChain />
        </React.Fragment>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default PokemonPage;
