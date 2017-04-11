import React, { Component } from 'react';
import Glide from '../src/index';

const images = [
  'https://unsplash.it/500/?random',
  'https://unsplash.it/501/?random',
  'https://unsplash.it/502/?random',
  'https://unsplash.it/503/?random',
  'https://unsplash.it/504/?random',
  'https://unsplash.it/505/?random'
];

export default class Example extends Component {
  render() {
    return (
      <div>
        <h1>react-glide</h1>

        <Glide images={images} width={500} />
      </div>
    );
  }
}
