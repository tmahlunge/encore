import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('<App />', () => {
  const renderComponent = () => render(<App/>);

  it('renders the ButtonAndSliderSection, a Header and a Metronome', () => {
    renderComponent();
    expect(screen.getByText('Metronome')).toBeInTheDocument();
    expect(screen.getByText('Tap the button below as many times as you want within 2 seconds to set the tempo.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'metronome' })).toBeInTheDocument();
    expect(screen.getByTestId('button-and-slider-section')).toBeInTheDocument()
  });
});