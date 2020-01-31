import React, { Component } from 'react';
import axios from 'axios';
import JewelryCard from './JewelryCard';

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
      return <JewelryCard jewelry={jewelry} key={index} />;
    });
  };

  render() {
    return (
      <div className='container' style={{ display: 'flex' }}>
        {this.jewelryList()}
      </div>
    );
  }
}
