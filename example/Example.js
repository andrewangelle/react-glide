import React, { Component } from 'react';
import Glide from '../src/index';

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
          <h1>Slide One</h1>
          <h1>Slide Two</h1>
          <h1>Slide Three</h1>
        </Glide>

      </div>
    );
  }
}
