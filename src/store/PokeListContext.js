import React, { useState, useCallback } from 'react';

const PokeListContext = React.createContext({
  pokemonList: [],
  pokemonData: {},
  nextPage: null,
  isLoading: true,
  loadData: async (page) => {},
  getSelectedPokemon: async (id) => {},
  getPokemonfromSearch: async () => {},
});

export const PokeListContextProvider = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonData, setPokemonData] = useState({});
  const [nextPage, setNextPage] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=50'
  );
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(
    async (
      dataPage = 'https://pokeapi.co/api/v2/pokemon?limit=50',
      optionalCallback
    ) => {
      setIsLoading(true);

      let pokemonDataArr = [];

      let pokemonDataRequest = await fetch(dataPage);
      let pokemonDataResponse = await pokemonDataRequest.json();

      Promise.allSettled(
        pokemonDataResponse.results.map(async (pokemon, idx) => {
          let pokemonRequest = await fetch(pokemon.url);
          let pokemonResponse = await pokemonRequest.json();
          pokemonDataArr.push({ pokemon: pokemon, pokeData: pokemonResponse });
        })
      ).then(() => {
        pokemonDataArr = pokemonDataArr.sort((a, b) =>
          +a.pokeData.id > +b.pokeData.id ? 1 : -1
        );
        setPokemonList((prevState) => {
          return [...prevState, ...pokemonDataArr];
        });
        setNextPage(pokemonDataResponse.next);
        setIsLoading(false);
        if (optionalCallback) {
          optionalCallback();
        }
      });
    },
    []
  );

  const getPokemonfromSearch = async (searchForm) => {
    setIsLoading(true);
    setPokemonList([]);

    if (searchForm.pokemon !== null && searchForm.pokemon !== '') {
      try {
        let searchRequest = await fetch(
          'https://pokeapi.co/api/v2/pokemon/' + searchForm.pokemon
        );

        if (searchRequest.status !== 200) {
          throw new Error('error searching for pokemon');
        }

        let searchResponse = await searchRequest.json();

        if (searchResponse) {
          setPokemonList([
            {
              pokeData: searchResponse,
              url: 'https://pokeapi.co/api/v2/pokemon/' + searchForm.pokemon,
            },
          ]);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      loadData();
    }
  };

  const getEvolvesToSpecies = useCallback((evolveObject, evolutionSpecies) => {
    if (evolveObject.evolves_to.length === 0) {
      return evolutionSpecies;
    } else {
      evolutionSpecies.push(evolveObject.evolves_to[0].species);
      let newEvolveObject = evolveObject.evolves_to[0];
      return getEvolvesToSpecies(newEvolveObject, evolutionSpecies);
    }
  }, []);

  const getSelectedPokemon = useCallback(
    async (id) => {
      setIsLoading(true);

      let pokemonData = {
        pokemon: {},
        species: {},
        versions_introduced: [],
        evolution_chain: [],
      };

      let pokemonResponse = await fetch(
        'https://pokeapi.co/api/v2/pokemon/' + id
      );
      let pokemon = await pokemonResponse.json();

      pokemonData.pokemon = pokemon;

      let speciesResponse = await fetch(pokemon.species.url);
      let species = await speciesResponse.json();

      pokemonData.species = species;

      let evolutionChainResponse = await fetch(species.evolution_chain.url);
      let evolutionChainObject = await evolutionChainResponse.json();

      let evolutionChainSpecies = getEvolvesToSpecies(
        evolutionChainObject.chain,
        [evolutionChainObject.chain.species]
      );

      let generationResponse = await fetch(species.generation.url);
      let generation = await generationResponse.json();

      let versions = [];

      //TODO: Refactor this to avoid then chaining. works for now so shrug
      Promise.allSettled(
        evolutionChainSpecies.map(async (specie) => {
          let specieResponse = await fetch(specie.url);
          let specieObj = await specieResponse.json();

          let pokemonEvolveResponse = await fetch(
            'https://pokeapi.co/api/v2/pokemon/' + specieObj.id
          );
          let pokemonEvolveObj = await pokemonEvolveResponse.json();

          return {
            name: specie.name,
            url: specie.url,
            sprite:
              pokemonEvolveObj.sprites.other['official-artwork'].front_default,
          };
        })
      ).then((evolveChain) => {
        pokemonData.evolution_chain = evolveChain.map((e) => e.value);

        Promise.allSettled(
          generation.version_groups.map(async (version_group) => {
            let versionsResponse = await fetch(version_group.url);
            let versionsObj = await versionsResponse.json();
            versions.push(...versionsObj.versions);
          })
        )
          .then(() => {
            pokemonData.versions_introduced = versions;
            setPokemonData(pokemonData);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    },
    [getEvolvesToSpecies]
  );

  return (
    <PokeListContext.Provider
      value={{
        pokemonList: pokemonList,
        pokemonData: pokemonData,
        nextPage: nextPage,
        isLoading: isLoading,
        loadData: loadData,
        getSelectedPokemon: getSelectedPokemon,
        getPokemonfromSearch: getPokemonfromSearch,
      }}
    >
      {props.children}
    </PokeListContext.Provider>
  );
};

export default PokeListContext;
