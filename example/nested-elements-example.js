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
          <div>
            <h1>Slide One</h1>
              <span> span nested in slide one </span>
                <p> p tag nested in span</p>
            <h1>Slide Two</h1>
            <h1>Slide Three</h1>
          </div>

          <div>
            <h1>Slide Four</h1>
          </div>

          <div>
            <h1>Slide Seven</h1>
            <h1>Slide Eight</h1>
            <h1>Slide Nine</h1>
          </div>

        </Glide>
      </div>
    );
  }
}
