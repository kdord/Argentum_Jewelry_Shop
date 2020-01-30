import React, { Component } from 'react';

export default class JewelryCard extends Component {
  render() {
    const { jewelry } = this.props;
    let title;
    switch (jewelry.jewelry_type) {
      case 'ring':
        title = 'Каблучка';
        break;
      case 'braclete':
        title = 'Браслет';
        break;
      case 'earrings':
        title = 'Сережки';
        break;
      case 'necklece':
        title = 'Підвіска';
        break;
      default:
        title = 'Каблучка';
    }
    return (
      <div className='card m-3'>
        <div className='card-body'>
          <h5 className=''>{title}</h5>
          <h6>{jewelry.jewelry_price} UAN</h6>
        </div>
      </div>
    );
  }
}
