import type { Meta } from '@storybook/react';

import '~/stories/style.css';
import { Glide } from '~/Glide';
import type { GlideProps } from '~/types';

const GlideMeta: Meta<GlideProps> = {
  title: 'Glide',
  render: Basic,
  args: {
    autoPlay: true,
    autoPlaySpeed: 5000,
    infinite: true,
    dots: true,
    className: 'story-styles',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export function Basic(args: GlideProps) {
  return (
    <Glide {...args}>
      <img alt="photo1" src="https://picsum.photos/id/312/600/600" />
      <img alt="photo2" src="https://picsum.photos/id/313/600/600" />
      <img alt="photo3" src="https://picsum.photos/id/314/600/600" />
      <div>
        <iframe
          title="frame"
          width="500"
          height="450"
          src="https://www.youtube.com/embed/6emElQDVqF4"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      <div>
        <svg
          width="200"
          height="250"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>test</title>
          <rect
            x="10"
            y="10"
            width="30"
            height="30"
            stroke="blue"
            fill="transparent"
            strokeWidth="5"
          />
        </svg>
      </div>
    </Glide>
  );
}

export default GlideMeta;
