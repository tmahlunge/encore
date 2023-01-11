import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import metronome from "../images/metronome.png";
import { useApplicationContext} from "../AppContext";
import tick from '../sounds/tick.mp3';
import useSound from "use-sound";

const getMetronomeClassName = (flipped: boolean) => `metronome ${flipped ? 'flipped' : ''}`

const useMetronomeState = () => {
  const { recordingTimeRemaining, ticksPerSecond } = useApplicationContext();
  const intervalIdRef: MutableRefObject<NodeJS.Timer | undefined> = useRef();
  const [flipped, setMetronomeFlipped] = useState(false);
  const toggleFlipped = useCallback(() => setMetronomeFlipped(flipped => !flipped), [setMetronomeFlipped]);
  const [playTickSound] = useSound(tick);

  useEffect(() => {
    // Only play the metronome's ticking behaviour if the button is not recording and ticksPerSecond is set non-zero
    //   (otherwise we're dividing by zero)
    if (!recordingTimeRemaining && ticksPerSecond) {
      intervalIdRef.current = setInterval(() => {
        playTickSound()
        toggleFlipped();
      }, (1/ticksPerSecond) * 1000);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    }
  }, [toggleFlipped, playTickSound, recordingTimeRemaining, ticksPerSecond]);

  return { flipped };
}

const Metronome: React.FC = () => {
  const { flipped } = useMetronomeState();

  return <img src={metronome} aria-label="metronome" className={getMetronomeClassName(flipped)} alt="metronome"/>
};

export default Metronome;