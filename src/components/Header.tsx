import React from "react";
import {MAX_RECORDING_TIME, useApplicationContext} from "../AppContext";

const Header: React.FC = () => {
  const { ticksPerSecond } = useApplicationContext();

  return (
    <header className="header">
      <p>
        {`Metronome${ticksPerSecond ? ` - ${ticksPerSecond * 60} Beats Per Minute` : ''}`}
      </p>
      <label className="subtitle">
        <p>{`Tap the button below as many times as you want within ${MAX_RECORDING_TIME} seconds to set the tempo.`}</p>
      </label>
    </header>
  )
};

export default Header;