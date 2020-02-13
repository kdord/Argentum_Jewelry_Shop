import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import '../style/css/LoginStyle.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      modalShow: false
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
    console.log('login form, username: ');
    console.log(this.state.username);

    axios
      .post('/user/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log('login responce');
        console.log(res);
        if (res.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            user: res.data
          });
          console.log(res.data);
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.log('login error: ');
        console.log(err);
        this.setState({ modalShow: true });
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
      <div className='container '>
        <form onSubmit={this.handleSubmit} className='login-form'>
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
              type='password'
              name='password'
              value={this.state.password}
              placeholder='Пароль'
              onChange={this.handleChange}
            />
          </div>
          <button className='btn btn-secondary' type='submit'>
            Увійти
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
          <Modal.Body>
            Невалідний логін або пароль. Перевірте будь ласка правильність
            введених даних.
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
