import React, { Component } from 'react';
import Glide from '../src/index';
import '../node_modules/react-glide/lib/react-glide.css';

export default class Example extends Component {
  render() {
    return (
      <div>
        <Glide
          width={500}
          autoPlay={false}
          autoPlaySpeed={2000}
          infinite={true}
          dots={true}
        >
          <img src='https://unsplash.it/500/?random' />
          <img src='https://unsplash.it/501/?random' />
          <img src='https://unsplash.it/500/?random' />
        </Glide>
      </div>
    );
  }
}
