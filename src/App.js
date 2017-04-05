import React, { Component } from 'react';
import ImageCarousel from './ImageCarousel';



const images = [
  'https://placehold.it/500x100',
  'https://placehold.it/510x100',
  'https://placehold.it/520x100',
  'https://placehold.it/530x100',
  'https://placehold.it/540x100',
  'https://placehold.it/550x100'
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