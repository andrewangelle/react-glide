import React from 'react';
import Glide from '../src/index';
import renderer from 'react-test-renderer';
import {
  mount,
  shallow,
  render
} from 'enzyme';

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
    //find next button and simulate a user click event.
    const nextButton = component.find('button').last();
    nextButton.simulate('click');

    expect(component.state().currentIndex).toEqual(1);
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

    //find prev button and simulate a user click event.
    const prevButton = component.find('button').first();
    prevButton.simulate('click');

    expect(component.state().currentIndex).toEqual(5);
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
    //find prev button and simulate a user click event.
    const prevButton = component.find('button').first();
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

  it('when infinite prop is false it only renders one button on first slide', () => {
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
        width={600}
        autoPlay={false}
        autoPlaySpeed={2000}
        infinite={false}
        dots={true}
      />
    );
    const firstSlide = { currentIndex: 0 };
    const button = component.find('button').length

    expect(component.state()).toEqual(firstSlide);

    expect(button).toEqual(1);

  });

  it('when infinite prop is false it only renders one button on last slide', () => {
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
    expect(component.find('.glide--next-btn').length).toEqual(0);


  });
});
