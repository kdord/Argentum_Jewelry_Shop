import React, { Component } from 'react';
import axios from 'axios';
import '../style/css/LandingPageStyle.css';

import banner2 from '../images/banner2.png';
import banner1 from '../images/banner1.png';
import rings from '../images/rings.png';
import bracelets from '../images/bracelets.png';
import neckleces from '../images/neckleces.png';
import earrings from '../images/earrings.png';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JewelryCard from './JewelryCard';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jewelry: []
    };
    this.getJewelryTopSalesList = this.getJewelryTopSalesList.bind(this);
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

  getJewelryTopSalesList = () => {
    console.log('in getJewelryTopSalesList ');

    let indexesArray = [3, 6, 9, 11];

    // let index = Math.floor(this.state.jewelry.length * 0.2);
    // console.log(index);
    // console.log(this.state.jewelry[index]);
    // let { jewelry } = this.state.jewelry[index];
    // return (
    //   <div className='col-10 col-sm-6 col-md-4 col-lg-3 m-auto' key={index}>
    //     <JewelryCard jewelry={jewelry} />
    //   </div>
    // );
    return this.state.jewelry.map((jewelry, index) => {
      if (indexesArray.includes(index)) {
        return (
          <div className='col-10 col-sm-6 col-lg-3 m-auto' key={index}>
            <JewelryCard jewelry={jewelry} landingPage={true} />
          </div>
        );
      }
    });
  };

  render() {
    return (
      <div className='landing'>
        <div className='banner'>
          <Carousel indicators={false} interval={3000}>
            <Carousel.Item>
              <img className='d-block w-100' src={banner1} alt='banner' />
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={banner2} alt='banner' />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className='categories container'>
          <Link className='categories-item' to='/catalog/rings'>
            <img src={rings} alt='rings' />
          </Link>
          <Link className='categories-item' to='/catalog/earrings'>
            <img src={earrings} alt='earrings' />
          </Link>
          <Link className='categories-item' to='/catalog/neckleces'>
            <img src={neckleces} alt='neckleces' />
          </Link>
          <Link className='categories-item' to='/catalog/bracelets'>
            <img src={bracelets} alt='bracelets' />
          </Link>
        </div>
        {/* {this.getJewelryTopSalesList()} */}
        <div className='container topSalesContainer'>
          <h2 className='topSales-title'>Топ продажів</h2>
          <div className='topSales row'>
            {this.state.jewelry && this.getJewelryTopSalesList()}
          </div>
        </div>
      </div>
    );
  }
}
