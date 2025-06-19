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

#### Note*
You will need to set dimensions on the container. You can do this in one of several ways...
- Via your own stylesheet on the parent element to the `<Glide />` component.
- Via your own stylesheet by passing a custom classname to `<Glide />`
- Via inline styles passed to the `containerStyles` prop on `<Glide />`  


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
  swipeable?: boolean;
  onSlideChange?: () => void;
};
```

## Styling

### Default Stylesheet

Import the default stylesheet from `react-glide`.

in your css file
```css
@import 'react-glide/lib/reactGlide.css';
/* or */
@import '~react-glide/lib/reactGlide.css';
```

or in your module
```javascript
import 'react-glide/lib/reactGlide.css';
```

#### CSS Variables

The values listed below are the defaults assigned when importing the library's stylesheet.
```css
:root {
  --react-glide-spinner-border: 2px solid #ccc;
  --react-glide-spinner-color: #333;
  --react-glide-button-background: hsl(190, 10%, 10%);
  --react-glide-button-color: hsl(190, 95%, 80%);
  --react-glide-dots-container-margin: 10px;
  --react-glide-dot-color: black;
  --react-glide-dot-selected-color: hsl(190, 95%, 80%);
  --react-glide-dot-gap: 8px;
  --react-glide-animation: fade 1s ease-in;
}
```

#### Element class names

```css
.glide--container {}
.glide--container.swipeable {}

.glide--item {}
.glide--item.animated {}
.glide--item.animated.current {}
.glide--item.swipeable {}
.glide--item.swipeable.current {}

.glide--button {}
.glide--button.next {}
.glide--button.previous {}

.glide--dots {}
.glide--dot {}
.glide--dot.active {}

.glide--loading {}
```

