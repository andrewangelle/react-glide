import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Preload from 'react-preload';
import './index.css';

const loadingIndicator = (<div>Loading...</div>);

export default class Glide extends React.Component {
  constructor(props) {
    super(props);
    this.state={
       currentIndex: 0
     }
  };

   startTimer(){
    if(this.props.autoPlay){
      this.autoPlay = setInterval(
        () => this.goToNextImage(),
        this.props.autoPlaySpeed || 5000
      );
    }
   }

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
    const { currentIndex } = this.state;
    const infinite = this.props.infinite;

    var style={
      position: "relative",
      width: this.props.width
    }

    return (
      <div className="container" style={style}>

        <Preload
          loadingIndicator={loadingIndicator}
          images={this.props.images}
          onError={this._handleImageLoadError}
          onSuccess={this.startTimer.bind(this)}
          resolveOnError={true}
          mountChildren={true} >

          <ReactCSSTransitionGroup
            transitionName='current'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300} >

            <img
              className='carousel-image'
              key={this.state.currentIndex}
              src={this.props.images[this.state.currentIndex]} />

            {(infinite || currentIndex !== 0) &&
              <button className="prev"
                      onClick={() => {
                clearInterval(this.autoPlay);
                this.goToPrevImage();
              }}>&#10094;</button>
            }

            {(infinite || currentIndex !== this.props.images.length-1) &&
              <button className="next"
                      onClick={() => {
                clearInterval(this.autoPlay);
                this.goToNextImage();
              }}>&#10095;</button>
            }
          </ReactCSSTransitionGroup>

        </Preload>

      </div>
    );
  }
}
