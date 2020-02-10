import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/css/NavbarDevStyle.css';

export default class NavbarDev extends Component {
  render() {
    return (
      <div className='navbarDev'>
        <nav className='navbar '>
          <div className='container justify-content-center'>
            <ul className='nav justify-content-center'>
              <li className='nav-item'>
                <Link className='nav-link' to='/create'>
                  Create Jewelry Card
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
