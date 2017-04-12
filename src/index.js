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

   componentDidMount(){

    if(this.props.autoPlay){
      this.autoPlay = setInterval(
        () => this.goToNextImage(),
        5000
      );
    }

    if (this.props.autoPlaySpeed){  
      this.autoPlay = setInterval(
        () => this.goToNextImage(),
        this.props.autoPlaySpeed
      );
    }
    
   }

   componentWillUnmount(){
    clearInterval(this.autoPlay);
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
          onSuccess={this._handleImageLoadSuccess}
          resolveOnError={true}
          mountChildren={true}
        >
          <ReactCSSTransitionGroup
            transitionName='current'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            <img
              className='carousel-image'
              key={this.state.currentIndex}
              src={this.props.images[this.state.currentIndex]}
            />

            <button onClick={this.goToPrevImage.bind(this)}>Prev</button>
            <button className="next" onClick={this.goToNextImage.bind(this)}>Next</button>
          </ReactCSSTransitionGroup>
        </Preload>
      </div>
    );
  }
}
