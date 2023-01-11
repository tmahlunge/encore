import React from "react";
import ApplicationContextProvider, {useApplicationContext} from "../AppContext";
import {act, render, screen} from "@testing-library/react";
import ButtonAndSliderSection from "./ButtonAndSliderSection";
import userEvent from "@testing-library/user-event";

describe('<ButtonAndSliderSection />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  })

  const TestComponent: React.FC = () => {
    const { recordingTimeRemaining, ticksPerSecond } = useApplicationContext();

    return <>
      <ButtonAndSliderSection/>
      <span>{`Recording Time Remaining: ${recordingTimeRemaining}`}</span>
      <span>{`Ticks Per Second: ${ticksPerSecond}`}</span>
    </>
  };

  const renderComponent = () => render(
    <ApplicationContextProvider>
      <TestComponent/>
    </ApplicationContextProvider>
  );

  describe('"Tap me!" button', () => {
    it('sets recordingTimeRemaining to 2 seconds when button is clicked', () => {
      renderComponent();
      userEvent.click(screen.getByRole('button', { name: "Tap me!" }))

      expect(screen.getByText('Recording Time Remaining: 2')).toBeInTheDocument();
    });

    it('sets the ticks per second to 2 when button clicked 4 times in 2 seconds', () => {
      renderComponent();
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }))
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }))
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }))
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }))

      // Advance two seconds so the recordingTimeRemaining can tick down twice.
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.getByText('Recording Time Remaining: 0')).toBeInTheDocument();
      expect(screen.getByText('Ticks Per Second: 2')).toBeInTheDocument();
    });
  });

  describe('Slider styles', () => {
    it('renders slider with 100% style when 2 seconds are left to register button clicks', () => {
      renderComponent();
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }))

      expect(screen.getByTestId('progress-slider-inner')).toHaveStyle({ width: '100%' });
    });

    it('renders slider with 50% style when 1 second are left to register button clicks', () => {
      renderComponent();
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }))

      act(() => {
        // Advance one second so the recordingTimeRemaining can tick down.
        jest.advanceTimersByTime(1000);
      });

      expect(screen.getByTestId('progress-slider-inner')).toHaveStyle({ width: '50%' });
    });

    it('renders slider with 0% style when 0 seconds are left to register button clicks', () => {
      renderComponent();
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }));

      // Advance two seconds so the recordingTimeRemaining can tick down twice.
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.getByTestId('progress-slider-inner')).toHaveStyle({ width: '0%' });
    });
  });

  describe('Reset Button', () => {
    it('resets recordingTimeRemaining when reset button is clicked', () => {
      renderComponent();
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }));
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }));

      // Advance one second so the recordingTimeRemaining can tick down.
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.getByText('Recording Time Remaining: 1')).toBeInTheDocument();

      // Reset the recording time mid-countdown
      userEvent.click(screen.getByRole('button', { name: 'Reset!' }))

      expect(screen.getByText('Recording Time Remaining: 0')).toBeInTheDocument();
    });

    it('resets ticksPerSecond when reset button is clicked', () => {
      renderComponent();
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }));
      userEvent.click(screen.getByRole('button', { name: 'Tap me!' }));

      // Advance two seconds so the recordingTimeRemaining can tick down twice.
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.getByText('Ticks Per Second: 1')).toBeInTheDocument();

      // Reset the ticks per second after the count is complete
      userEvent.click(screen.getByRole('button', { name: 'Reset!' }))

      expect(screen.getByText('Ticks Per Second: 0')).toBeInTheDocument();
    });
  });
});