import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './components/LandingPage';
import CreateJewelry from './components/CreateJewelry';
import Navbar from './components/Navbar';
import Catalog from './components/Catalog';
import ShowJewelry from './components/ShowJewelry';
import EditJewelry from './components/EditJewelry';

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
            <Route path={'/catalog/:id'} component={ShowJewelry} />
            <Route path={'/update/:id'} component={EditJewelry} />
          </Switch>
        </div>
      </Router>
    );
  }
}
