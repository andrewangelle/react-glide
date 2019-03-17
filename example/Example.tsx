import React, { Component } from 'react';
import { Glide } from '../src';


class Example extends Component {
  render() {
    return (
      <div>
        <Glide
          width={700}
          autoPlay={false}
          autoPlaySpeed={2000}
          onSlideChange={() => console.log('slide changed')}
          infinite={true}
          dots={true}
        >
          <img src='https://picsum.photos/700' />
          <img src='https://picsum.photos/699' />
          <img src='https://picsum.photos/698' />
          <div>
            <iframe
              width="700"
              height="450"
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
      </div>
    );
  }
}

export { Example }