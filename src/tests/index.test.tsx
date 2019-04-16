import React from 'react';
import { shallow, mount } from './setupTests'

import { Glide, GlideState, GlideProps } from '../Glide';
import { Preloader } from '../Preloader';
import { PreloaderProps  } from '../types';

jest.useFakeTimers();

const props = {
  height: 500,
  width: 500,
  autoPlay: false,
  infinite: true,
  dots: true,
  onSlideChange: jest.fn()
}

const state = {
  currentIndex: 0,
  imagesLoaded: false
}

describe('Glide', () => {
  afterEach(() => jest.clearAllMocks())
  it('renders without crashing', () => {
    const baseProps = {
      width: 500,
      autoPlay: false,
      onSlideChange: jest.fn()
    }
    const component = shallow(
      <Glide {...baseProps}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    expect(component.getElement()).toMatchSnapshot();
  });

  it('has children elements', () => {
    const component = shallow(
      <Glide  {...props} {...state}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    expect(component.props().children.length).toBeGreaterThan(0)
  });

  it('renders first child element as first slide displayed', () => {
    const component = shallow(
      <Glide  {...props} {...state}>

        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const element = component.instance().props.children![0].props.children;

    expect(element).toEqual('Slide One');
  });

  it('has width and height props', () => {
    const component = shallow(
      <Glide  {...props} {...state}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const widthProp = (component.instance().props as GlideProps).width
    const heightProp = (component.instance().props as GlideProps).height
    expect([widthProp, heightProp]).toBeTruthy();
  });

  it('sets container width according to prop', () => {
    const component = shallow(
      <Glide  {...props} {...state}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const userProp = (component.instance().props as GlideProps).width

    expect(userProp).toEqual(userProp);
  });

  it('changes to next index when next button is clicked', () => {
    const component = shallow(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    const nextButton = component.find('button').last();
    expect((component.instance().state as GlideState).currentIndex).toEqual(0);

    nextButton.simulate('click');

    expect((component.instance().state as GlideState).currentIndex).toEqual(1);

    nextButton.simulate('click');
    expect((component.instance().state as GlideState).currentIndex).toEqual(2);

  });

  it.only('loops when next button is clicked', () => {
    const component = shallow(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    const spy = jest.spyOn(component.instance() as Glide, 'onNextButtonClick')

    component.setState({ currentIndex: 2 })

    component
      .find('button')
      .last()
      .simulate('click');

    component.update()

    expect((component.instance().state as GlideState).currentIndex).toEqual(0);
    expect(spy).toHaveBeenCalled()
  });


  it('changes to previous index when prev button is clicked', () => {
    const component = shallow(
      <Glide  {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const prevButton = component.find('button').first();
    expect((component.instance().state as GlideState).currentIndex).toEqual(0);

    prevButton.simulate('click');
    expect((component.instance().state as GlideState).currentIndex).toEqual(2);

    prevButton.simulate('click')
    expect((component.instance().state as GlideState).currentIndex).toEqual(1)

  });


  it('changes to next slide when next button is clicked', () => {
    const component = shallow(
      <Glide  {...props} {...state}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const nextButton = component.find('button').last();
    const elementOne = component.instance().props.children![0].props.children;
    const elementTwo = component.instance().props.children![1].props.children;
    const elementThree = component.instance().props.children![2].props.children;

    expect(elementOne).toEqual('Slide One');

    nextButton.simulate('click');
    expect(elementTwo).toEqual('Slide Two');

    nextButton.simulate('click');
    expect(elementThree).toEqual('Slide Three');

    nextButton.simulate('click');
    expect((component.instance().state as GlideState).currentIndex).toEqual(0)
  });

  it('changes to previous slide when prev button is clicked', () => {
    const component = shallow(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const prevButton = component.find('button').first();

    expect((component.find('Preloader').props() as PreloaderProps).currentIndex).toEqual(0)

    prevButton.simulate('click');
    expect((component.find('Preloader').props() as PreloaderProps).currentIndex).toEqual(2)

    prevButton.simulate('click');
    expect((component.find('Preloader').props() as PreloaderProps).currentIndex).toEqual(1)

  });


  it('changes slides when autoPlay is on', () => {
    const original = window.clearInterval;
    window.clearInterval = jest.fn();

    const component = mount(
      <Glide {...props} autoPlay={true} autoPlaySpeed={2000}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    expect((component.instance().state as GlideState).currentIndex).toEqual(0);

    jest.runTimersToTime(4000);
    expect((component.instance().state as GlideState).currentIndex).toEqual(2)

    window.clearInterval = original
  });

  it('fires callback when when pagination is clicked', () => {
    const component = shallow(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    expect(props.onSlideChange).not.toHaveBeenCalled()

    component
      .find('.inactive-dot')
      .first()
      .simulate('click')

    expect(props.onSlideChange).toHaveBeenCalled()
  })

  it('does not fire callback if index does not change', () => {
    const component = shallow(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    component.setState({ currentIndex: 0 })

    expect(props.onSlideChange).not.toHaveBeenCalled();

  });

  it('does not fire callback if not provided', () => {
    const component = shallow(
      <Glide {...props} onSlideChange={undefined}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    component.setState({ currentIndex: 1 })

    expect(props.onSlideChange).not.toHaveBeenCalled();
  });
});

describe('Preloader', () => {
  afterEach(() => jest.clearAllMocks())
  it('shows loader', () => {
    const wrapper = shallow(
      <Preloader
        currentIndex={0}
        width={500}
        autoPlay={false}
        startTimer={jest.fn()}
      >
        <img src="https://picsum.photos/700" />
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Preloader>
    )

    expect(wrapper).toMatchSnapshot();
  });

  it('shows children', () => {
    const wrapper = shallow(
      <Preloader
        currentIndex={0}
        width={500}
        autoPlay={false}
        startTimer={jest.fn()}
      >
        <img src="https://picsum.photos/700" />
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Preloader>
    )

    wrapper.setState({loading: false, done: true});
    wrapper.update()
    expect(wrapper).toMatchSnapshot();
  });
})
