import React, { Component } from 'react';
import { Glide } from '../src';

class Example extends Component {
  render() {
    return (
      <div>
        <Glide
          width={500}
          autoPlay={false}
          images={['https://unsplash.it/500/?random', 'https://unsplash.it/501/?random', 'https://unsplash.it/502/?random']}
        />
      </div>
    );
  }
}

export { Example }