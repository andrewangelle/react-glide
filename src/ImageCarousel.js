import React from 'react';


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
      <div>
        <img src={this.props.images[this.state.currentIndex]} />
     
        <button onClick={this.goToPrevImage.bind(this)}>Prev</button>
        <button onClick={this.goToNextImage.bind(this)}>Next</button>
      </div>
     );
  }
}
