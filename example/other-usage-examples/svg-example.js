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
              stroke="black"
              fill="transparent"
              strokeWidth="5"
            />
            <rect
              x="60"
              y="10"
              rx="10"
              ry="10"
              width="30"
              height="30"
              stroke="black"
              fill="transparent"
              strokeWidth="5"
            />
          </svg>

          <svg
            width="200"
            height="250"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="75"
              r="20"
              stroke="red"
              fill="transparent"
              strokeWidth="5"
            />
            <ellipse
              cx="75"
              cy="75"
              rx="20"
              ry="5"
              stroke="red"
              fill="transparent"
              strokeWidth="5"
            />
          </svg>

          <svg
            width="200"
            height="250"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="10"
              x2="50"
              y1="110"
              y2="150"
              stroke="orange"
              strokeWidth="5"
            />
            <polyline
              points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145"
              stroke="orange"
              fill="transparent"
              strokeWidth="5"
            />
          </svg>

          <svg
            width="200"
            height="250"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
              stroke="green"
              fill="transparent"
              strokeWidth="5"
            />
          </svg>

          <svg
            width="200"
            height="250"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20,230 Q40,205 50,230 T90,230"
              fill="none"
              stroke="blue"
              strokeWidth="5"
            />
          </svg>
        </Glide>
      </div>
    );
  }
}
