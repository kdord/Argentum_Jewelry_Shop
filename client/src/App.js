import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './components/LandingPage';
import CreateJewelry from './components/CreateJewelry';
import Navbar from './components/Navbar';
import Catalog from './components/Catalog';
import ShowJewelry from './components/ShowJewelry';
import EditJewelry from './components/EditJewelry';

import './style/css/AppStyle.css';
import Header from './components/Header';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='app-root'>
          <Header />
          <Navbar />

          <Switch>
            <Route exact path={'/'} component={LandingPage} />
            <Route exact path={'/create'} component={CreateJewelry} />
            <Route
              exact
              path={'/catalog'}
              render={props => <Catalog {...props} jewelryType={'ring'} />}
            />

            <Route exact path={'/catalog/:id'} component={ShowJewelry} />
            <Route exact path={'/update/:id'} component={EditJewelry} />
          </Switch>
        </div>
      </Router>
    );
  }
}
