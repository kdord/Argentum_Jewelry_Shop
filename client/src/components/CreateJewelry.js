import React, { Component } from 'react';
import axios from 'axios';

export default class CreateJewelry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jewelry_type: 'ring',
      jewelry_name: '',
      jewelry_price: '',
      jewelry_material: 'Срібло 925 проби',
      jewelry_inStock: true,
      jewelry_size: '',
      jewelry_img_1: '',
      jewelry_img_2: '',
      jewelry_img_3: '',
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
      jewelry_name: this.state.jewelry_name,
      jewelry_price: this.state.jewelry_price,
      jewelry_material: this.state.jewelry_material,
      jewelry_inStock: this.state.jewelry_inStock,
      jewelry_img_1: this.state.jewelry_img_1,
      jewelry_img_2: this.state.jewelry_img_2,
      jewelry_img_3: this.state.jewelry_img_3,
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
    this.returnState();
    this.props.history.push('/catalog');
  };

  returnState() {
    this.setState({
      jewelry_type: 'ring',
      jewelry_name: '',
      jewelry_price: '',
      jewelry_material: 'Срібло 925 проби',
      jewelry_inStock: true,
      jewelry_size: '',
      jewelry_img_1: '',
      jewelry_img_2: '',
      jewelry_img_3: '',
      jewelry_note: ''
    });
  }
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
              <option value={'bracelete'}>Браслет</option>
              <option value={'earrings'}>Сережки</option>
              <option value={'necklace'}>Підвіска</option>
            </select>
          </div>

          <div className='form-group'>
            <input
              required
              type='text'
              className='form-control'
              placeholder='Назва'
              name='jewelry_name'
              value={this.state.jewelry_name}
              onChange={this.handleChange}
            />
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
              value={this.state.jewelry_img_title}
              onChange={this.handleChange}
              type='text'
              name='jewelry_img_1'
              placeholder='Посилання на головне зображення'
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              value={this.state.jewelry_img_desc1}
              onChange={this.handleChange}
              type='text'
              name='jewelry_img_2'
              placeholder='Посилання на зображення для опису'
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              value={this.state.jewelry_img_desc2}
              onChange={this.handleChange}
              type='text'
              name='jewelry_img_3'
              placeholder='Посилання на зображення для опису'
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
          {/* <div className='form-group input-group'>
            <div className='custom-file'>
              <input
                className='custom-file-input'
                type='file'
                id='inputImg'
                aria-describedby='inputGroupFileAddon01'
              />
              <label className='custom-file-label' htmlFor='inputImg'>
                Choose Image
              </label>
            </div> */}
          {/* </div> */}
          <button className='btn btn-primary'>Зберегти</button>
        </form>
      </div>
    );
  }
}
