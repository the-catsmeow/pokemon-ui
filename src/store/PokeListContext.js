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

  const getSelectedPokemon = useCallback(async (id) => {
    setIsLoading(true);

    let pokemonData = {
      pokemon: {},
      species: {},
      versions_introduced: [],
      evolution_chain: {},
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
    let evolutionChain = await evolutionChainResponse.json();

    pokemonData.evolution_chain = evolutionChain;

    let generationResponse = await fetch(species.generation.url);
    let generation = await generationResponse.json();

    let versions = [];

    Promise.allSettled(
      generation.version_groups.map(async (version_group, idx) => {
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
        console.log('here');
        setIsLoading(false);
      });
  }, []);

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
