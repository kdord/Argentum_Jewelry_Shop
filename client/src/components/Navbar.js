import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/css/NavbarStyle.css';

export default class Navbar extends Component {
  render() {
    return (
      <nav className='navbar '>
        <div className='container justify-content-center'>
          <ul className='nav justify-content-center'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/catalog'>
                Catalog
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/create'>
                Create Jewelry Card
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
