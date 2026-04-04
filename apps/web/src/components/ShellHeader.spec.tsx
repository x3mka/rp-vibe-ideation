import React from 'react';
import { render, screen } from '@testing-library/react';
import { ShellHeader } from './ShellHeader';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: jest.fn(),
}));

// Mock the ideation-registry
jest.mock('@rp-vibe-ideation/ideation-registry', () => ({
  registry: [
    { id: 'test-app', name: 'Test App', description: 'A test app', group: 'Examples', url: 'https://example.com' },
  ],
  groupedRegistry: () => ({
    Examples: [
      { id: 'test-app', name: 'Test App', description: 'A test app', group: 'Examples', url: 'https://example.com' },
    ],
  }),
}));

const { usePathname } = jest.requireMock('next/navigation') as { usePathname: jest.Mock };

describe('ShellHeader', () => {
  it('renders the brand mark', () => {
    usePathname.mockReturnValue('/');
    render(<ShellHeader />);
    expect(screen.getByText('Vibe Ideation')).toBeTruthy();
  });

  it('hides the "Open in new tab" button when no app is active', () => {
    usePathname.mockReturnValue('/');
    render(<ShellHeader />);
    expect(screen.queryByRole('button', { name: /open in new tab/i })).toBeNull();
  });

  it('shows the "Open in new tab" button when an app is active', () => {
    usePathname.mockReturnValue('/ideation/test-app');
    render(<ShellHeader />);
    expect(screen.getByRole('button', { name: /open in new tab/i })).toBeTruthy();
  });

  it('renders app groups in the switcher', () => {
    usePathname.mockReturnValue('/');
    render(<ShellHeader />);
    expect(screen.getByText('Test App')).toBeTruthy();
  });
});
