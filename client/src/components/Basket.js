import React, { Component } from 'react';
import axios from 'axios';
import BasketsItem from './BasketsItem';
import { MdPhoto } from 'react-icons/md';

export default class Basket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basket: []
    };
    this.initialization = this.initialization.bind(this);
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
        this.setState({ basket: res.data.user.basket });
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
        this.initialization();
        console.log('item removed');
      })
      .catch(err => {
        console.log('Error: ');
        console.log(err);
      });
  }

  render() {
    const toPay = this.calculateTotalPrice();

    return (
      <div>
        <h2>Корзина</h2>
        <table className='table'>
          <thead>
            <tr>
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
            <tr>
              <td colSpan='4'>Всього</td>
              <td>{toPay} UAN</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
