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

   goToSelectedDot(index){
    this.setState({ currentIndex: index });
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
    const { infinite, images, dots } = this.props;

    const glideWidth={
      position: "relative",
      width: this.props.width
    }

    return (
      <div 
        className="glide--container" 
        style={glideWidth}
      >

        <Preload
          loadingIndicator={loadingIndicator}
          images={this.props.images}
          onError={this._handleImageLoadError}
          onSuccess={this.startTimer.bind(this)}
          resolveOnError={true}
          mountChildren={true}
        >

          <div>

            <ReactCSSTransitionGroup
              transitionName='current'
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >

              <img
                className='glide--image'
                key={this.state.currentIndex}
                src={this.props.images[this.state.currentIndex]}
              />

              {(infinite || currentIndex !== 0) &&
                <button 
                  className="glide--prev-btn"
                  onClick={() => {
                    clearInterval(this.autoPlay);
                    this.goToPrevImage();
                  }}
                >
                  &#10094;
                </button>
              }

              {(infinite || currentIndex !== this.props.images.length-1) &&
                <button 
                  className="glide--next-btn"
                  onClick={() => {
                    clearInterval(this.autoPlay);
                    this.goToNextImage();
                  }}
                >
                  &#10095;
                </button>
              }
            </ReactCSSTransitionGroup>

            {(dots) &&
              <ul 
                className="glide--dots"
              >
                {images.map((image,index) =>
                  <li 
                    key={image}
                    className={(currentIndex === index ? "active-dot" : "inactive-dot")}
                    onClick={() => {
                      this.goToSelectedDot(index);
                    }}
                  >
                    &middot;
                  </li>
                )}
              </ul>
            }
          </div>
        </Preload>
      </div>
    );
  }
}
