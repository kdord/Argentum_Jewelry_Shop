import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './components/LandingPage';
import CreateJewelry from './components/CreateJewelry';
import Navbar from './components/Navbar';
import Catalog from './components/Catalog';
import JewelryShowPage from './components/JewelryShowPage';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route exact path='/create'>
              <CreateJewelry />
            </Route>
            <Route exact path='/catalog'>
              <Catalog />
            </Route>
            <Route path={'/catalog/:id'} component={JewelryShowPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
