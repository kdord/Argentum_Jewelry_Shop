import React, { Component } from 'react';
import logo from '../images/logoNew.png';
import instaLogo from '../images/logoInstagram.png';
import fbLogo from '../images/fbLogo.png';
import '../style/css/HeaderStyle.css';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const instaURL = 'https://www.instagram.com/argentum_jewelry_shop/';
    const fbURL = 'https://www.facebook.com/argentumjewelry47/';
    return (
      <div className='header'>
        <div className='header-top'>
          <a href={instaURL}>
            <img alt='instaLogo' src={instaLogo} />
          </a>
          <a href={fbURL}>
            <img alt='fbLogo' src={fbLogo} />
          </a>
        </div>
        <div className='header-bottom'>
          <Link to='/'>
            <img alt='logo' src={logo} className='logo' />
          </Link>
        </div>
      </div>
    );
  }
}
