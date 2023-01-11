import React, {createContext, PropsWithChildren, useContext, useMemo, useState} from 'react';

const EMPTY_FUNCTION = Object.freeze(() => {});

export const MAX_RECORDING_TIME = 2;

interface ApplicationContextInterface {
  // State Variables
  recordingTimeRemaining: number;
  ticksPerSecond: number;
  // Setters
  setRecordingTimeRemaining: (value: number | ((value: number) => number)) => void;
  setTicksPerSecond: (value: number | ((value: number) => number)) => void;
}

const ApplicationContext = createContext<ApplicationContextInterface>({
  ticksPerSecond: 0,
  setTicksPerSecond: EMPTY_FUNCTION,
  recordingTimeRemaining: 0,
  setRecordingTimeRemaining: EMPTY_FUNCTION
});

const ApplicationContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ticksPerSecond, setTicksPerSecond] = useState(0);
  const [recordingTimeRemaining, setRecordingTimeRemaining] = useState(0);

  const context: ApplicationContextInterface = useMemo(() => ({
    ticksPerSecond,
    setTicksPerSecond,
    recordingTimeRemaining,
    setRecordingTimeRemaining,
  }), [
    ticksPerSecond,
    setTicksPerSecond,
    recordingTimeRemaining,
    setRecordingTimeRemaining
  ]);

  return <ApplicationContext.Provider value={context} >{children}</ApplicationContext.Provider>
}

export const useApplicationContext = () => useContext(ApplicationContext);

export default ApplicationContextProvider;