import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class ShowJewelry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jewelry: {}
    };
  }

  componentDidMount() {
    axios
      .get('/jewelry/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          jewelry: res.data
        });
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }
  jewelryCardTitle() {
    switch (this.state.jewelry.jewelry_type) {
      case 'ring':
        return <h2 className='card-title'>Каблучка</h2>;

      case 'braclete':
        return <h2 className='card-title'>Браслет</h2>;
      case 'earrings':
        return <h2 className='card-title'>Сережки</h2>;
      case 'necklece':
        return <h2 className='card-title'>Підвіска</h2>;
      default:
        return <h2 className='card-title'>Каблучка</h2>;
    }
  }

  handleRemove() {
    axios
      .delete('/jewelry/' + this.props.match.params.id)
      .then(res => console.log('Removed'));
    this.props.history.push('/catalog');
  }

  render() {
    console.log(this.state.jewelry);
    const { jewelry } = this.state;

    return (
      <div className='container mt-5 '>
        <div className='jewelry-show-btns mb-3'>
          <Button variant='info' block>
            <Link to={`/update/${jewelry._id}`} style={{ color: 'white' }}>
              Редагувати
            </Link>
          </Button>
          <Button variant='danger' block onClick={() => this.handleRemove()}>
            Видалити
          </Button>
        </div>
        <div className='jewelry-smow-main d-flex'>
          <div className='jewelry-show-main-img' style={{ width: '25rem' }}>
            <img
              style={{ width: '100%' }}
              src={jewelry.jewelry_img_title}
              alt={jewelry.jewelry_type}
            />
          </div>
          <div className='jewelry-show-main-desc p-5'>
            {this.jewelryCardTitle()}

            <h5>Ціна: {jewelry.jewelry_price} UAN</h5>
            <h5>{jewelry.jewelry_size}</h5>
            <h5>Матеріал: {jewelry.jewelry_material}</h5>
            <h5>
              {jewelry.jewelry_inStock ? 'В наявності' : 'Немає в наявності'}
            </h5>
            {jewelry.jewelry_note && <p>{jewelry.jewelry_note}</p>}
          </div>
        </div>

        <div className='jewelry-show-img-desc d-block mt-5'>
          {jewelry.jewelry_img_desc1 && (
            <img
              src={jewelry.jewelry_img_desc1}
              alt='img desc1'
              style={{ width: '50%' }}
            />
          )}
          {jewelry.jewelry_img_desc2 && (
            <img
              src={jewelry.jewelry_img_desc2}
              alt='img desc2'
              style={{ width: '50%' }}
            />
          )}
        </div>
      </div>
    );
  }
}
