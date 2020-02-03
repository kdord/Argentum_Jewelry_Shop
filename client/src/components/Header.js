import React, { Component } from 'react';
import logo from '../images/logoNew.png';
import instaLogo from '../images/logoInstagram.png';
import fbLogo from '../images/fbLogo.png';
import '../style/css/HeaderStyle.css';
import { Link } from 'react-router-dom';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

class LoginModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
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
              <Form.Control
                name='email'
                type='email'
                placeholder='Enter your email'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                name='password'
                type='password'
                placeholder='Enter your password'
              />
            </Form.Group>
            <Button variant='secondary' type='submit'>
              Увійти
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
class SignUpModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Реєстрація
          </Modal.Title>
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
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalLoginShow: false,
      modalSignUpShow: false
    };
    this.handleToggleLogin = this.handleToggleLogin.bind(this);
    this.handleToggleSignUp = this.handleToggleSignUp.bind(this);
  }

  handleToggleLogin() {
    this.setState({
      modalLoginShow: !this.state.modalLoginShow
    });
  }
  handleToggleSignUp() {
    this.setState({
      modalSignUpShow: !this.state.modalSignUpShow
    });
  }

  render() {
    const instaURL = 'https://www.instagram.com/argentum_jewelry_shop/';
    const fbURL = 'https://www.facebook.com/argentumjewelry47/';
    const { modalLoginShow, modalSignUpShow } = this.state;
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
                <Dropdown.Item onClick={this.handleToggleLogin}>
                  Login
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleToggleSignUp}>
                  Sign Up
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <LoginModal show={modalLoginShow} onHide={this.handleToggleLogin} />
            <SignUpModal
              show={modalSignUpShow}
              onHide={this.handleToggleSignUp}
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
}

export default Header;
