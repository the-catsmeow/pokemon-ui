import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classes from './PokemonPage.module.css';
import PokeListContext from '../../store/PokeListContext';
import PokemonImage from './PokemonImage/PokemonImage';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import PokemonEvolutionChain from './PokemonEvolutionChain/PokemonEvolutionChain';

const PokemonPage = () => {
  const { pokemonData, getSelectedPokemon, isLoading } = useContext(PokeListContext);
  const { id } = useParams();
  // const [loadingLocal, setloadingLocal] = useState(true);

  // TODO: Make this loading actually work. Right now this is a hack to work around not understanding
  // the data fetching portion. Getting can't set state on unmounted component. Think that this is
  // because this component starts to render and then is re-rendered 4 more times, so the component is
  // unmounted and mounted over and over leaving stale setstate calls.

  useEffect(() => {
    // setloadingLocal(true)
    async function fetchData() {
      await getSelectedPokemon(id);
    }
    fetchData();
  }, [getSelectedPokemon, id]);

  return (
    <div className={classes.PokemonPage}>
      {!isLoading && (pokemonData.pokemon && Object.keys(pokemonData.pokemon).length > 0) ? (
        <React.Fragment>
          <div className={classes.InfoFlex}>
            <PokemonImage pokemon={pokemonData.pokemon} desktopOnly />
            <PokemonDetails
              pokemon={pokemonData.pokemon}
              versionsIntroduced={pokemonData.versions_introduced}
              species={pokemonData.species}
            />
          </div>

          <PokemonEvolutionChain pokeName={pokemonData.pokemon.name} evolutionChain={pokemonData.evolution_chain}/>
        </React.Fragment>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default PokemonPage;
