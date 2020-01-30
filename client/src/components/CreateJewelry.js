import React, { Component } from 'react';
import axios from 'axios';

export default class CreateJewelry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jewelry_type: 'ring',
      jewelry_price: '',
      jewelry_material: 'Срібло 925 проби',
      jewelry_inStock: true,
      jewelry_size: '',
      jewelry_note: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const newJewelry = {
      jewelry_type: this.state.jewelry_type,
      jewelry_price: this.state.jewelry_price,
      jewelry_material: this.state.jewelry_material,
      jewelry_inStock: this.state.jewelry_inStock,
      jewelry_size: this.state.jewelry_size,
      jewelry_note: this.state.jewelry_note
    };
    console.log(newJewelry);
    axios
      .post('/jewelry/save', newJewelry)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      jewelry_type: 'ring',
      jewelry_price: '',
      jewelry_material: 'Срібло 925 проби',
      jewelry_inStock: true,
      jewelry_size: '',
      jewelry_note: ''
    });
  };

  render() {
    return (
      <div className='container'>
        <h2 className='mt-3'>Create New Jewelry Card</h2>
        <form className='mt-4' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <select
              className='form-control'
              value={this.state.jewelry_type}
              name='jewelry_type'
              onChange={this.handleChange}
            >
              <option value={'ring'}>Каблучка</option>
              <option value={'braclete'}>Браслет</option>
              <option value={'earrings'}>Сережки</option>
              <option value={'necklece'}>Підвіска</option>
            </select>
          </div>

          <div className='form-group'>
            <input
              required
              type='text'
              className='form-control'
              placeholder='Ціна'
              name='jewelry_price'
              value={this.state.jewelry_price}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              required
              type='text'
              className='form-control'
              placeholder='Material'
              name='jewelry_material'
              value={this.state.jewelry_material}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <select
              className='form-control'
              value={this.state.jewelry_inStock}
              name='jewelry_inStock'
              onChange={this.handleChange}
            >
              <option value={true}>В наявності</option>
              <option value={false}>Немає в наявності</option>
            </select>
          </div>
          <div className='form-group'>
            <input
              required
              type='text'
              name='jewelry_size'
              className='form-control'
              placeholder='Розмір'
              value={this.state.jewelry_size}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              value={this.state.jewelry_note}
              onChange={this.handleChange}
              type='text'
              name='jewelry_note'
              placeholder='Примітки'
            />
          </div>
          <button className='btn btn-primary'>Зберегти</button>
        </form>
      </div>
    );
  }
}
