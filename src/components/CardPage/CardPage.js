import React, { useContext, useRef, useEffect, useState } from 'react';
import PokeListContext from '../../store/PokeListContext';
import Card from '../Card/Card';
import classes from './CardPage.module.css';

const CardPage = (props) => {
  const pokeCtx = useContext(PokeListContext);
  const contentRef = useRef(null);
  const [atBottom, setAtBottom] = useState(false);

  const isBottom = (ref) => {
    if (!ref.current) {
      return false;
    }
    if (ref.current.getBoundingClientRect().bottom <= window.innerHeight) {
      setAtBottom(true);
    }
  };

  useEffect(() => {
    
    const onScroll = () => {
      isBottom(contentRef);

      if (!pokeCtx.isLoading && atBottom) {
        setAtBottom(false);
        pokeCtx.loadMoreData()
      }
    };
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [pokeCtx, atBottom]);

  return (
    <div className={classes.CardPage} ref={contentRef}>
      <React.Fragment>
        {pokeCtx.pokemonList.map((pokemon, idx) => {
          return <Card pokemon={pokemon.pokeData} setSelectedPokemon={ () => pokeCtx.setSelectedPokemon(pokemon.pokeData)} key={idx} />;
        })}
      </React.Fragment>
    </div>
  );
};

export default CardPage;
