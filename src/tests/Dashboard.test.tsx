import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dashboard from '@/pages/Dashboard';

describe('Dashboard', () => {
  it('Renders Dashboard', async () => {
    const { getByText } = render(<Dashboard />);

    const element = screen.getByText('Hello');
    const styles = getComputedStyle(element);
    console.log(styles);
    expect(getByText('Hello')).toBeVisible();
  });
});
