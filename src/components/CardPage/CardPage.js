import React, { useContext, useRef, useEffect, useState } from 'react';
import PokeListContext from '../../store/PokeListContext';
import Card from '../Card/Card';
import classes from './CardPage.module.css';

const CardPage = () => {
  const { loadData, nextPage, isLoading, pokemonList } =
    useContext(PokeListContext);
  const contentRef = useRef(null);
  const [loadingMoreData, setloadingMoreData] = useState(false);

  const isBottom = (ref) => {
    if (!ref.current) {
      return false;
    }
    if (ref.current.getBoundingClientRect().bottom <= window.innerHeight) {
      return true;
    }
  };

  useEffect(() => {
    async function fetchData() {
      setloadingMoreData(true);
      await loadData(nextPage);
      setloadingMoreData(false);
    }
    const onScroll = () => {
      isBottom(contentRef);

      if (!isLoading && isBottom(contentRef)) {
        fetchData();
      }
    };
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [isLoading, loadData, nextPage]);

  return (
    <React.Fragment>
      <div className={classes.CardPage} ref={contentRef}>
        {!isLoading || pokemonList.length !== 0 ? (
          <React.Fragment>
            {pokemonList.map((pokemon, idx) => {
              return <Card pokemon={pokemon.pokeData} key={idx} />;
            })}
          </React.Fragment>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {loadingMoreData ? (
        <h2 style={{ display: 'block', fontWeight: '400' }}>
          Loading more pokemon!
        </h2>
      ) : null}
    </React.Fragment>
  );
};

export default CardPage;
