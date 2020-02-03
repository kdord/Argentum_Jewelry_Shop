import React, { Component } from 'react';
import logo from '../images/logoNew.png';
import instaLogo from '../images/logoInstagram.png';
import fbLogo from '../images/fbLogo.png';
import '../style/css/HeaderStyle.css';
import { Link } from 'react-router-dom';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

function LoginModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Увійти</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Адреса електронної пошти</Form.Label>
            <Form.Control type='email' placeholder='Enter your email' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Пароль</Form.Label>
            <Form.Control type='password' placeholder='Enter your password' />
          </Form.Group>
          <Button variant='secondary' type='submit'>
            Увійти
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
function SignUpModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Реєстрація</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Ім'я та прізвище</Form.Label>
            <Form.Control type='text' placeholder='Enter your name' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Адреса електронної пошти</Form.Label>
            <Form.Control type='email' placeholder='Enter your email' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Пароль</Form.Label>
            <Form.Control type='password' placeholder='Enter your password' />
          </Form.Group>
          <Button variant='secondary' type='submit'>
            Реєстрація
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function Header() {
  const instaURL = 'https://www.instagram.com/argentum_jewelry_shop/';
  const fbURL = 'https://www.facebook.com/argentumjewelry47/';
  const [modalLoginShow, setModalLoginShow] = React.useState(false);
  const [modalSignUpShow, setModalSignUpShow] = React.useState(false);
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
              <Dropdown.Item onClick={() => setModalLoginShow(true)}>
                Login
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setModalSignUpShow(true)}>
                Sign Up
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <LoginModal
            show={modalLoginShow}
            onHide={() => setModalLoginShow(false)}
          />
          <SignUpModal
            show={modalSignUpShow}
            onHide={() => setModalSignUpShow(false)}
          />
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

export default Header;
