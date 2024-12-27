import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { Glide } from '../Glide';
import type { GlideProps } from '../types';

const props: GlideProps = {
  height: 500,
  width: 500,
  autoPlay: false,
  infinite: true,
  dots: true,
  onSlideChange: vi.fn(),
};

describe('Glide', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] });
  });

  it('renders without crashing', () => {
    const baseProps = {
      width: 500 as number,
      autoPlay: false,
      onSlideChange: vi.fn(),
    };
    render(
      <Glide {...baseProps}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );

    screen.getByTestId('glideContainer');
  });

  it('has children elements', () => {
    render(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );
    screen.getByText(/Slide One/);
    screen.getByText(/Slide Two/);
    screen.getByText(/Slide Three/);
  });

  it('renders first child element as first slide displayed', async () => {
    render(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );
    const element = await screen.findByTestId('glideCurrentItem');

    await within(element).findByText(/Slide One/);
  });

  it('applies width and height props', () => {
    render(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );
    const container = screen.getByTestId('glideContainer');

    const styles = getComputedStyle(container);
    expect(styles.height).toBe(`${props.height}px`);
    expect(styles.width).toBe(`${props.width}px`);
  });

  it('changes to next slide when next button is clicked', async () => {
    render(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );

    const element1 = await screen.findByTestId('glideCurrentItem');
    await within(element1).findByText(/Slide One/);

    fireEvent.click(screen.getByTestId('goToNextSlide'));

    const element2 = await screen.findByTestId('glideCurrentItem');
    await within(element2).findByText(/Slide Two/);
  });

  it('loops when next button is clicked', async () => {
    render(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );

    const element1 = await screen.findByTestId('glideCurrentItem');
    await within(element1).findByText(/Slide One/);

    fireEvent.click(screen.getByTestId('goToNextSlide'));

    const element2 = await screen.findByTestId('glideCurrentItem');
    await within(element2).findByText(/Slide Two/);

    fireEvent.click(screen.getByTestId('goToNextSlide'));

    const element3 = await screen.findByTestId('glideCurrentItem');
    await within(element3).findByText(/Slide Three/);

    fireEvent.click(screen.getByTestId('goToNextSlide'));

    const elementFinal = await screen.findByTestId('glideCurrentItem');
    await within(elementFinal).findByText(/Slide One/);
  });

  it('changes to previous slide when prev button is clicked', async () => {
    render(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );
    const element1 = await screen.findByTestId('glideCurrentItem');
    await within(element1).findByText(/Slide One/);

    fireEvent.click(screen.getByTestId('goToPrevSlide'));

    const element2 = await screen.findByTestId('glideCurrentItem');
    await within(element2).findByText(/Slide Three/);
  });

  it('changes slides when autoPlay is on', async () => {
    render(
      <Glide {...props} autoPlay={true} autoPlaySpeed={2000}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );

    const element1 = await screen.findByTestId('glideCurrentItem');
    await within(element1).findByText(/Slide One/);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const element2 = await screen.findByTestId('glideCurrentItem');
    await within(element2).findByText(/Slide Two/);
  });

  it('cancels timer after button click', async () => {
    render(
      <Glide {...props} autoPlay={true}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );

    const element1 = await screen.findByTestId('glideCurrentItem');
    await within(element1).findByText(/Slide One/);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    fireEvent.click(screen.getByTestId('goToNextSlide'));

    const elementAfterClick = await screen.findByTestId('glideCurrentItem');
    await within(elementAfterClick).findByText(/Slide Two/);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const elementHalfwayThroughTimer =
      await screen.findByTestId('glideCurrentItem');
    await within(elementHalfwayThroughTimer).findByText(/Slide Two/);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const elementAfterRestOfTimer =
      await screen.findByTestId('glideCurrentItem');
    await within(elementAfterRestOfTimer).findByText(/Slide Three/);
  });

  it('sets default autoPlay speed', async () => {
    render(
      <Glide {...props} autoPlay={true}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );

    const element1 = await screen.findByTestId('glideCurrentItem');
    await within(element1).findByText(/Slide One/);

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    const element2 = await screen.findByTestId('glideCurrentItem');
    await within(element2).findByText(/Slide Two/);
  });

  it('changes slide when pagination is clicked', async () => {
    render(
      <Glide {...props}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );
    const element1 = await screen.findByTestId('glideCurrentItem');
    await within(element1).findByText(/Slide One/);

    fireEvent.click(screen.getByTestId('glideDot-2'));

    const element2 = await screen.findByTestId('glideCurrentItem');
    await within(element2).findByText(/Slide Three/);
  });
});
