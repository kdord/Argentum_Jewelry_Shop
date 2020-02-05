import React, { Component } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default class BasketsItem extends Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove = () => {
    this.props.handleRemove(this.props.jewelry._id);
  };
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
        <td>
          <button className='btn'>
            <FaTrashAlt onClick={this.handleRemove} />
          </button>
        </td>
      </tr>
    );
  }
}
