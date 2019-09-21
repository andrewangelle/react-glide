import React from 'react';
import { shallow } from './setupTests';
import { Preloader } from '../Preloader';

describe('Preloader', () => {
  afterEach(() => jest.clearAllMocks());
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
    );

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
    );

    wrapper.setState({ loading: false, done: true });
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('fires timer cb after preloading is finished', () => {
    const props = {
      currentIndex: 0,
      width: 500,
      autoPlay: true,
      startTimer: jest.fn()
    };
    const wrapper = shallow(
      <Preloader {...props}>
        <img src="https://picsum.photos/700" />
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Preloader>
    );
    expect(props.startTimer).not.toHaveBeenCalled();

    wrapper.setState({ loading: false, done: true });
    wrapper.update();
    expect(props.startTimer).toHaveBeenCalled();
  });
});
