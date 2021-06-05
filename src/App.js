import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';


import Header from './components/Header/Header';
import CardPage from './components/CardPage/CardPage';
import Footer from './components/Footer/Footer';
import PokemonSearch from './components/PokemonSearch/PokemonSearch';
import PokemonPage from './components/PokemonPage/PokemonPage';

function App() {
  return (
    <Router>
      <Header />
      <PokemonSearch />
        <Switch>
          <Route exact path="/">
            <CardPage />
          </Route>
          <Route path="/pokemon/:id">
            <PokemonPage />
          </Route>
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
