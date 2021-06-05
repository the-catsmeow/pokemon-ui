import React, { useState, useEffect } from 'react';

const PokeListContext = React.createContext({
  pokemonList: [],
  pokemon: {},
  nextPage: null,
  isLoading: true,
  loadMoreData: () => {},
  getPokemonfromSearch: () => {},
  setSelectedPokemon: () => {},
});

export const PokeListContextProvider = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [nextPage, setNextPage] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=50'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData()
  }, []);

  const loadData = (dataPage = 'https://pokeapi.co/api/v2/pokemon?limit=50') => {
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
  }

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
      loadData()
    }
  };

  const setSelectedPokemon = (pokemonObj) => {
    setPokemon(pokemonObj);
  };

  return (
    <PokeListContext.Provider
      value={{
        pokemonList: pokemonList,
        pokemon: pokemon,
        nextPage: nextPage,
        isLoading: isLoading,
        loadMoreData: loadMoreData,
        getPokemonfromSearch: getPokemonfromSearch,
        setSelectedPokemon: setSelectedPokemon,
      }}
    >
      {props.children}
    </PokeListContext.Provider>
  );
};

export default PokeListContext;
