import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      <Card className='card m-3' style={{ width: '18rem' }}>
        <Card.Img
          src={jewelry.jewelry_img_1}
          style={{ width: '100%' }}
          variant='top'
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <h6>{jewelry.jewelry_price} UAN</h6>
          <Button variant='info' block>
            <Link style={{ color: 'white' }} to={`/catalog/${jewelry._id}`}>
              Дізнатись більше
            </Link>
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
