import React from "react";
import {MAX_RECORDING_TIME, useApplicationContext} from "../AppContext";

const useHeaderTitle = () => {
  const { ticksPerSecond } = useApplicationContext();
  return { title: `Metronome${ticksPerSecond ? ` - ${ticksPerSecond * 60} Beats Per Minute` : ''}` };
}

const Header: React.FC = () => {
  const { title } = useHeaderTitle();
  return (
    <header className="header">
      <p>
        {title}
      </p>
      <label className="subtitle">
        <p>{`Tap the button below as many times as you want within ${MAX_RECORDING_TIME} seconds to set the tempo.`}</p>
      </label>
    </header>
  )
};

export default Header;