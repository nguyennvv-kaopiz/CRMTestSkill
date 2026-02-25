import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

function renderApp() {
  return render(<App />);
}

describe('App', () => {
  it('should render navigation with Dashboard, Khách hàng, Lead, Pipeline, Đơn hàng', () => {
    renderApp();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Khách hàng/i)).toBeInTheDocument();
    expect(screen.getByText(/Lead/i)).toBeInTheDocument();
    expect(screen.getByText(/Pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Đơn hàng/i)).toBeInTheDocument();
  });
});
