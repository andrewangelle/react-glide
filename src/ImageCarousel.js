import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.css';
import Preload from 'react-preload';

const loadingIndicator = (<div>Loading...</div>);
    
const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
      ];


export default class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state={
       currentIndex: 0

     }
  };

   goToPrevImage() {
    const { currentIndex }=this.state;
    const nextIndex = currentIndex === 0 ? 
          this.props.images.length - 1 : currentIndex - 1;
   
     this.setState({ currentIndex : nextIndex })

   }

   goToNextImage() {
    const { currentIndex }=this.state;
    const nextIndex = currentIndex === this.props.images.length - 1 ? 
          0 : currentIndex + 1;

     this.setState({ currentIndex : nextIndex })
   }

  render(){

    var style={
      position: "relative",
      width: this.props.width
    }

    return (
      <div className="container" style={style}>

        <Preload
            loadingIndicator={loadingIndicator}
            images={images}
            autoResolveDelay={3000}
            onError={this._handleImageLoadError}
            onSuccess={this._handleImageLoadSuccess}
            resolveOnError={true}
            mountChildren={true}>

        <ReactCSSTransitionGroup
          transitionName='current'
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

        <img 
          className='carousel-image' 
          key={this.state.currentIndex} 
          src={this.props.images[this.state.currentIndex]} />

          <button onClick={this.goToPrevImage.bind(this)}> Next </button>
          <button className="next" onClick={this.goToNextImage.bind(this)}> Prev </button>


        </ReactCSSTransitionGroup>
        </Preload>


      </div>

     );
  }
}
