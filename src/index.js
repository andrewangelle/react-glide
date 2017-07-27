import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Preload from 'react-preload';
import PropTypes from 'prop-types';
import './index.css';

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
          this.props.children.length - 1 : currentIndex - 1;

     this.setState({ currentIndex : nextIndex })
   }

   goToNextImage() {
    const { currentIndex }=this.state;
    const nextIndex = currentIndex === this.props.children.length - 1 ?
      0 : currentIndex + 1;

    this.setState({ currentIndex : nextIndex })
   }

  render(){
    const { currentIndex } = this.state;
    const { infinite, children, dots } = this.props;

    const glideWidth={
      position: "relative",
      width: this.props.width
    }

    console.log({children});

    return (
      <div
        className="glide--container"
        style={glideWidth}
      >
          <div>
            <ReactCSSTransitionGroup
              transitionName='current'
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              
              {
                React.Children.map(children, (child, i) => {
                  if (i !== currentIndex) return
                  return child
                })
              }

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

              {(infinite || currentIndex !== this.props.images.children-1) &&
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
                {children.map((child,index) =>
                  <li
                    key={child[index]}
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
      </div>
    );
  }
}


Glide.propTypes = {
  width: PropTypes.number.isRequired,
  autoPlay: PropTypes.bool,
  autoPlaySpeed: PropTypes.number,
  infinite: PropTypes.bool,
  dots: PropTypes.bool,
  onSlideChange: PropTypes.func
};

Glide.defaultProps = {
  autoPlay: false,
  autoPlaySpeed: 2000,
  infinite: true,
  dots: true
};

