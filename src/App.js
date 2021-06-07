import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';


import Header from './components/Header/Header';
import CardPage from './components/CardPage/CardPage';
import Footer from './components/Footer/Footer';
import PokemonSearch from './components/PokemonSearch/PokemonSearch';
import PokemonPage from './components/PokemonPage/PokemonPage';
import ScrollToTop from './wrappers/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop>
      <Header />
      <PokemonSearch />
        <Switch>
          <Route exact path="/">
            <CardPage />
          </Route>
          <Route exact path="/pokemon/:id">
            <PokemonPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      <Footer />
      </ScrollToTop>
      
    </Router>
  );
}

export default App;
