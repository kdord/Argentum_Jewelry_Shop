import React, { Component } from 'react';
import logo from '../images/logoNew.png';
import instaLogo from '../images/logoInstagram.png';
import fbLogo from '../images/fbLogo.png';
import { Link } from 'react-router-dom';
import '../style/css/FooterStyle.css';

export default class Footer extends Component {
  render() {
    const instaURL = 'https://www.instagram.com/argentum_jewelry_shop/';
    const fbURL = 'https://www.facebook.com/argentumjewelry47/';

    return (
      <footer className='footer'>
        <div className='footer-left'>
          <img alt='logo' src={logo} />
          <div className='insta-fb-icons'>
            <a href='#'>
              <img alt='instaLogo' src={instaLogo} />
            </a>
            <a href='#'>
              <img alt='fbLogo' src={fbLogo} />
            </a>
          </div>
          <div className='email'>
            <p>argentum.jewelry.shop@gmail.com</p>
          </div>
        </div>
        <div className='footer-center'>
          <Link to='/delivery' className='deliveryAndPayLink'>
            Доставка та Оплата
          </Link>
          <div className='schedule'>
            <h4>Графік роботи:</h4>
            <p>
              <strong>ПН-ПТ</strong> з 9:00 до 20:00
            </p>
            <p>
              <strong>СБ</strong> з 10:00 до 18:00
            </p>
            <p>
              <strong>НД</strong> з 10:00 до 16:00
            </p>
          </div>
        </div>
        <div className='footer-right'>
          <Link to='/catalog'>Каталог</Link>
          <Link to='/catalog/rings'>Каблучки</Link>
          <Link to='/catalog/earrings'>Сережки</Link>
          <Link to='/catalog/necklaces'>Підвіски</Link>
          <Link to='/catalog/bracelets'>Браслети</Link>
        </div>
      </footer>
    );
  }
}
