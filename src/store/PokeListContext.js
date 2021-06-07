import React, { useState, useEffect, useCallback } from 'react';

const PokeListContext = React.createContext({
  pokemonList: [],
  pokemonData: {},
  nextPage: null,
  isLoading: true,
  loadMoreData: () => {},
  getSelectedPokemon: () => {},
  getPokemonfromSearch: () => {},
  setSelectedPokemon: () => {},
});

export const PokeListContextProvider = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonData, setPokemonData] = useState({});
  const [nextPage, setNextPage] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=50'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = (
    dataPage = 'https://pokeapi.co/api/v2/pokemon?limit=50'
  ) => {
    setIsLoading(true);

    let pokemonDataArr = [];
    fetch(dataPage).then((response) =>
      response.json().then((data) => {
        data.results.forEach((pokemon, idx) => {
          fetch(pokemon.url).then((resp) =>
            resp.json().then((pokeData) => {
              pokemonDataArr.push({ pokemon: pokemon, pokeData: pokeData });
              if (idx === data.results.length - 1) {
                pokemonDataArr = pokemonDataArr.sort((a, b) =>
                  +a.pokeData.id > +b.pokeData.id ? 1 : -1
                );
                setPokemonList((prevState) => {
                  return [...prevState, ...pokemonDataArr];
                });
              }
            })
          );
        });
        setNextPage(data.next);
        setIsLoading(false);
      })
    );
  };

  const loadMoreData = () => {
    loadData(nextPage);
  };

  const getPokemonfromSearch = (searchForm) => {
    setIsLoading(true);
    setPokemonList([]);
    setNextPage(null);

    if (searchForm.pokemon !== null && searchForm.pokemon !== '') {
      fetch('https://pokeapi.co/api/v2/pokemon/' + searchForm.pokemon).then(
        (response) =>
          response.json().then((data) => {
            if (data) {
              console.log(data);
              setPokemonList([
                {
                  pokeData: data,
                  url:
                    'https://pokeapi.co/api/v2/pokemon/' + searchForm.pokemon,
                },
              ]);
            }
            setIsLoading(false);
          })
      );
    } else {
      loadData();
    }
  };

  const setSelectedPokemon = (pokemonObj) => {
    setPokemonData(pokemonObj);
    fetch(pokemonObj.species.url).then((response) =>
      response.json().then((data) => console.log(data))
    );
  };

  const getSelectedPokemon = useCallback(async (id) => {
    setIsLoading(true);

    let pokemonData = {
      pokemon: {},
      species: {},
      versions_introduced: [],
      evolution_chain: {},
    };

    let pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    let pokemon = await pokemonResponse.json();
    
    pokemonData.pokemon = pokemon;

    let speciesResponse = await fetch(pokemon.species.url);
    let species = await speciesResponse.json();

    pokemonData.species = species;

    let evolutionChainResponse = await fetch(species.evolution_chain.url)
    let evolutionChain = await evolutionChainResponse.json();

    pokemonData.evolution_chain = evolutionChain;

    let generationResponse = await fetch(species.generation.url);
    let generation = await generationResponse.json();

    let versions = []

    Promise.allSettled(generation.version_groups.map(async (version_group, idx) => {
      let versionsResponse = await fetch(version_group.url);
      let versionsObj = await versionsResponse.json();
      versions.push(...versionsObj.versions)
    })).then(() => {
      pokemonData.versions_introduced = versions;
      setPokemonData(pokemonData);
    })

  
  }, []);

  return (
    <PokeListContext.Provider
      value={{
        pokemonList: pokemonList,
        pokemonData: pokemonData,
        nextPage: nextPage,
        isLoading: isLoading,
        loadMoreData: loadMoreData,
        getSelectedPokemon: getSelectedPokemon,
        getPokemonfromSearch: getPokemonfromSearch,
        setSelectedPokemon: setSelectedPokemon,
      }}
    >
      {props.children}
    </PokeListContext.Provider>
  );
};

export default PokeListContext;
