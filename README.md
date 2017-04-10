# project-name

A multi purpose carousel module built in React.

## Installation

```sh
$ npm install project-name
```

## Usage

```javascript
import ImageCarousel from 'project-name';
```

```javascript
const images = [
  'http://path/to/image/url',
  'http://path/to/image/url2',
  'http://path/to/image/url3'
];

<ImageCarousel
  images={images}
  width={500}
/>
```

## Options

| option      | type      | description                           |
|------------ |-----------|---------------------------------------|
|`images`     |array      | the images to be displayed by component |
|`width`      |integer    | the width of the carousel container     |


## Development

Install dependencies:

```sh
$ npm install
```

Run the example app at http://localhost:3000:

```sh
$ npm start
```

Run tests using jest:

```sh
$ npm test
```

## License
?
