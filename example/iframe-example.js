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
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/6emElQDVqF4"
            frameBorder="0"
            allowFullScreen
          >
          </iframe>

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/xsAxFGq28BU"
            frameBorder="0"
            allowFullScreen
          >
          </iframe>

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/mxi9843_NUk"
            frameBorder="0"
            allowFullScreen
          >
          </iframe>
        </Glide>
      </div>
    );
  }
}
