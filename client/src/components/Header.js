import React, { Component } from 'react';
import logo from '../images/logoNew.png';
import instaLogo from '../images/logoInstagram.png';
import fbLogo from '../images/fbLogo.png';
import '../style/css/HeaderStyle.css';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

import axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }
  logout(e) {
    e.preventDefault();
    console.log('/user/logout');
    axios
      .post('/user/logout')
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          });
        }
      })
      .catch(err => {
        console.log('logout error');
      });
  }

  render() {
    const instaURL = 'https://www.instagram.com/argentum_jewelry_shop/';
    const fbURL = 'https://www.facebook.com/argentumjewelry47/';
    const { username } = this.props;
    console.log(this.props);
    return (
      <div className='header'>
        <div className='header-top'>
          <div className='insta-fb-icons'>
            <a href={instaURL}>
              <img alt='instaLogo' src={instaLogo} />
            </a>
            <a href={fbURL}>
              <img alt='fbLogo' src={fbLogo} />
            </a>
          </div>
          <div className='auth'>
            <Dropdown drop={'left'}>
              <Dropdown.Toggle variant='light' className='auth-dropdown'>
                <FaUser />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='/login'>Login</Dropdown.Item>
                <Dropdown.Item href='/signup'>Sign Up</Dropdown.Item>
                <Dropdown.Item onClick={this.logout}>LogOut</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {username ? <p>{username}</p> : ''}
          </div>
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

export default Header;
