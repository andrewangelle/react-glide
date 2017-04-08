import React, { Component } from 'react';
import ImageCarousel from './ImageCarousel';
import './index.css'
import Preload from 'react-preload';


const images = [
  'https://unsplash.it/500/?random',
  'https://unsplash.it/501/?random',
  'https://unsplash.it/502/?random',
  'https://unsplash.it/503/?random',
  'https://unsplash.it/504/?random',
  'https://unsplash.it/505/?random'
];

const loadingIndicator = (<div>Loading...</div>);

export default class App extends React.Component{
   render() {
    return (
        <div>


 
          <Preload
            loadingIndicator={loadingIndicator}
            images={images}
            autoResolveDelay={3000}
            onError={this._handleImageLoadError}
            onSuccess={this._handleImageLoadSuccess}
            resolveOnError={true}
            mountChildren={true}
            >

            <ImageCarousel images={images} />

          </Preload>

        </div>
      );
   }
}