import React from 'react';
import ImageCarousel from './ImageCarousel';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';





describe('ImageCarousel', () => {
	it('renders without crashing', () => {

		const images = [
  			'https://placehold.it/500x100',
  			'https://placehold.it/510x100',
  			'https://placehold.it/520x100',
  			'https://placehold.it/530x100',
  			'https://placehold.it/540x100',
  			'https://placehold.it/550x100'
		];

		const tree = renderer.create(
			<ImageCarousel images={images} />
		).toJSON();

		expect(tree).toMatchSnapshot();
	});

		it('has images array that contains images', () => {

		const images = [
  			'https://placehold.it/500x100',
  			'https://placehold.it/510x100',
  			'https://placehold.it/520x100',
  			'https://placehold.it/530x100',
  			'https://placehold.it/540x100',
  			'https://placehold.it/550x100'
		];

		const componenet = shallow(
			<ImageCarousel images={images} />
		);

		expect(images.length).toBeGreaterThan(0);
	});

	it('changes to next index when next button is clicked', () => {

		const images = [
  			'https://placehold.it/500x100',
  			'https://placehold.it/510x100',
  			'https://placehold.it/520x100',
  			'https://placehold.it/530x100',
  			'https://placehold.it/540x100',
  			'https://placehold.it/550x100'
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
  			'https://placehold.it/500x100',
  			'https://placehold.it/510x100',
  			'https://placehold.it/520x100',
  			'https://placehold.it/530x100',
  			'https://placehold.it/540x100',
  			'https://placehold.it/550x100'
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
  			'https://placehold.it/500x100',
  			'https://placehold.it/510x100',
  			'https://placehold.it/520x100',
  			'https://placehold.it/530x100',
  			'https://placehold.it/540x100',
  			'https://placehold.it/550x100'
		];

		const componenet = shallow(
			<ImageCarousel images={images} />
		);


		expect(componenet.find('img').props().src).toEqual('https://placehold.it/500x100');
	});

	it('changes to next image when next button is clicked', () => {

		const images = [
  			'https://placehold.it/500x100',
  			'https://placehold.it/510x100',
  			'https://placehold.it/520x100',
  			'https://placehold.it/530x100',
  			'https://placehold.it/540x100',
  			'https://placehold.it/550x100'
		];

		const componenet = shallow(
			<ImageCarousel images={images} />
		);

		//find prev button and simulate a user click event.
		const nextButton = componenet.find('button').last();
		nextButton.simulate('click');

		expect(componenet.find('img').props().src).toEqual('https://placehold.it/510x100');
	});

	it('changes to previous image when prev button is clicked', () => {

		const images = [
  			'https://placehold.it/500x100',
  			'https://placehold.it/510x100',
  			'https://placehold.it/520x100',
  			'https://placehold.it/530x100',
  			'https://placehold.it/540x100',
  			'https://placehold.it/550x100'
		];

		const componenet = shallow(
			<ImageCarousel images={images} />
		);

		//find prev button and simulate a user click event.
		const prevButton = componenet.find('button').first();
		prevButton.simulate('click');

		expect(componenet.find('img').props().src).toEqual('https://placehold.it/550x100');
	});

});