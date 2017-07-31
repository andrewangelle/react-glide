# react-glide

A lightweight, multi-purpose carousel component for react

[![CircleCI](https://circleci.com/gh/andrewangelle/react-glide.svg?style=shield)](https://circleci.com/gh/andrewangelle/react-glide) [![Coverage Status](https://coveralls.io/repos/github/andrewangelle/react-glide/badge.svg?branch=master)](https://coveralls.io/github/andrewangelle/react-glide?branch=master)

<img src="glide.png" width="400px" />

## Installation

```sh
$ npm install react-glide
```

## Usage

import the module at the top of your component page

```javascript
import Glide from 'react-glide';
```

Glide functions as a wrapper and can be passed any type of element. See [example folder](https://github.com/andrewangelle/react-glide/tree/multi-purpose/example) for more detailed usage

```javascript

<Glide width={500}>
  <img src='http:/path/to/image/url' />
  <img src='http:/path/to/image/url2' />
  <img src='http:/path/to/image1/url3' />
</Glide>

```

## Options

| option      | type      | description                           | default | required  |
|------------ |-----------|---------------------------------------|---------|-----------|
|`width`      |integer    | the width of the carousel container. |  none  |   Yes  |
|`autoPlay`   |bool       | enables or disables autoPlay feature.| false    | No    |
|`autoPlaySpeed` |integer    | the rate of change between slides, defined in ms.|  2000ms  | No    |
|`infinite` |bool    | carousel will loop infinitely  |  true  | No    |
|`dots` |bool    | dot navigation & pagination   | true   |  No   |
|`onSlideChange` |func    | a function that will fire when the slide changes  | none   |  No   |


## Styles

### Default Styles

To use the default styles, import the css from react-glide at the top of your file

```javascript
import '../node_modules/react-glide/lib/react-glide.css';
```

### Overriding Default Styles

in order to fit the design of your project, you can override the default styles by using the classnames below in your projects own stylesheet

| element     | classname |
|------------ |-----------|
|  buttons  | .glide--next-btn  |
|           |   .glide--prev-btn |
|  dots     |   .glide--dots   |
|     |   .glide--dots-active   |
|     |   .glide--dots-inactive   |


## Development

Install dependencies:

```sh
$ npm install
```

Run the example app at http://localhost:3000:

```sh
$ npm start
```

Run tests:

```sh
$ npm test
```

## License
MIT
