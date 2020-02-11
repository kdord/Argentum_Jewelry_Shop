import React, { Component } from 'react';
import '../style/css/LandingPageStyle.css';

import banner2 from '../images/banner2.png';
import banner1 from '../images/banner1.png';
import { Carousel } from 'react-bootstrap';

export default class LandingPage extends Component {
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
      </div>
    );
  }
}
