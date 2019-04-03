import React, { Component } from 'react';
import { Glide, GlideProps } from '../src/Glide';
import '../lib/reactGlide.css'
import './style.css'

/**
 * use the following import statements in your actual project
 *
 * import { Glide, GlideProps } from 'react-glide';
 * import 'react-glide/lib/reactGlide.css';
 */

const props: GlideProps = {
  height: 600,
  width: 600,
  autoPlay: true,
  autoPlaySpeed: 2000,
  onSlideChange: () => console.log('slide changed'),
  infinite: true,
  dots: true
}

class Example extends Component {
  render() {
    return (
      <Glide {...props}>
        <img src="https://picsum.photos/600" />
        <img src="https://picsum.photos/600.2" />
        <img src="https://picsum.photos/600.1" />
        <div>
          <iframe
            width="500"
            height="450"
            src="https://www.youtube.com/embed/6emElQDVqF4"
            frameBorder="0"
            allowFullScreen
          />
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
    );
  }
}

export { Example }