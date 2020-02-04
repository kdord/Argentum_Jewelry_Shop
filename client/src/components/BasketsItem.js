import React, { Component } from 'react';

export default class BasketsItem extends Component {
  render() {
    const { jewelry } = this.props;
    return (
      <tr>
        <td>
          <img
            style={{ width: '100px' }}
            alt={jewelry.jewelry_name}
            src={jewelry.jewelry_img_1}
          />
        </td>
        <td>{jewelry.jewelry_name}</td>
        <td>{jewelry.amount}</td>
        <td>{jewelry.jewelry_price} UAN</td>
        <td>{jewelry.jewelry_price * jewelry.amount} UAN </td>
      </tr>
    );
  }
}
