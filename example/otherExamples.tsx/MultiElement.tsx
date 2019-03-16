import React, { Component } from 'react';
import { Glide } from '../../src';

export class MultiElement extends Component {
  render() {
    return (
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={2000}
      >
        <div>
          <img src='https://unsplash.it/500/?random' />
        </div>

        <div>
          <iframe
            width="500"
            height="315"
            src="https://www.youtube.com/embed/6emElQDVqF4"
            frameBorder="0"
            allowFullScreen
          >
          </iframe>
        </div>

        <div>
          <svg
            width="200"
            height="250"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10"
              y="10"
              width="30"
              height="30"
              stroke="blue"
              fill="transparent"
              strokeWidth="5"
            />
          </svg>
        </div>
      </Glide>
    )
  }
}