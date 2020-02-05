import React, { Component } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default class BasketsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    // this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.changeAmountInDB = this.changeAmountInDB.bind(this);
  }
  componentDidMount() {
    this.setState({ amount: this.props.jewelry.amount });
  }

  handlePlus() {
    this.setState({ amount: this.state.amount + 1 });
    this.changeAmountInDB(this.state.amount + 1);
  }
  handleMinus() {
    if (this.state.amount === 0) return;
    this.setState({ amount: this.state.amount - 1 });
    this.changeAmountInDB(this.state.amount - 1);
  }

  // handleAmountChange({ target }) {
  //   this.setState({
  //     amount: target.value
  //   });
  //   this.changeAmountInDB(target.value);
  // }

  handleRemove = () => {
    this.props.handleRemove(this.props.jewelry._id);
  };

  changeAmountInDB(amount) {
    this.props.changeAmountInDB(amount, this.props.jewelry._id);
  }
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
        <td>
          <div className='btn-group'>
            <button
              className='btn btn-secondary basket-btn'
              onClick={this.handleMinus}
            >
              -
            </button>
            <button
              disabled
              className='btn btn-secondary basket-btn'
              // onChange={this.handleAmountChange}
              style={{
                width: '50px',
                backgroundColor: 'white',
                color: 'black'
              }}
            >
              {this.state.amount}
            </button>
            <button
              className='btn btn-secondary basket-btn'
              onClick={this.handlePlus}
            >
              +
            </button>
          </div>
        </td>
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
