import { render, screen } from '@testing-library/react';
import ButtonIcon from '..';

test('ButtonIcon should render button with given text', () => {
  //ARRANGE

  const text = 'Fazer Login';

  //ACT

  render(<ButtonIcon text={text} />);

  //ASSERT

  expect(screen.getByText(text)).toBeInTheDocument();
  expect(screen.getByTestId("arrow")).toBeInTheDocument();
});
