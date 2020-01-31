import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/css/JewelryCardStyle.css';

export default class JewelryCard extends Component {
  render() {
    const { jewelry } = this.props;

    return (
      <Card className='card'>
        <Card.Img
          src={jewelry.jewelry_img_1}
          className='card-img'
          variant='top'
        />
        <Card.Body>
          <Card.Title>{jewelry.jewelry_name}</Card.Title>
          <hr />
          <h6>{jewelry.jewelry_price} UAN</h6>

          <Link className='card-btn-link btn ' to={`/catalog/${jewelry._id}`}>
            Дізнатись більше
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
