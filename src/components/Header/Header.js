import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import PokeDexLogo from '../../assets/Pokedex.png';

const Header = () => {
  //TODO: onClick logo, fetch first page of data again

  return (
    <header className={classes.Header}>
      <Link to="/">
        <img
          className={classes.PokeDexLogo}
          src={PokeDexLogo}
          alt="PokeDex Logo"
        ></img>
      </Link>
    </header>
  );
};

export default Header;
