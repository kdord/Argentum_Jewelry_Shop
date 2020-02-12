import React, { Component } from 'react';
import logo from '../images/logoNew.png';
import instaLogo from '../images/logoInstagram.png';
import fbLogo from '../images/fbLogo.png';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaUserCheck } from 'react-icons/fa';
import '../style/css/HeaderStyle.css';

import axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchC: ''
    };

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
            user: null
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
    const { user } = this.props;
    console.log(this.props);
    return (
      <div className='header'>
        <div className='header-top'>
          <div className='header-left'>
            <div className='insta-fb-icons'>
              <a href={instaURL}>
                <img alt='instaLogo' src={instaLogo} />
              </a>
              <a href={fbURL}>
                <img alt='fbLogo' src={fbLogo} />
              </a>
            </div>
          </div>
          <div className='auth d-flex'>
            <Dropdown drop={'left'}>
              <Dropdown.Toggle
                variant='light'
                className='auth-dropdown e-caret-hide'
              >
                {user ? (
                  <FaUserCheck className='dropUserIcon' />
                ) : (
                  <FaUser className='dropUserIcon' />
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {!user && (
                  <>
                    <Dropdown.Item href='/login'>Увійти</Dropdown.Item>
                    <Dropdown.Item href='/signup'>
                      Зареєструватись
                    </Dropdown.Item>
                  </>
                )}
                {user && (
                  <>
                    <Dropdown.Item disabled>
                      {user.firstName} {user.lastName}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.logout}>Вийти</Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
            {user && (
              <Link
                to={`/basket/${user._id}`}
                className='shopingBasket'
                // style={{ color: 'black' }}
              >
                <FaShoppingCart />
              </Link>
            )}
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
