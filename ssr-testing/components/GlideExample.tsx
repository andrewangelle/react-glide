import React from 'react'
import { Glide, GlideProps } from 'react-glide'
import 'react-glide/lib/reactGlide.css';

const props: GlideProps = {
  height: 600,
  width: 600,
  autoPlay: true,
  autoPlaySpeed: 5000,
  onSlideChange: () => console.log('slide changed'),
  infinite: true,
  dots: true
}

export function GlideExample(){
  return (
    <Glide {...props}>
      <img src="https://picsum.photos/id/312/600/600" />
      <img src="https://picsum.photos/id/313/600/600" />
      <img src="https://picsum.photos/id/314/600/600" />
      <div>
        <iframe
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
  )
}
