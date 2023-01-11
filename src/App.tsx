import './App.scss';
import * as React from "react";
import ApplicationContextProvider from "./AppContext";
import Header from "./components/Header";
import Metronome from "./components/Metronome";
import ButtonAndSliderSection from "./components/ButtonAndSliderSection";

const App: React.FC = () => {
  return (
    <ApplicationContextProvider>
      <div className="App">
        <Header />
        <Metronome />
        <ButtonAndSliderSection />
      </div>
    </ApplicationContextProvider>
  );
}

export default App;
