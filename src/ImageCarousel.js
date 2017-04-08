import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.css';
import Preload from 'react-preload';


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
    return (
      <div className="container" >

        <ReactCSSTransitionGroup
          transitionName='current'
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          <img className='carousel-image' key={this.state.currentIndex} src={this.props.images[this.state.currentIndex]} />
        </ReactCSSTransitionGroup>


        <button onClick={this.goToPrevImage.bind(this)}> Next </button>
        <button className="next" onClick={this.goToNextImage.bind(this)}> Prev </button>


      </div>
     );
  }
}
