import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

import PokeListContext from '../../store/PokeListContext';
import classes from './PokemonSearch.module.css';

const PokemonSearch = () => {
  const [searchForm, setSearchForm] = useState({
    generation: null,
    pokemon: null,
  });
  const pokeCtx = useContext(PokeListContext);
  const history = useHistory();

  const searchForPokemon = (e, searchData) => {
    e.preventDefault();
    pokeCtx.getPokemonfromSearch(searchData);
    history.push('/')
  };

  const onChangeHandler = (event, target) => {
    let value = event.target.value;
    if (target) {
      value = value.toLowerCase();
    }
    setSearchForm({ ...searchForm, [target]: value });
  };

  return (
    <React.Fragment>
      <div className={classes.PokemonSearchFlex}>
        <form onSubmit={(e) => searchForPokemon(e, searchForm)}>
          <div className={classes.SearchBarContainer}>
            <input
              className={classes.SearchBarInput}
              placeholder="Search for Pokemon!"
              onChange={(e) => onChangeHandler(e, 'pokemon')}
            ></input>
            <button className={classes.SearchBarButton} type="submit">
              <FiSearch />
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PokemonSearch;
