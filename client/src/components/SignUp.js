import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import '../style/css/SignUpStyle.css';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      basket: [],
      modalShow: false,
      modalMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ password: '', confirmPassword: '' });

      return alert('Паролі не співпадають. Повторіть будь ласка введення');
    }
    console.log('signup form, email: ');
    console.log(this.state.email);

    //request to server
    axios
      .post('/user/signup', {
        username: this.state.username,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        basket: this.state.basket
      })
      .then(res => {
        if (res.data.error) {
          this.setState({ modalMessage: res.data.error, modalShow: true });
        } else {
          this.props.history.push('/login');
        }
      })
      .catch(err => {
        console.log('sign up server error');
        console.log(err);
      });
  }
  handleOpen() {
    this.setState({ modalShow: true });
  }
  handleClose() {
    this.setState({ modalShow: false });
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit} className='signUp-form'>
          <div className='form-group'>
            <input
              className='form-control'
              type='username'
              name='username'
              value={this.state.username}
              placeholder='Логін'
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='email'
              name='email'
              value={this.state.email}
              placeholder='Адреса електронної пошти'
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              name='firstName'
              value={this.state.firstName}
              placeholder="Ім'я"
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              name='lastName'
              value={this.state.lastName}
              placeholder='Прізвище'
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              name='password'
              value={this.state.password}
              placeholder='Пароль'
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              name='confirmPassword'
              value={this.state.confirmPassword}
              placeholder='Підтвердіть пароль'
              onChange={this.handleChange}
            />
          </div>
          <button className='btn btn-secondary' type='submit'>
            Зареєструватись
          </button>
        </form>

        <Modal show={this.state.modalShow} className='modal'>
          <Modal.Header>
            <Button
              className='modal-header-btn'
              onClick={this.handleClose}
              variant='light'
            >
              <IoMdClose />
            </Button>
          </Modal.Header>
          <Modal.Body>{this.state.modalMessage}</Modal.Body>
        </Modal>
      </div>
    );
  }
}
