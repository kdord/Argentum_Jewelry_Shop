import React, { Component } from 'react';
import axios from 'axios';
import BasketsItem from './BasketsItem';
import { MdPhoto } from 'react-icons/md';

export default class Basket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basketList: [],
      basket: []
    };
    this.initialization = this.initialization.bind(this);
    this.getBasket = this.getBasket.bind(this);
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
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
        this.setState({ basketList: res.data.user.basket });
        this.getBasket(this.state.basketList);
      } else {
        console.log('Get user in basket: no user');
        this.setState({ basketList: null });
      }
    });
  }

  getBasket(basketList) {
    basketList.forEach(listItem => {
      console.log(listItem.jewelryId);
      let jewelryItem;
      axios.get('/jewelry/' + listItem.jewelryId).then(res => {
        // console.log(res.data);
        jewelryItem = { ...res.data, amount: listItem.amount };
        // console.log(jewelryItem);
        this.setState(currState => {
          const basket = currState.basket.concat(jewelryItem);
          return {
            ...currState,
            basket
          };
        });
      });
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
      return <BasketsItem jewelry={jewelry} key={index} />;
    });
  };

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
