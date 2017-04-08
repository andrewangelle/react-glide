import React, { Component } from 'react';
import ImageCarousel from './ImageCarousel';
import './index.css'



const images = [
  'https://unsplash.it/500/?random',
  'https://unsplash.it/400/?random',
  'https://unsplash.it/300/?random',
  'https://unsplash.it/200/?random',
  'https://unsplash.it/100/?random',
  'https://unsplash.it/500/?random'
];

export default class App extends React.Component{
   render() {
    return (
        <div>
          <ImageCarousel images={images} />
        </div>
      );
   }
}