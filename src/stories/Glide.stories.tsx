import type { Meta } from '@storybook/react';

import '~/stories/style.css';
import { Glide } from '~/components/Glide';
import type { GlideProps } from '~/types';

const GlideMeta: Meta<GlideProps> = {
  title: 'Glide',
  render(args) {
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
            allowFullScreen
          />
        </div>

        <div style={{ width: '100%', height: '100%' }}>
          <svg
            width="600px"
            height="600px"
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
  },
  args: {
    className: 'glide-storybook',
    autoPlay: false,
    autoPlaySpeed: 5000,
    infinite: false,
    dots: true,
    loading: false,
    swipeable: true,
    scrollBehavior: 'smooth',
  },
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    scrollBehavior: {
      control: 'select',
      options: ['auto', 'instant', 'smooth'],
    },
  },
};

export const Swipeable = GlideMeta;

export const Animated: Meta<GlideProps> = {
  ...GlideMeta,
  args: {
    swipeable: false,
  },
};
export default GlideMeta;
