import React from 'react';
import Glide from '../src/index';
import renderer from 'react-test-renderer';
import {
  mount,
  shallow,
  render
} from 'enzyme';
import { stub } from 'sinon';

jest.useFakeTimers(); it.skip

describe('Glide', () => {
  it('renders without crashing', () => { Glide
    const component = render(
      <Glide
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    expect(component).toBeTruthy();
  });

  it('has children elements', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    expect(component.props().children.length).toBeGreaterThan(0)
  });

  it('renders first child element as first slide displayed', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const element = component.instance().props.children[0].props.children;
    
    expect(element).toEqual('Slide One');
  });

  it('has width prop', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const userProp = component.instance().props.width

    expect(userProp).toBeTruthy();
  });  

  it('sets container width according to prop', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const userProp = component.instance().props.width
    const containerWidth = component.renderer._instance._currentElement.props.width;

    expect(containerWidth).toEqual(userProp);
  });

  it('changes to next index when next button is clicked', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    const nextButton = component.find('button').last();

    expect(component.state().currentIndex).toEqual(0);

    nextButton.simulate('click');
    expect(component.state().currentIndex).toEqual(1);

    nextButton.simulate('click');
    expect(component.state().currentIndex).toEqual(2);

  });

  it('changes to previous index when prev button is clicked', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const prevButton = component.find('button').first();

    expect(component.state().currentIndex).toEqual(0);

    prevButton.simulate('click');
    expect(component.state().currentIndex).toEqual(2);

    prevButton.simulate('click')
    expect(component.state().currentIndex).toEqual(1)

  });

  it('changes to next slide when next button is clicked', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const nextButton = component.find('button').last();    
    const elementOne = component.instance().props.children[0].props.children;
    const elementTwo = component.instance().props.children[1].props.children;
    const elementThree = component.instance().props.children[2].props.children;
    
    expect(elementOne).toEqual('Slide One');

    nextButton.simulate('click');
    expect(elementTwo).toEqual('Slide Two');

    nextButton.simulate('click');
    expect(elementThree).toEqual('Slide Three');    
  });

  it('changes to previous slide when prev button is clicked', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={false}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const prevButton = component.find('button').first();    
    const elementOne = component.instance().props.children[0].props.children;
    const elementTwo = component.instance().props.children[1].props.children;
    const elementThree = component.instance().props.children[2].props.children;
    
    expect(component.find('h1').props().children).toEqual('Slide One');

    prevButton.simulate('click');
    expect(component.find('h1').props().children).toEqual('Slide Three');

    prevButton.simulate('click');
    expect(component.find('h1').props().children).toEqual('Slide Two');
  });


  it('changes slides when autoPlay is on', () => {
    const component = mount(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    expect(component.state().currentIndex).toEqual(0);

    jest.runTimersToTime(2000);

    expect(component.state().currentIndex).toEqual(2)
  });


  it('changes slides using autoPlaySpeed prop', () => {
    const component = mount(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    const userProp = component.instance().props.autoPlaySpeed

    expect(component.state().currentIndex).toEqual(0);

    jest.runTimersToTime(userProp);

    expect(component.state().currentIndex).toEqual(1);

  });

  it('renders only one button on first slide when infinite is set to false', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={false}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    const slideRedered = component.instance().props.children[0].props.children

    expect(slideRedered).toEqual('Slide One');
    
    expect(component.find('button').length).toEqual(1);
  });

  it('renders only one button on last slide when infinite is set to false', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={false}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    const nextButton = component.find('button').last();

    nextButton.simulate('click');
    nextButton.simulate('click');

    expect(component.find('button').length).toEqual(1);
  });

  it('renders both buttons on first and last slide when infinite is true', () => {

    const component = shallow(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );


    const nextButton = component.find('button').last();

    expect(component.state().currentIndex).toEqual(0)
    expect(component.find('button').length).toEqual(2);

    nextButton.simulate('click');
    nextButton.simulate('click');

    expect(component.state().currentIndex).toEqual(2)
    expect(component.find('button').length).toEqual(2);
  });


  it('renders dots', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    expect(component.find('.glide--dots').length).toEqual(1);
  });

  it('renders number of dots equal to number of children', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
    const numberOfChildren = component.props().children.length -1
    const numberOfDots = component.find('li').length;

    expect(numberOfDots).toEqual(numberOfChildren);
  });

  it('updates state when dot is clicked', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );

    const sixthDot = component.find('li').last();
    
    expect(component.state().currentIndex).toEqual(0);

    sixthDot.simulate('click');

    expect(component.state().currentIndex).toEqual(2);
  });

  it('adds active class to dot according to current index', () => {
    const component = shallow(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
    );
  
  const dotClassName = component.find('li').first().props().className;

  expect(dotClassName).toEqual('active-dot');
  });

  it('fires onSlideChange callback when index changes', () => {
    const onSlideChange = stub();
    const component = shallow(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
        onSlideChange={onSlideChange}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
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
  });

  it('does not fire onSlideChange callback when prop not passed', () => {
    const onSlideChange = stub();
    const component = shallow(
      <Glide
        width={500}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={true}
        dots={true}
      >
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>
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
