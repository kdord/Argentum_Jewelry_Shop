import React, { Component } from 'react';
import axios from 'axios';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/css/ShowJewelry.css';

export default class ShowJewelry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jewelry: {},
      basketAmount: 1
    };
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
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

  handleRemove() {
    axios
      .delete('/jewelry/' + this.props.match.params.id)
      .then(res => console.log('Removed'));
    this.props.history.push('/catalog');
  }

  handlePlus() {
    this.setState({ basketAmount: this.state.basketAmount + 1 });
  }
  handleMinus() {
    if (this.state.basketAmount === 0) return;
    this.setState({ basketAmount: this.state.basketAmount - 1 });
  }

  render() {
    const { jewelry } = this.state;

    return (
      <div className='container mt-5 mb-5'>
        <div className='jewelry-show-btns mb-3'>
          <Button variant='light' block>
            <Link className='jewelry-show-btn' to={`/update/${jewelry._id}`}>
              Редагувати
            </Link>
          </Button>
          <Button variant='light' block onClick={() => this.handleRemove()}>
            Видалити
          </Button>
        </div>
        <div className='jewelry-show-main d-flex'>
          {/* <div className='jewelry-show-main-img' style={{ width: '25rem' }}>
          </div> */}
          <div className='row row-cols-1 row-cols-md-2'>
            <div className='col mb-5'>
              <Carousel
                className='jewelry-show-carousel'
                interval={null}
                slide={false}
              >
                <Carousel.Item>
                  <img
                    className='d-block w-100 '
                    style={{ width: '100%' }}
                    src={jewelry.jewelry_img_1}
                    alt={jewelry.jewelry_type}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100 '
                    style={{ width: '100%' }}
                    src={jewelry.jewelry_img_2}
                    alt={jewelry.jewelry_type}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100 '
                    style={{ width: '100%' }}
                    src={jewelry.jewelry_img_3}
                    alt={jewelry.jewelry_type}
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className='col'>
              <div className='jewelry-show-main-desc pl-5 '>
                {/* {this.jewelryCardTitle()} */}
                <h2>{jewelry.jewelry_name}</h2>
                <p className='jewelry-show-inStock'>
                  {jewelry.jewelry_inStock
                    ? 'В наявності'
                    : 'Немає в наявності'}
                </p>
                <div className='jewelry-show-basket d-flex'>
                  <div className='btn-group'>
                    <button
                      className='btn btn-secondary basket-btn'
                      onClick={this.handleMinus}
                    >
                      -
                    </button>
                    <input value={this.state.basketAmount} />
                    <button
                      className='btn btn-secondary basket-btn'
                      onClick={this.handlePlus}
                    >
                      +
                    </button>
                  </div>
                </div>
                <table className='table table-borderless'>
                  <thead>
                    <tr>
                      <th>Характеристики</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ціна</td>
                      <td>{jewelry.jewelry_price} UAN</td>
                    </tr>
                    <tr>
                      <td>Розмір</td>
                      <td>{jewelry.jewelry_size}</td>
                    </tr>
                    <tr>
                      <td>Матеріал</td>
                      <td>{jewelry.jewelry_material}</td>
                    </tr>
                    <tr>
                      <td>Комплект</td>
                      <td>Прикраса, коробочка, солодкий сюрприз</td>
                    </tr>
                  </tbody>
                </table>

                {jewelry.jewelry_note && <p>{jewelry.jewelry_note}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
