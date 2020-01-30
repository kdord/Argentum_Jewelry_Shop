import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-dark bg-dark'>
        <Link to='/'>Home</Link>
        <Link to='/catalog'>Catalog</Link>
        <Link to='/create'>Create Jewelry Card</Link>
      </nav>
    );
  }
}
