import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './components/LandingPage';
import CreateJewelry from './components/CreateJewelry';
import Navbar from './components/Navbar';
import NavbarDev from './components/NavbarDev';
import Catalog from './components/Catalog';
import ShowJewelry from './components/ShowJewelry';
import EditJewelry from './components/EditJewelry';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';

import axios from 'axios';

import './style/css/AppStyle.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: null
    };
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
    console.log(userObject);
  }

  getUser() {
    axios.get('/user/').then(res => {
      console.log('Get user response: ');
      console.log(res.data);
      if (res.data.user) {
        console.log('Get user: there is a user saved in the server session');
        this.setState({ loggedIn: true, user: res.data.user });
      } else {
        console.log('Get user: no user');
        this.setState({ loggedIn: false, user: null });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className='app-root'>
          <Header user={this.state.user} updateUser={this.updateUser} />
          <NavbarDev />
          <Navbar />
          <Switch>
            <Route exact path={'/'} component={LandingPage} />
            <Route exact path={'/create'} component={CreateJewelry} />
            <Route
              exact
              path={'/catalog'}
              render={props => <Catalog {...props} jewelryType={'all'} />}
            />
            <Route
              exact
              path={'/catalog/rings'}
              render={props => <Catalog {...props} jewelryType={'ring'} />}
            />
            <Route
              exact
              path={'/catalog/earrings'}
              render={props => <Catalog {...props} jewelryType={'earrings'} />}
            />
            <Route
              exact
              path={'/catalog/bracelets'}
              render={props => <Catalog {...props} jewelryType={'bracelete'} />}
            />
            <Route
              exact
              path={'/catalog/necklaces'}
              render={props => <Catalog {...props} jewelryType={'necklace'} />}
            />
            <Route
              exact
              path='/login'
              render={props => (
                <Login {...props} updateUser={this.updateUser} />
              )}
            />
            <Route
              exact
              path='/signup'
              render={props => <SignUp {...props} />}
            />

            <Route exact path={'/catalog/:id'} component={ShowJewelry} />
            <Route exact path={'/update/:id'} component={EditJewelry} />
          </Switch>
        </div>
      </Router>
    );
  }
}
