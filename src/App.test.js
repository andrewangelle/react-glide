import React from 'react';
import ImageCarousel from './ImageCarousel.js';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';





describe('ImageCarousel', () => {
	it('renders without crashing', () => {

		const images = [
  			'https://unsplash.it/500/?random',
  			'https://unsplash.it/501/?random',
  			'https://unsplash.it/502/?random',
  			'https://unsplash.it/503/?random',
  			'https://unsplash.it/504/?random',
  			'https://unsplash.it/505/?random'
		];


		const tree = renderer.create(
			<ImageCarousel images={images} />
		).toJSON();

		expect(tree).toMatchSnapshot();
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

		const componenet = shallow(
			<ImageCarousel images={images} />
		);

		expect(images.length).toBeGreaterThan(0);
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

		const componenet = shallow(
			<ImageCarousel images={images} />
		);

		//find next button and simulate a user click event.
		const nextButton = componenet.find('button').last();
		nextButton.simulate('click');

		expect(componenet.state().currentIndex).toEqual(1);
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

		const componenet = shallow(
			<ImageCarousel images={images} />
		);

		//find prev button and simulate a user click event.
		const prevButton = componenet.find('button').first();
		prevButton.simulate('click');

		expect(componenet.state().currentIndex).toEqual(5);
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
		const componenet = shallow(
			<ImageCarousel images={images} />
		);


		expect(componenet.find('img').props().src).toEqual('https://unsplash.it/500/?random');
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

		const componenet = shallow(
			<ImageCarousel images={images} />
		);

		//find prev button and simulate a user click event.
		const nextButton = componenet.find('button').last();
		nextButton.simulate('click');

		expect(componenet.find('img').props().src).toEqual('https://unsplash.it/501/?random');
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
		
		const componenet = shallow(
			<ImageCarousel images={images} />
		);

		//find prev button and simulate a user click event.
		const prevButton = componenet.find('button').first();
		prevButton.simulate('click');

		expect(componenet.find('img').props().src).toEqual('https://unsplash.it/505/?random');
	});

});