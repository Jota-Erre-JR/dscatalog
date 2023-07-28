import { render, screen } from '@testing-library/react';
import ProductPrice from '..';

test('should render ProductPrice', () => {
  const price = 10.1;

  render(<ProductPrice price={price} />);

  expect(screen.getByText('R$')).toBeInTheDocument();
  expect(screen.getByText('10,10')).toBeInTheDocument();
});
