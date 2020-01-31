import React, { Component } from 'react';
import axios from 'axios';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/css/ShowJewelry.css';

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

      case 'bracelete':
        return <h2 className='card-title'>Браслет</h2>;
      case 'earrings':
        return <h2 className='card-title'>Сережки</h2>;
      case 'necklace':
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
                <table className='table table-borderless'>
                  <thead>
                    <th>Характеристики</th>
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
