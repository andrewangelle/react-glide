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
          <div>
            <h1>div one</h1>
            <h1>with three</h1>
            <h1>nested h1 tags</h1>
          </div>

          <div>
            <h1>div two</h1>
            <h1>with three</h1>
            <h1>nested h1 tags</h1>
          </div>

          <div>
            <h1>div three</h1>
            <h1>with three</h1>
            <h1>nested h1 tags</h1>
          </div>

        </Glide>
      </div>
    );
  }
}
