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
            <span className={classes.DescriptionHeader}>Description</span>
            <span>
              The three horns that extend from its beak attest to its power. The
              leader has the biggest horns.
            </span>
          </div>
          <div className={classes.AttributesFlex}>
            <div className={classes.AttributesGrid}>
              <span>ID</span>
              <span>395</span>
              <span>Height</span>
              <span>6ft</span>
              <span>Weight</span>
              <span>181 lbs</span>
              <span>Base Experience</span>
              <span>178</span>
              <span>HP</span>
              <span>120</span>
              <span>Attack</span>
              <span>80</span>
              <span>Defense</span>
              <span>75</span>
              <span>Special Attack</span>
              <span>60</span>
              <span>Special Defense</span>
              <span>75</span>
              <span>Speed</span>
              <span>65</span>
            </div>
          </div>
          <div className={classes.GamesFlexContainer}>
            <span>Game Introduction</span>
            <div className={classes.GamesFlex}>
              <span>Diamond</span>
              <span>Pearl</span>
              <span>Platinum</span>
              <span>Heartgold</span>
              <span>SoulSilver</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.EvolutionChainFlexContainer}>
        <span className={classes.EvolutionChainHeader}>Evolution Chain</span>
        <div className={classes.EvolutionChainFlex}>
          <div className={classes.EvolutionChainItem}>
            <div className={classes.EvolutionChainPictureContainer}>
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png"
                alt="piplup"
                className={classes.EvolutionChainPicture}
              ></img>
            </div>
            <span>Piplup</span>
          </div>
          <div className={classes.EvolutionChainItem}>
            <div className={classes.EvolutionChainPictureContainer}>
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/394.png"
                alt="piplup"
                className={classes.EvolutionChainPicture}
              ></img>
            </div>
            <span>Prinplup</span>
          </div>
          <div className={classes.EvolutionChainItem}>
            <div className={classes.EvolutionChainPictureContainer}>
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/395.png"
                alt="piplup"
                className={classes.EvolutionChainPicture}
              ></img>
            </div>
            <span>Empoleon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
