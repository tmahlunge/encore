import {render, screen} from "@testing-library/react";
import React from "react";
import Header from "./Header";
import ApplicationContextProvider, {useApplicationContext} from "../AppContext";
import userEvent from "@testing-library/user-event";

describe('<Header />', () => {
  const TestComponent: React.FC = () => {
    const {setTicksPerSecond} = useApplicationContext();

    return <>
      <Header/>
      <button onClick={() => setTicksPerSecond(10)}>Set Ticks To Ten</button>
    </>
  };

  const renderComponent = () => render(
    <ApplicationContextProvider>
      <TestComponent/>
    </ApplicationContextProvider>
  );

  it('will display the title correctly when the ticks per second is 0', () => {
    renderComponent();
    expect(screen.getByText('Metronome')).toBeInTheDocument();
  });

  it('will display the title correctly when the ticks per second is non-zero', () => {
    renderComponent();
    userEvent.click(screen.getByRole('button', {name: 'Set Ticks To Ten'}));
    expect(screen.getByText('Metronome - 600 Beats Per Minute')).toBeInTheDocument();
  });

  it('will display the subtitle correctly', () => {
    renderComponent();
    expect(screen.getByText('Tap the button below as many times as you want within 2 seconds to set the tempo.')).toBeInTheDocument();
  });
});