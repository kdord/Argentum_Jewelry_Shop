import React, { Component } from 'react';
import axios from 'axios';
import BasketsItem from './BasketsItem';
import { MdPhoto } from 'react-icons/md';
import '../style/css/BasketStyle.css';
import { Link } from 'react-router-dom';
import { FaEraser } from 'react-icons/fa';

export default class Basket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basket: [],
      user: {},
      phoneNumber: '',
      region: '',
      city: '',
      postOfficeNumber: '',
      paymentMethod: ''
    };
    this.initialization = this.initialization.bind(this);
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpdateAmount = this.handleUpdateAmount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
    this.initialization();
  }

  initialization() {
    axios.get('/user/').then(res => {
      //   console.log('Get user response: ');
      //   console.log(res.data);
      if (res.data.user) {
        console.log('Get user in basket');
        this.setState({ basket: res.data.user.basket, user: res.data.user });
      } else {
        console.log('Get user in basket: no user');
        this.setState({ basket: null });
      }
    });
  }

  toPay(amount, price) {
    let newSum = this.state.toPay + amount * price;
    this.setState({ toPay: newSum });
  }

  calculateTotalPrice = () => {
    let amount = 0;
    this.state.basket.forEach(jewelry => {
      amount += jewelry.amount * jewelry.jewelry_price;
    });
    return amount;
  };

  basketJewelryList = () => {
    return this.state.basket.map((jewelry, index) => {
      return (
        <BasketsItem
          jewelry={jewelry}
          key={index}
          handleRemove={this.handleRemove}
          changeAmountInDB={this.handleUpdateAmount}
        />
      );
    });
  };

  handleRemove(id) {
    console.log('in handleRemove, id:');
    console.log(id);
    console.log('in handleRemove, userID:');
    console.log(this.props.match.params.id);
    let userId = this.props.match.params.id;
    axios
      .post('/user/' + userId + '/delete/' + id)
      .then(res => {
        // this.initialization();
        console.log('item removed');
      })
      .catch(err => {
        console.log('Error: ');
        console.log(err);
      });
    window.location.reload();
  }

  handleUpdateAmount(amount, id) {
    console.log('Amount update: ');
    console.log(amount);
    console.log('Id:');
    console.log(id);
    let userId = this.props.match.params.id;
    const newAmount = { amount: amount };
    axios
      .post('/user/' + userId + '/update/' + id, newAmount)
      .then(res => {
        console.log('amount updated');
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
    window.location.reload();
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value });
  }
  handleSend() {
    let email = {
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      email: this.state.user.email,
      basket: [],
      phoneNumber: this.state.phoneNumber,
      region: this.state.region,
      city: this.state.city,
      postOfficeNumber: this.state.postOfficeNumber,
      paymentMethod: this.state.paymentMethod
    };
    this.state.basket.forEach(item => {
      let basketItem = {
        name: item.jewelry_name,
        amount: item.amount
      };
      email.basket.push(basketItem);
    });
    axios
      .post('/user/send', email)
      .then(res => {
        console.log('in .then send request');
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  render() {
    const toPay = this.calculateTotalPrice();
    const { user } = this.state;

    return (
      <div>
        <div className='basket-container'>
          <h2>Корзина</h2>
          <table className='table'>
            <thead>
              <tr className='tableHeader'>
                <th>
                  <MdPhoto />{' '}
                </th>
                <th>Назва</th>
                <th>Кількість</th>
                <th>Ціна</th>
                <th>Всього</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.basketJewelryList()}
              <tr className='total'>
                <td className='totalAmountHeader ' colSpan='4'>
                  Всього
                </td>
                <td colSpan='1' className='toPay'>
                  {toPay} UAN
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <hr />
          {/* <div className='toOrderBtnContainer'>
            <Link className='btn btn-secondary'>Оформити замовлення</Link>
          </div> */}
        </div>
        <div className='orderContainer'>
          <h2>Оформлення</h2>
          <div className='orderDetails'>
            <div className='personalData'>
              <table className='table'>
                <tbody>
                  <tr>
                    <th scope='row'>Ім'я</th>
                    <td>{user.firstName}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Прізвище</th>
                    <td>{user.lastName}</td>
                  </tr>
                  <tr>
                    <th>Номер телефону</th>
                    <td>
                      <input
                        className='form-control'
                        name='phoneNumber'
                        value={this.state.phoneNumber}
                        onChange={this.handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Спосіб оплати</th>
                    <td>
                      <select
                        className='form-control'
                        name='paymentMethod'
                        value={this.state.paymentMethod}
                        onChange={this.handleInputChange}
                      >
                        <option value=''>-</option>
                        <option value='card'>На карту</option>
                        <option value='onReceipt'>При отриманні</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='deliveryData'>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Область</th>
                    <td>
                      <select
                        className='form-control'
                        name='region'
                        value={this.state.region}
                        onChange={this.handleInputChange}
                      >
                        <option value=''>-</option>
                        <option value='Вінницька'>Вінницька</option>
                        <option value='Волинська'>Волинська</option>
                        <option value='Дніпропетровська'>
                          Дніпропетровська
                        </option>
                        <option value='Донецька'>Донецька</option>
                        <option value='Житомирська'>Житомирська</option>
                        <option value='Закарпатська'>Закарпатська</option>
                        <option value='Запорізька'>Запорізька</option>
                        <option value='Івано-Франківська'>
                          Івано-Франківська
                        </option>
                        <option value='Київська'>Київська</option>
                        <option value='Кіровоградська'>Кіровоградська</option>
                        <option value='Луганська'>Луганська</option>
                        <option value='Львівська'>Львівська</option>
                        <option value='Миколаївська'>Миколаївська</option>
                        <option value='Одеська'>Одеська</option>
                        <option value='Полтавська'>Полтавська</option>
                        <option value='Рівненська'>Рівненська</option>
                        <option value='Сумська'>Сумська</option>
                        <option value='Тернопільська'>Тернопільська</option>
                        <option value='Харківська'>Харківська</option>
                        <option value='Херсонська'>Херсонська</option>
                        <option value='Хмельницька'>Хмельницька</option>
                        <option value='Черкаська'>Черкаська</option>
                        <option value='Чернівецька'>Чернівецька</option>
                        <option value='Чернігівська'>Чернігівська</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Місто</th>
                    <td>
                      <input
                        className='form-control'
                        name='city'
                        value={this.state.city}
                        onChange={this.handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Номер відділення Нової Пошти</th>
                    <td>
                      <input
                        className='form-control'
                        name='postOfficeNumber'
                        value={this.state.postOfficeNumber}
                        onChange={this.handleInputChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='toOrderBtnContainer'>
            <Link className='btn btn-secondary' onClick={this.handleSend}>
              Оформити замовлення
            </Link>
          </div>
        </div>
        {/* <p>
          {req.body.firstName} {req.body.lastName}
        </p>{' '}
        <br />
        <p>{req.body.email}</p>
        <br />
        <p>{req.body.phoneNumber}</p>
        <br /> */}
      </div>
    );
  }
}
