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

  firstIndex(){
    const { currentIndex } = this.state;

    console.log(currentIndex);
  }

  hideOrShowButtons(){
    const { currentIndex } = this.state;
    const infinite = this.props.infinite;
    const endOfImages = this.props.images.length-1;
    const nextButton = document.querySelectorAll('.next');
    const prevButton = document.querySelectorAll('.prev');

    if(!infinite && currentIndex >= 0){
      prevButton[0].classList.remove('hide');
      console.log(currentIndex)
    }
    else if(!infinite && currentIndex == endOfImages) {
      console.log('ok')
    }
  }

  hidePrevButtonOnLoad(){
    const { currentIndex } = this.state;
    const infinite = this.props.infinite;
    const prevButton = document.querySelectorAll('.prev');

    if(!infinite && currentIndex === 0){
      prevButton[0].classList.add('hide');
    }
  }

  showButton(){
    const { currentIndex } = this.state;
    const nextButton = document.querySelectorAll('.next');
    const prevButton = document.querySelectorAll('.prev');
    const isHidden = prevButton.classList.contains('hide');

    if(currentIndex > 0){
      prevButton.classList.remove('hide');
    }
  }

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
          onSuccess={
            this.startTimer.bind(this),
            this.hidePrevButtonOnLoad.bind(this)
          }
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

            <button className="prev"
                    onClick={() => {
              clearInterval(this.autoPlay);
              this.goToPrevImage();
              this.hideOrShowButtons();
            }}>&#10094;
            </button>

            <button className="next"
                    onClick={() => {
              clearInterval(this.autoPlay);
              this.goToNextImage();
              this.hideOrShowButtons();
            }}>&#10095;
            </button>

          </ReactCSSTransitionGroup>

        </Preload>

      </div>
    );
  }
}
