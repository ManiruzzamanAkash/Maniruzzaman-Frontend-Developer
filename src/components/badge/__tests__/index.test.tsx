import { render } from '@testing-library/react';
import Badge from '../';

describe('Badge', () => {
  it('renders the correct background color for the active status', () => {
    const { container } = render(<Badge status="active" />);
    expect(container.firstChild).toHaveStyle(`background: #2ea043`);
  });

  it('renders the correct background color for the retired status', () => {
    const { container } = render(<Badge status="retired" />);
    expect(container.firstChild).toHaveStyle(`background: red`);
  });

  it('renders the correct background color for the unknown status', () => {
    const { container } = render(<Badge status="unknown" />);
    expect(container.firstChild).toHaveStyle(`background: #ccc`);
  });

  it('renders the correct text color', () => {
    const { container } = render(<Badge status="active" />);
    expect(container.firstChild).toHaveStyle(`color: #fff`);
  });

  it('renders the correct text transformation', () => {
    const { container } = render(<Badge status="active" />);
    expect(container.textContent).toBe('active');
  });
});