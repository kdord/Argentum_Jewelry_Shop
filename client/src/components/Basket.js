import React, { Component } from 'react';
import axios from 'axios';
import BasketItem from './BasketItem';

export default class Basket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basketList: [],
      basket: []
    };
    this.initialization = this.initialization.bind(this);
    this.getBasket = this.getBasket.bind(this);
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

  render() {
    return (
      <div>
        <h2>Корзина</h2>
      </div>
    );
  }
}
