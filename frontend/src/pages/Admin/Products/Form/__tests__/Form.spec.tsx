import { render, screen, waitFor } from '@testing-library/react';
import Form from '../';
import { Router, useParams } from 'react-router-dom';
import history from 'util/history';
import userEvent from '@testing-library/user-event';
import { server } from './fixtures';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Product form create tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: 'create',
    });
  });

  test('Should show toast and redirect when submit form correctly', async () => {
    render(
      <Router history={history}>
        <ToastContainer />
        <Form />
      </Router>
    );

    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categorias');

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '3999.99');
    userEvent.type(
      imgUrlInput,
      'https://github.com/Jota-Erre-JR/dscatalog/blob/main/backend/img/10-small.jpg'
    );
    userEvent.type(descriptionInput, 'Super rápido e blablablalbal');

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText(
        'Produto cadastrado com sucesso!'
      );
      expect(toastElement).toBeInTheDocument();
    });

    expect(history.location.pathname).toEqual('/admin/products');
  });
});
