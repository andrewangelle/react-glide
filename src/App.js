import React, { Component } from 'react';
import ImageCarousel from './ImageCarousel';
import './index.css'



const images = [
  'https://unsplash.it/500/?random',
  'https://unsplash.it/501/?random',
  'https://unsplash.it/502/?random',
  'https://unsplash.it/503/?random',
  'https://unsplash.it/504/?random',
  'https://unsplash.it/505/?random'
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