import React from 'react';
import classes from './StatBar.module.css';

const StatBar = ({ statObj }) => {

  const convertStatToWidth = (stat) => {
    if (stat * 1.5 >= 150) {
      return 150;
    }
    return stat * 1.5;
  };

  const convertName = (statName) => {
    switch (statName) {
      case 'attack':
        return 'Attack';
      case 'defense':
        return 'Defense';
      case 'hp':
        return 'HP';
      case 'speed':
        return 'Speed';
      case 'special-attack':
        return 'Special Attack';
      case 'special-defense':
        return 'Special Defense';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={classes.StatBarFlex}>
      <span>{convertName(statObj['stat'].name)}</span>
      <div className={classes.StatBarContainer}>
        <div
          className={classes.StatBar}
          style={{ width: convertStatToWidth(statObj['base_stat']) + 'px', zIndex: '2' }}
        ></div>
        {/* <div className={classes.StatBarMarker}></div>
        <div className={classes.StatBarMarker}></div>
        <div className={classes.StatBarMarker}></div> */}
      </div>
      <span>{statObj['base_stat']}</span>
    </div>
  );
};

export default StatBar;
