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
    if (this.props.jewelryType === 'all') {
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
    } else {
      axios
        .get('/jewelry/catalog/' + this.props.jewelryType)
        .then(res => {
          this.setState({
            jewelry: res.data
          });
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.jewelryType !== this.state.jewelryType;
  }
  componentDidUpdate(props) {
    if (props.jewelryType !== this.props.jewelryType) {
      if (this.props.jewelryType === 'all') {
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
      } else {
        axios
          .get('/jewelry/catalog/' + this.props.jewelryType)
          .then(res => {
            this.setState({
              jewelry: res.data
            });
          })
          .catch(err => {
            console.log('Error: ' + err);
          });
      }
    }
  }

  jewelryList = () => {
    return this.state.jewelry.map((jewelry, index) => {
      return (
        <div className='col-10 col-sm-6 col-md-4 col-lg-3 m-auto' key={index}>
          <JewelryCard jewelry={jewelry} />
        </div>
      );
    });
  };

  render() {
    return (
      <div className='catalog-box'>
        <div className='container'>
          <div className='catalog row'>{this.jewelryList()}</div>
        </div>
      </div>
    );
  }
}
