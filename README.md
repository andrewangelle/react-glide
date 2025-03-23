# react-glide

A lightweight, multi-purpose carousel component for React.

[![npm version](https://badge.fury.io/js/react-glide.svg)](https://badge.fury.io/js/react-glide)
[![CircleCI](https://circleci.com/gh/andrewangelle/react-paypal-button.svg?style=svg)](https://circleci.com/gh/andrewangelle/react-glide)

## Try it out

[Storybook Playground](https://master--676ed9a7f91611407c7878ce.chromatic.com/?path=/story/glide--basic)
[Codesandbox Demo](https://codesandbox.io/s/r7166733lm)

<img src="glide.png" width="400px" />

## Installation

```sh
$ npm install react-glide
```

## Usage

Import the module at the top of your component page:

```javascript
import { Glide } from 'react-glide';
import 'react-glide/lib/react-glide.css'
```

Glide functions as a wrapper and can be passed any type of element. See [example folder](https://github.com/andrewangelle/react-glide/tree/master/ssr-testing/components/GlideExample.tsx):

```javascript
<Glide height={500} width={500}>
  <img src='http:/path/to/image/url' />
  <img src='http:/path/to/image/url2' />
  <img src='http:/path/to/image1/url3' />
</Glide>
```

## Options

### Types
```typescript
interface GlideProps {
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  dots?: boolean;
  height?: number;
  infinite?: boolean;
  width: number;
  onSlideChange?: () => void;
}
```

### Props Description
| option      | type      | description                           | default | required  |
|------------ |-----------|---------------------------------------|---------|-----------|
|`width`      |integer    | the width of the carousel container. |  none  |   Yes  |
|`height`      |integer    | the height of the carousel container. |  none  |   No  |
|`autoPlay`   |bool       | enables or disables autoPlay feature.| false    | No    |
|`autoPlaySpeed` |integer    | the rate of change between slides, defined in ms.|  2000  | No    |
|`infinite` |bool    | carousel will loop infinitely  |  true  | No    |
|`dots` |bool    | dot navigation & pagination   | true   |  No   |
|`onSlideChange` |func    | a function that will fire when the slide changes  | none   |  No   |


## Styles

### Default Styles

To use the default styles, import the CSS from react-glide at the top of your file:

```javascript
import 'react-glide/lib/reactGlide.css';
```

### Overriding Default Styles

in order to fit the design of your project, you can override the default styles by using the class names below in your projects own stylesheet:

| element     | class name |
|------------ |-----------|
|  containers  | `.glide--container` |
|           |   `.glide--item`|
|           | `.glide--item.current` |
|  buttons  | `.glide--next-btn` |
|           |  `.glide--prev-btn`|
|  dots     |  `.glide--dots`  |
|     |  `.glide--dots-active`  |
|     |  `.glide--dots-inactive`  |


## Development

Install dependencies:

```sh
$ npm install
```

Run storybook at http://localhost:6006:

```sh
$ npm start
```

Run ssr test app at http://localhost:3000:

```sh
$ cd ./ssr-testing && npm i && npm start
```

Run tests in watch mode:

```sh
$ npm run test
```

Execute a single run of tests:

```sh
$ npm run test:once
```

Run linter check:

```sh
$ npm run lint:check
```

Run linter auto fix:

```sh
npm run lint:fix
```


## License
MIT
