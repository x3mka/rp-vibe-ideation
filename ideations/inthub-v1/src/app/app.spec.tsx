import { render } from '@testing-library/react';
import App from './app';

it('renders without errors', () => {
  expect(() => render(<App />)).not.toThrow();
});
