import ApplicationContextProvider, {useApplicationContext} from "../AppContext";
import Metronome from "./Metronome";
import React from "react";
import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as useSound from "use-sound";
import {ExposedData} from "use-sound/dist/types";

describe('<Metronome />', () => {
  const playTickSound = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(useSound, 'default').mockReturnValue([playTickSound, {} as ExposedData])
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  })

  const TestComponent: React.FC = () => {
    const {setTicksPerSecond, setRecordingTimeRemaining} = useApplicationContext();

    return <>
      <Metronome/>
      <button onClick={() => setTicksPerSecond(1)}>Set Ticks Per Second To 10</button>
      <button onClick={() => setRecordingTimeRemaining(10)}>Set Recording Time Remaining To 10</button>
    </>
  }

  const setTicksPerSecondToOne = () => userEvent.click(screen.getByRole('button', {name: 'Set Ticks Per Second To 10'}));
  const setRecordingTimeRemainingToTen = () => userEvent.click(screen.getByRole('button', {name: 'Set Recording Time Remaining To 10'}));

  const renderComponent = (renderFunction = render) => renderFunction(
    <ApplicationContextProvider>
      <TestComponent/>
    </ApplicationContextProvider>
  )

  it('will call playTickSound and toggleFlipped when recordingTimeRemaining is zero and ticksPerSecond is non-zero', () => {
    renderComponent();
    setTicksPerSecondToOne();

    act(() => {
      // Advance one second so the first interval can run.
      jest.advanceTimersByTime(1000);
    });


    expect(playTickSound).toHaveBeenCalled();
    expect(screen.getByRole('img', {name: 'metronome'})).toHaveClass('flipped');
  });

  it('will not call playTickSound or toggleFlipped when recordingTimeRemaining is non-zero and ticksPerSecond is non-zero', () => {
    renderComponent();
    setTicksPerSecondToOne();
    setRecordingTimeRemainingToTen();

    act(() => {
      // Advance one second so the first interval can run.
      jest.advanceTimersByTime(1000);
    });

    expect(playTickSound).not.toHaveBeenCalled();
    expect(screen.getByRole('img', {name: 'metronome'})).not.toHaveClass('flipped');
  });

  it('will not call playTickSound or toggleFlipped when recordingTimeRemaining is zero and ticksPerSecond is zero', () => {
    renderComponent();

    act(() => {
      // Advance one second so the first interval can run.
      jest.advanceTimersByTime(1000);
    });

    expect(playTickSound).not.toHaveBeenCalled();
    expect(screen.getByRole('img', {name: 'metronome'})).not.toHaveClass('flipped');
  });

  it('will not call playTickSound or toggleFlipped when recordingTimeRemaining is non-zero and ticksPerSecond is zero', () => {
    renderComponent();
    setRecordingTimeRemainingToTen();

    act(() => {
      // Advance one second so the first interval can run.
      jest.advanceTimersByTime(1000);
    });

    expect(playTickSound).not.toHaveBeenCalled();
    expect(screen.getByRole('img', {name: 'metronome'})).not.toHaveClass('flipped');
  });
});