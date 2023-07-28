import { render, screen } from '@testing-library/react';
import Pagination from '..';

describe('Pagination tests', () => {
  test('should render pagination', () => {
    const pageCount = 3;
    const pageRange = 3;

    render(<Pagination pageCount={pageCount} pageRange={pageRange} />);

    const page1 = screen.getByText('1');
    const page2 = screen.getByText('2');
    const page3 = screen.getByText('3');
    const page4 = screen.queryByText('4');

    expect(page1).toBeInTheDocument();
    expect(page1).toHaveClass('pagination-link-active');

    expect(page2).toBeInTheDocument();
    expect(page2).not.toHaveClass('pagination-link-active');

    expect(page3).toBeInTheDocument();
    expect(page3).not.toHaveClass('pagination-link-active');

    expect(page4).not.toBeInTheDocument();
  });
});
