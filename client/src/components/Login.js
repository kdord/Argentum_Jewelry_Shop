import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
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
      });
  }

  render() {
    return (
      <div className='container mt-5'>
        <form onSubmit={this.handleSubmit} className='px-5'>
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
      </div>
    );
  }
}
