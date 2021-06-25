import React from 'react';
import classes from './PokemonEvolutionChain.module.css'

const PokemonEvolutionChain = ({ pokeName, evolutionChain }) => {

  console.log(pokeName)
  return (
    <div className={classes.EvolutionChainFlexContainer}>
        <span className={classes.EvolutionChainHeader}>Evolution Chain</span>
        <div className={classes.EvolutionChainFlex}>
        {evolutionChain.map((pokemon, idx) => {
          let evolutionChainPictureContainerStyles = classes.EvolutionChainPictureContainer

          if(pokemon.name === pokeName) {
            evolutionChainPictureContainerStyles = classes.CurrentPokemonPictureContainer
          }


          return (
            <div className={classes.EvolutionChainItem} key={idx}>
            <div className={evolutionChainPictureContainerStyles}>
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className={classes.EvolutionChainPicture}
              ></img>
            </div>
            <span>{pokemon.name}</span>
          </div>
          )
        })}
          {/* <div className={classes.EvolutionChainItem}>
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
          </div> */}
        </div>
      </div>
  )
}

export default PokemonEvolutionChain;