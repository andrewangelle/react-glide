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
          infinite={false}
          dots={true}
        >
          <div>
            <img src='https://unsplash.it/500/?random' />
          </div>

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/6emElQDVqF4"
            frameBorder="0"
            allowFullScreen
          >
          </iframe>

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
      </div>
    );
  }
}
