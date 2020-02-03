import React, { Component } from 'react';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      login: '',
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
    console.log('signup form, email: ');
    console.log(this.state.email);
  }

  render() {
    return (
      <div className='container mt-5'>
        <form onSubmit={this.handleSubmit} className='px-5'>
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
              type='login'
              name='login'
              value={this.state.login}
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
            Зареєструватись
          </button>
        </form>
      </div>
    );
  }
}
