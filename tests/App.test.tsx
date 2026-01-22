import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('renders the hero heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /chris mcmillon/i })
    ).toBeInTheDocument();
  });
});
