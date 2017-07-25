import React from 'react';
import Glide from '../src/index';
import renderer from 'react-test-renderer';
import {
  mount,
  shallow,
  render
} from 'enzyme';
import { stub } from 'sinon';

jest.useFakeTimers();

describe('Glide', () => {
  it('renders without crashing', () => { Glide
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = render(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />)

    expect(component).toBeTruthy();
  });

  it('has images array that contains images', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );
    expect(images.length).toBeGreaterThan(0);
  });

  it('renders first image in array as first image displayed', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );

    expect(component.find('img').props().src).toEqual('https://unsplash.it/500/?random');
});

  it('sets width according to prop', () => {
     const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const componentMount = mount(
      <Glide
        images={images}
        width={500}
      />
    );
    const componentRendered = shallow(
      <Glide
        images={images}
        width={500}
      />
    );
    const userProp = componentMount.find('.glide--container').root.node.props.width
    const containerWidth = componentRendered.renderer._instance._currentElement.props.width;

    expect(containerWidth).toEqual(userProp);
  });

  it('changes to next index when next button is clicked', () => {
    const images = [
    'https://unsplash.it/500/?random',
    'https://unsplash.it/501/?random',
    'https://unsplash.it/502/?random',
    'https://unsplash.it/503/?random',
    'https://unsplash.it/504/?random',
    'https://unsplash.it/505/?random'
    ];

    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );

    const nextButton = component.find('button').last();

    expect(component.state().currentIndex).toEqual(0);

    nextButton.simulate('click');
    expect(component.state().currentIndex).toEqual(1);

    nextButton.simulate('click');
    expect(component.state().currentIndex).toEqual(2);

    nextButton.simulate('click');
    expect(component.state().currentIndex).toEqual(3);

    nextButton.simulate('click');
    expect(component.state().currentIndex).toEqual(4);

    nextButton.simulate('click');
    expect(component.state().currentIndex).toEqual(5);

    nextButton.simulate('click');
    expect(component.state().currentIndex).toEqual(0)

  });

  it('changes to previous index when prev button is clicked', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );
    const prevButton = component.find('button').first();

    expect(component.state().currentIndex).toEqual(0);

    prevButton.simulate('click');
    expect(component.state().currentIndex).toEqual(5);

    prevButton.simulate('click')
    expect(component.state().currentIndex).toEqual(4)

  });

  it('changes to next image when next button is clicked', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );
    //find prev button and simulate a user click event.
    const nextButton = component.find('button').last();

    expect(component.find('img').props().src).toEqual('https://unsplash.it/500/?random')

    nextButton.simulate('click');
    expect(component.find('img').props().src).toEqual('https://unsplash.it/501/?random');
  });

  it('changes to previous image when prev button is clicked', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );
    const prevButton = component.find('button').first();

    expect(component.find('img').props().src).toEqual('https://unsplash.it/500/?random');

    prevButton.simulate('click');

    expect(component.find('img').props().src).toEqual('https://unsplash.it/505/?random');
  });


  it('changes slides when autoPlay is on', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = mount(
      <Glide
        images={images}
        width={600}
        autoPlay={true}
        autoPlaySpeed={2000}
        infinite={true}
        dots={true}
      />
    );
    const stateBefore = { currentIndex: 0 };
    const stateAfter = { currentIndex: 1 };

    expect(component.state()).toEqual(stateBefore);

    jest.runTimersToTime(2000);

    expect(component.state()).toEqual(stateAfter)
  });


  it('changes slides using autoPlaySpeed prop', () => {

    jest.useFakeTimers();

    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = mount(
      <Glide
        images={images}
        width={600}
        autoPlay={true}
        autoPlaySpeed={2000}
        infinite={true}
        dots={true}
      />
    );
    const stateBefore = { currentIndex: 0 };
    const stateAfter = { currentIndex: 1 };
    const userProp = component.find('.glide--container').root.node.props.autoPlaySpeed

    expect(component.state()).toEqual(stateBefore);

    jest.runTimersToTime(userProp);

    expect(component.state()).toEqual(stateAfter)

  });

  it('renders only one button on first slide when infinite is set to false', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={false}
        dots={true}
      />
    );
    expect(component.find('img').props().src).toEqual('https://unsplash.it/500/?random');
    expect(component.find('button').length).toEqual(1);
  });
  it('renders only one button on last slide when infinite is set to false', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={false}
        dots={true}
      />
    );
    //find prev button and simulate a user click event.
    const nextButton = component.find('button').last();

    nextButton.simulate('click');
    nextButton.simulate('click');
    nextButton.simulate('click');
    nextButton.simulate('click');
    nextButton.simulate('click');

    expect(component.find('img').props().src).toEqual('https://unsplash.it/505/?random');
    expect(component.find('button').length).toEqual(1);
  });

  it('renders both buttons on first and last slide when infinite is true', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );
    const nextButton = component.find('button').last();

    expect(component.state().currentIndex).toEqual(0)
    expect(component.find('button').length).toEqual(2);

    nextButton.simulate('click');
    nextButton.simulate('click');
    nextButton.simulate('click');
    nextButton.simulate('click');
    nextButton.simulate('click');

    expect(component.state().currentIndex).toEqual(images.length - 1)
    expect(component.find('button').length).toEqual(2);
  });


  it('renders dots', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={false}
        dots={true}
      />
    );

    expect(component.find('.glide--dots').length).toEqual(1);
  });

  it('renders number of dots equal to number of images', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={false}
        dots={true}
      />
    );
    const numberOfImages = component.find('.glide--container').root.node.props.children.props.images.length;
    const numberOfDots = component.find('li').length;

    expect(numberOfDots).toEqual(numberOfImages);
  });

  it('updates state when dot is clicked', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );

    const sixthDot = component.find('li').last();
    
    expect(component.state().currentIndex).toEqual(0);

    sixthDot.simulate('click');

    expect(component.state().currentIndex).toEqual(5);
  });

  it('changes image when dot is clicked', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );

    const sixthDot = component.find('li').last();
    const stateBefore = { currentIndex: 0 };
    const stateAfter = { currentIndex: 5 };

    expect(component.find('img').props().src).toEqual('https://unsplash.it/500/?random')

    sixthDot.simulate('click');

    expect(component.find('img').props().src).toEqual('https://unsplash.it/505/?random')
  });

  it('adds active class to dot according to current image', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];

    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );
  const currentImage = component.find('img').props().src;
  const dotClassName = component.find('li').first().props().className;

  expect(currentImage).toEqual('https://unsplash.it/500/?random');
  expect(dotClassName).toEqual('active-dot');
  });

  it('fires onSlideChange callback when index changes', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const onSlideChange = stub();
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
        onSlideChange={onSlideChange}
      />
    );
    const button = component.find('button').last();

    expect(onSlideChange.callCount).toEqual(0);
    expect(component.state().currentIndex).toEqual(0)

    button.simulate('click');
    expect(onSlideChange.callCount).toEqual(1);
    expect(component.state().currentIndex).toEqual(1)

    button.simulate('click');
    expect(onSlideChange.callCount).toEqual(2)
    expect(component.state().currentIndex).toEqual(2)

    button.simulate('click');
    expect(onSlideChange.callCount).toEqual(3)
    expect(component.state().currentIndex).toEqual(3)

    button.simulate('click');
    expect(onSlideChange.callCount).toEqual(4)
    expect(component.state().currentIndex).toEqual(4)

    button.simulate('click');
    expect(onSlideChange.callCount).toEqual(5)
    expect(component.state().currentIndex).toEqual(5)
  });

  it('does not fire onSlideChange callback when prop not passed', () => {
    const images = [
      'https://unsplash.it/500/?random',
      'https://unsplash.it/501/?random',
      'https://unsplash.it/502/?random',
      'https://unsplash.it/503/?random',
      'https://unsplash.it/504/?random',
      'https://unsplash.it/505/?random'
    ];
    const onSlideChange = stub();
    const component = shallow(
      <Glide
        images={images}
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      />
    );
    const button = component.find('button').last();

    expect(onSlideChange.callCount).toEqual(0);
    expect(component.state().currentIndex).toEqual(0)

    button.simulate('click');
    expect(onSlideChange.callCount).toEqual(0);
    expect(component.state().currentIndex).toEqual(1)

    button.simulate('click');
    expect(onSlideChange.callCount).toEqual(0)
    expect(component.state().currentIndex).toEqual(2)
  });
});
