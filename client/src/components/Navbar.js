import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/css/NavbarStyle.css';

export default class Navbar extends Component {
  render() {
    return (
      <nav className='navbar '>
        <div className='container  '>
          <ul className='nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/catalog'>
                Каталог
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/catalog/rings'>
                Каблучки
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/catalog/earrings'>
                Сережки
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/catalog/necklaces'>
                Підвіски
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/catalog/bracelets'>
                Браслети
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
