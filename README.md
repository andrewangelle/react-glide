# react-glide

A lightweight, zero-dependency, multi-purpose carousel component for React.

[![npm version](https://badge.fury.io/js/react-glide.svg)](https://badge.fury.io/js/react-glide)
[![CircleCI](https://circleci.com/gh/andrewangelle/react-paypal-button.svg?style=svg)](https://circleci.com/gh/andrewangelle/react-glide)

## Try it out

[Demo](https://master--676ed9a7f91611407c7878ce.chromatic.com/?path=/story/glide--basic)
<!-- [Codesandbox Demo](https://codesandbox.io/s/r7166733lm) -->

<img src="glide.png" width="400px" />

## Installation

```sh
$ npm install react-glide
```

## Usage

Glide functions as a wrapper and can be passed any type of element. See [example folder](https://github.com/andrewangelle/react-glide/tree/master/ssr-testing/components/GlideExample.tsx):

```javascript
import { Glide } from 'react-glide';

function Example() {
  return (
    <Glide {...props}>
      <img src='http:/path/to/image/url' />
      <img src='http:/path/to/image/url2' />
      <img src='http:/path/to/image1/url3' />
    </Glide>
  )
}
```

## Options

### Types
```typescript
type GlideProps = {
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  dots?: boolean;
  infinite?: boolean;
  className?: string;
  children?: string | JSX.Element | JSX.Element[];
  containerStyles?: CSSProperties;
  loading?: boolean;
  animate?: boolean;
  onSlideChange?: () => void;
};
```

<!-- ### Props Description
| option      | type      | description                           | default | required  |
|------------ |-----------|---------------------------------------|---------|-----------|
|`width`      |integer    | the width of the carousel container. |  none  |   Yes  |
|`height`      |integer    | the height of the carousel container. |  none  |   No  |
|`autoPlay`   |bool       | enables or disables autoPlay feature.| false    | No    |
|`autoPlaySpeed` |integer    | the rate of change between slides, defined in ms.|  2000  | No    |
|`infinite` |bool    | carousel will loop infinitely  |  true  | No    |
|`dots` |bool    | dot navigation & pagination   | true   |  No   |
|`onSlideChange` |func    | a function that will fire when the slide changes  | none   |  No   | -->


## Styles

### Default Styles

To use the default styles, import the CSS from react-glide.

in your css file
```css
@import 'react-glide/lib/reactGlide.css';
```

or in your module
```javascript
import 'react-glide/lib/reactGlide.css';
```

### Overriding Default Styles

In order to fit the design of your project you can customize styles. 

Below are the supported css variables along with their defaults.
```css
:root {
  --react-glide-button-background: hsl(190, 10%, 10%);
  --react-glide-button-color: hsl(190, 95%, 80%);
  --react-glide-dot-color: black;
  --react-glide-dot-selected-color: hsl(190, 95%, 80%);
  --react-glide-dot-container-bottom-margin: 10px;
  --react-glide-dot-gap: 8px;
  --react-glide-spinner-border: 2px solid #ccc;
  --react-glide-spinner-color: #333;
  --react-glide-animate-in: fade 1s ease-in;
}
```

You can also using the class names below in your projects own stylesheet:

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
