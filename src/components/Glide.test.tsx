import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Glide } from '~/components/Glide';
import type { GlideProps } from '~/types';

const user = userEvent.setup();

const props: GlideProps = {
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

    await user.click(screen.getByTestId('goToNextSlide'));

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

    await user.click(screen.getByTestId('goToNextSlide'));

    const element2 = await screen.findByTestId('glideCurrentItem');
    await within(element2).findByText(/Slide Two/);

    await user.click(screen.getByTestId('goToNextSlide'));

    const element3 = await screen.findByTestId('glideCurrentItem');
    await within(element3).findByText(/Slide Three/);

    await user.click(screen.getByTestId('goToNextSlide'));

    const elementFinal = await screen.findByTestId('glideCurrentItem');
    await within(elementFinal).findByText(/Slide One/);

    expect(props.onSlideChange).toHaveBeenCalledTimes(3);
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

    await user.click(screen.getByTestId('goToPrevSlide'));

    const element2 = await screen.findByTestId('glideCurrentItem');
    await within(element2).findByText(/Slide Three/);

    await user.click(screen.getByTestId('goToPrevSlide'));

    const element3 = await screen.findByTestId('glideCurrentItem');
    await within(element3).findByText(/Slide Two/);
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

  it('does not loop when autoplay is on and infinite is off', async () => {
    render(
      <Glide {...props} autoPlay={true} autoPlaySpeed={2000} infinite={false}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );

    // first item
    const element1 = await screen.findByTestId('glideCurrentItem');
    await within(element1).findByText(/Slide One/);

    // advance timer and expect next item to be visible
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    const element2 = await screen.findByTestId('glideCurrentItem');
    await within(element2).findByText(/Slide Two/);

    // advance timer and expect last item to be visible
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    const element3 = await screen.findByTestId('glideCurrentItem');
    await within(element3).findByText(/Slide Three/);

    // advance timer and expect last item to still be visible
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    const element3Again = await screen.findByTestId('glideCurrentItem');
    await within(element3Again).findByText(/Slide Three/);
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

    await user.click(screen.getByTestId('goToNextSlide'));

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

    await user.click(screen.getByTestId('glideDot-2'));

    const element2 = await screen.findByTestId('glideCurrentItem');
    await within(element2).findByText(/Slide Three/);
  });

  it('elgantly handles unexpected children', async () => {
    render(<Glide {...props}>{undefined}</Glide>);

    screen.getByTestId('glideContainer');
    screen.getByTestId('goToPrevSlide');
    screen.getByTestId('goToNextSlide');
  });

  it('works with keyboard interaction', async () => {
    render(
      <Glide {...props} infinite={false} autoPlay={false}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );

    // helpers
    function getFocusedElement() {
      return document.activeElement;
    }

    async function getActiveItem() {
      const result = await screen.findByTestId('glideCurrentItem');
      return result;
    }

    async function tabToSecondDot() {
      // tab three times to get to the first dot
      const count = Array(3).fill(null);
      for (const _ in count) {
        await user.tab();
      }
    }

    async function tabToLastDot() {
      // tab five times to get to the first dot
      const count = Array(5).fill(null);
      for (const _ in count) {
        await user.tab();
      }
    }

    // expect the first slide to be active
    await within(await getActiveItem()).findByText(/Slide One/);

    await tabToSecondDot();

    const focusedEl = getFocusedElement();

    if (focusedEl) {
      // expect the focused el to be the dot
      expect(focusedEl).toHaveAttribute('data-testid', 'glideDot-1');

      // type enter
      await user.keyboard('{Enter}');

      // expect the second slide to be active
      await within(await getActiveItem()).findByText(/Slide Two/);
    }

    await tabToLastDot();

    const focusedEl2 = getFocusedElement();
    if (focusedEl2) {
      // expect the focused el to be the dot
      expect(focusedEl2).toHaveAttribute('data-testid', 'glideDot-2');

      // type space
      await user.keyboard("' '");

      // expect the second slide to be active
      await within(await getActiveItem()).findByText(/Slide Three/);
    }

    await user.tab();

    const focusedEl3 = getFocusedElement();

    if (focusedEl3) {
      // expect the focused el to be the prevButton
      expect(focusedEl3).toHaveAttribute('data-testid', 'goToPrevSlide');

      // type enter
      await user.keyboard('{Enter}');

      // expect the second slide to be active
      await within(await getActiveItem()).findByText(/Slide Two/);
    }

    await user.tab();

    const focusedEl4 = getFocusedElement();

    if (focusedEl4) {
      // expect the focused el to be the prevButton
      expect(focusedEl4).toHaveAttribute('data-testid', 'goToNextSlide');

      // type space
      await user.keyboard(' ');

      // expect the second slide to be active
      await within(await getActiveItem()).findByText(/Slide Three/);
    }
  });

  it('renders loading spinner', async () => {
    render(
      <Glide {...props} loading={true}>
        <h1>Slide One</h1>
        <h1>Slide Two</h1>
        <h1>Slide Three</h1>
      </Glide>,
    );

    screen.getByTestId('loader');
  });
});
