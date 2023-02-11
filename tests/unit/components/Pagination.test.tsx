import { render, fireEvent } from '@testing-library/react';
import Pagination from '../../../src/components/pagination';

const onChangePage = jest.fn();

describe('Pagination', () => {
  it('renders without crashing', () => {
    const { container } = render(<Pagination totalItems={20} perPage={5} pageItems={5} currentPage={1} onChangePage={onChangePage} />);

    expect(container).toBeDefined();
  });

  it('renders the previous button correctly', () => {
    const { getByText } = render(<Pagination totalItems={10} perPage={5} pageItems={1} currentPage={1} onChangePage={onChangePage} />);

    const prevButton = getByText('Previous');

    expect(prevButton).toBeDefined();
    expect(prevButton).not.toHaveAttribute('disabled=""');
  });

  it('renders the next button correctly', () => {
    const { getByText } = render(<Pagination totalItems={10} perPage={5} pageItems={1} currentPage={1} onChangePage={onChangePage}  />);

    const nextButton = getByText('Next');

    expect(nextButton).toBeDefined();
    expect(nextButton).not.toHaveAttribute('disabled=""');
  });

  it('calls the onChangePage function with the correct value when the prev button is clicked', () => {
    const { getByText } = render(<Pagination totalItems={20} perPage={5} pageItems={4} currentPage={2} onChangePage={onChangePage} />);

    const prevButton = getByText('Previous');
    fireEvent.click(prevButton);

    expect(onChangePage).toHaveBeenCalledWith(1);
  });

  it('calls the onChangePage function with the correct value when the next button is clicked', () => {
    const onChangePage = jest.fn();

    const { getByText } = render(<Pagination totalItems={20} perPage={5} pageItems={5} currentPage={1} onChangePage={onChangePage} />);

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(onChangePage).toHaveBeenCalledWith(2);
  });
});