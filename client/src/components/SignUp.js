import React, { Component } from 'react';
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
      basket: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(res);
        if (res.data) {
          console.log(res.data);
        } else {
          console.log('signup error');
        }
        this.props.history.push('/login');
      })
      .catch(err => {
        console.log('sign up server error');
        console.log(err);
      });
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
      </div>
    );
  }
}
