import React from 'react';
import classes from './PokemonDetails.module.css';
import { getPokemonTypeColor, getGameColor } from '../../../utility/utility';

const PokemonDetails = ({ pokemon, versionsIntroduced }) => {
  return (
    <div className={classes.DetailInfo}>
      <div className={classes.PokemonName}>{pokemon.name}</div>
      <div className={classes.TypeContainer}>
        {pokemon.types.map((typeObj, idx) => {
          return (
            <div
              className={classes.Type}
              style={getPokemonTypeColor(
                'light',
                pokemon.types.slice(idx, idx + 1)
              )}
              key={idx}
            >
              {typeObj.type.name}
            </div>
          );
        })}
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
          <span>{pokemon.id}</span>
          <span>HP</span>
          <span>
            {
              pokemon.stats.find((statObj) => {
                return statObj.stat.name === 'hp';
              }).base_stat
            }
          </span>
          <span>Height</span>
          <span>{+pokemon.height / 10 + 'm'}</span>
          <span>Weight</span>
          <span>{+pokemon.weight / 10 + 'kg'}</span>
          <span>Base Experience</span>
          <span>{pokemon.base_experience}</span>
          <span>Attack</span>
          <span>
            {
              pokemon.stats.find((statObj) => {
                return statObj.stat.name === 'attack';
              }).base_stat
            }
          </span>
          <span>Defense</span>
          <span>
            {
              pokemon.stats.find((statObj) => {
                return statObj.stat.name === 'defense';
              }).base_stat
            }
          </span>
          <span>Special Attack</span>
          <span>
            {
              pokemon.stats.find((statObj) => {
                return statObj.stat.name === 'special-attack';
              }).base_stat
            }
          </span>
          <span>Special Defense</span>
          <span>
            {
              pokemon.stats.find((statObj) => {
                return statObj.stat.name === 'special-defense';
              }).base_stat
            }
          </span>
          <span>Speed</span>
          <span>
            {
              pokemon.stats.find((statObj) => {
                return statObj.stat.name === 'speed';
              }).base_stat
            }
          </span>
        </div>
      </div>
      <div className={classes.GamesFlexContainer}>
        <span>Game Introduction</span>
        <div className={classes.GamesFlex}>
          {versionsIntroduced.map((version, idx) => {
            console.log(versionsIntroduced)
            return <span key={idx} style={{background: getGameColor(version.name)}}>{version.name}</span>
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
