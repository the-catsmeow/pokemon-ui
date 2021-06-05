import React, { useContext } from 'react';

import classes from './PokemonPage.module.css';
import PokeListContext from '../../store/PokeListContext';

const PokemonPage = () => {
  const pokeCtx = useContext(PokeListContext);

  return (
    <div className={classes.PokemonPage}>
      <div className={classes.InfoFlex}>
        <div className={classes.PokeImgContainer}>
          <img
            className={classes.PokeImg}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/395.png"
            alt="Empoleon"
          />
        </div>
          <div className={classes.DetailInfo}>
            <div className={classes.PokemonName}>Empoleon</div>
            <div className={classes.TypeContainer}>
              <div className={classes.Type}>Water</div>
              <div className={classes.Type}>Steel</div>
            </div>
            <div className={classes.DescriptionFlex}>
              <span>Description</span>
              <p>
                The three horns that extend from its beak attest to its power.
                The leader has the biggest horns.
              </p>
            </div>
            <span>Game Introduction</span>
            <span className={classes.GamesFlex}>
              <span>Diamond</span>
              <span>Pearl</span>
              <span>Platinum</span>
              <span>Heartgold</span>
              <span>SoulSilver</span>
            </span>
          </div>
      </div>
      <div className={classes.EvolutionChainFlex}></div>
    </div>
  );
};

export default PokemonPage;
