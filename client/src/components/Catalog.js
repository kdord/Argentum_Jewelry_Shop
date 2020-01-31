import React, { Component } from 'react';
import axios from 'axios';
import JewelryCard from './JewelryCard';
import '../style/css/CatalogStyle.css';

export default class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jewelry: []
    };
  }
  componentDidMount = () => {
    axios
      .get('/jewelry/')
      .then(res => {
        this.setState({
          jewelry: res.data
        });
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  };

  jewelryList = () => {
    return this.state.jewelry.map((jewelry, index) => {
      return (
        <div className='col' key={index}>
          <JewelryCard jewelry={jewelry} />
        </div>
      );
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className='container'>
        <div
          className='catalog row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4'
          style={{ display: 'flex' }}
        >
          {this.jewelryList()}
        </div>
      </div>
    );
  }
}
