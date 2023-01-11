import React, {CSSProperties, MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import {MAX_RECORDING_TIME, useApplicationContext} from "../AppContext";

const getSliderStyle = (recordingTimeRemaining: number): CSSProperties => ({width: `${(recordingTimeRemaining / MAX_RECORDING_TIME) * 100}%`})

const useButtonState = () => {
  const {recordingTimeRemaining, setRecordingTimeRemaining, setTicksPerSecond} = useApplicationContext();
  const [buttonTaps, setButtonTaps] = useState(0);
  const timeoutIdRef: MutableRefObject<NodeJS.Timer | undefined> = useRef();

  useEffect(() => {
    if (recordingTimeRemaining) {
      // Count down the amount of time left to record button taps.
      timeoutIdRef.current = setTimeout(() => setRecordingTimeRemaining(time => time - 1), 1000)
    } else {
      // Set the ticks per second for the metronome and clear the button tap state.
      setTicksPerSecond(buttonTaps / MAX_RECORDING_TIME);
      setButtonTaps(0);
    }

    return () => {
      clearInterval(timeoutIdRef.current);
    }
  }, [recordingTimeRemaining, setRecordingTimeRemaining]);

  const onButtonClick = useCallback(() => {
    if (!recordingTimeRemaining) {
      // Begin the timer to record user button clicks.
      setRecordingTimeRemaining(MAX_RECORDING_TIME);
    }

    setButtonTaps(buttonTaps => buttonTaps + 1)
  }, [recordingTimeRemaining, setRecordingTimeRemaining, setButtonTaps]);

  const onResetButtonClicked = useCallback(() => {
    setRecordingTimeRemaining(0);
    setTicksPerSecond(0);
    setButtonTaps(0);
  }, [setTicksPerSecond, setRecordingTimeRemaining, setButtonTaps]);

  return { onButtonClick, onResetButtonClicked }
}

const ButtonAndSliderSection: React.FC = () => {
  const { recordingTimeRemaining } = useApplicationContext();
  const { onButtonClick, onResetButtonClicked } = useButtonState();

  return (
    <div data-testid="button-and-slider-section" className="button-and-slider-section">
      <div className="progress-slider">
        <div data-testid="progress-slider-inner" className="progress-slider-inner" style={getSliderStyle(recordingTimeRemaining)}/>
      </div>
      <button className="tempo-recorder-button" onClick={onButtonClick}>Tap me!</button>
      <button className="tempo-recorder-button reset" onClick={onResetButtonClicked}>Reset!</button>
    </div>
  )
}

export default ButtonAndSliderSection;