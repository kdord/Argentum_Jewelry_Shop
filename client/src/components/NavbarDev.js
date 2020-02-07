import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/css/NavbarDevStyle.css';

export default class NavbarDev extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { user } = this.props;
    // const returnDiv = '';
    // {
    //   user && user.username === 'admin' && returnDiv =
    // {<div className={`navbarDev ${display}`}>
    //   <nav className='navbar '>
    //     <div className='container justify-content-center'>
    //       <ul className='nav justify-content-center'>
    //         <li className='nav-item'>
    //           <Link className='nav-link' to='/create'>
    //             Create Jewelry Card
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>
    // </div>

    // }
    return (
      <div className='navbarDev'>
        <nav className='navbar '>
          <div className='container justify-content-center'>
            <ul className='nav justify-content-center'>
              <li className='nav-item'>
                <Link className='nav-link' to='/create'>
                  Create Jewelry Card
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
