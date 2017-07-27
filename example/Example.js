import React, { Component } from 'react';
import Glide from '../src/index';

export default class Example extends Component {
  render() {
    return (
      <div>
        <Glide
          width={500}
          autoPlay={false}
          autoPlaySpeed={1000}
          infinite={true}
          dots={true}

        >
          <h1>Bitch Child</h1>
          <h1>Bastard Child</h1>
          <h1>Child with Both Parents</h1>
        </Glide>

      </div>
    );
  }
}
