import React from 'react';
import { Glide } from '..';
import { shallow } from './setupTests'

jest.useFakeTimers();

const props: any = {
  width: 500,
  autoPlay: false,
  autoPlaySpeed: 1000,
  infinite: true,
  dots: true,
  onSlideChange: jest.fn()
}

const state: any = {
  currentIndex: 0,
  imagesLoaded: false
}

describe('Glide', () => {
  afterEach(() => jest.clearAllMocks())
  it('renders without crashing', () => {
    const component = shallow(
      <Glide  {...props} {...state}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    expect(component).toBeTruthy();
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

  it('has width prop', () => {
    const component = shallow(
      <Glide  {...props} {...state}>

        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const userProp = (component.instance().props as any).width

    expect(userProp).toBeTruthy();
  });

  it('sets container width according to prop', () => {
    const component = shallow(
      <Glide  {...props} {...state}>

        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const userProp = (component.instance().props as any).width

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
    expect((component.instance().state as any).currentIndex).toEqual(0);

    nextButton.simulate('click');

    expect((component.instance().state as any).currentIndex).toEqual(1);

    nextButton.simulate('click');
    expect((component.instance().state as any).currentIndex).toEqual(2);

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
    expect((component.instance().state as any).currentIndex).toEqual(0);

    prevButton.simulate('click');
    expect((component.instance().state as any).currentIndex).toEqual(2);

    prevButton.simulate('click')
    expect((component.instance().state as any).currentIndex).toEqual(1)

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
  });

  it('changes to previous slide when prev button is clicked', () => {
    const component = shallow(
      <Glide {...props}{...state} >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const prevButton = component.find('button').first();

    expect(component.find('h1').props().children).toEqual('Slide One');

    prevButton.simulate('click');
    expect(component.find('h1').props().children).toEqual('Slide Three');

    prevButton.simulate('click');
    expect(component.find('h1').props().children).toEqual('Slide Two');
  });


  it('changes slides when autoPlay is on', () => {
    const component = shallow(
      <Glide {...props} autoPlay={true}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    expect(state.currentIndex).toEqual(0);

    jest.runTimersToTime(2000);

    expect((component.instance().state as any).currentIndex).toEqual(2)
  });
});
