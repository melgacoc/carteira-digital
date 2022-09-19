import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import { VALID_EMAIL, VALID_PASSWORD, VALID_VALUE, INVALID_VALUE,
  VALID_DESCRIPTION, INVALID_DESCRIPTION, INITIAL_CURRENCY,
  INITIAL_VALUE, EMAIL_INPUT, PASSWORD_INPUT, CURRENCY_INPUT,
  VALUE_INPUT, DESCRIPTION_INPUT, METHOD_INPUT, TAG_INPUT } from './helpers/consts';
import mockData from './helpers/mockData';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockData),
  }));

  const { history } = renderWithRouterAndRedux(<App />);

  userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
  userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
  userEvent.click(screen.getByText(/Entrar/i));
  expect(history.location.pathname).toBe('/carteira');
});

describe('Testa o componente Wallet', () => {
  test('1- Testa se as informações estão presentes no componente Header', async () => {
    expect(screen.getByText('email-field')).toBeInTheDocument();
    expect(screen.getByTestId('email_field')).toHaveTextContent(VALID_EMAIL);
    expect(screen.getByTestId('TOTAL_FIELD')).toBeInTheDocument();
    expect(screen.getByTestId('TOTAL_FIELD')).toHaveTextContent(INITIAL_VALUE);
    expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
    expect(screen.getByTestId('header-currency-field')).toHaveTextContent(INITIAL_CURRENCY);
  });

  test('2- Testa se há todos os inputs no formulário', () => {
    expect(screen.getByTestId(VALUE_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(DESCRIPTION_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(CURRENCY_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(METHOD_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(TAG_INPUT)).toBeInTheDocument();
  });

  test('3-Testa se o botão Adicionar despesa existe', () => {
    expect(screen.getByText(/Adicionar despesa/i)).toBeInTheDocument();
  });

  test('4-Testa se o botão Adicionar despesa está habilitado com inputs válidos', () => {
    userEvent.type(screen.getByTestId(VALUE_INPUT), VALID_VALUE);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), VALID_DESCRIPTION);
    expect(screen.getByText(/Adicionar despesa/i)).not.toBeDisabled();
  });

  test('5-Testa se o botão Adicionar despesa está desabilitado com inputs inválidos', () => {
    userEvent.type(screen.getByTestId(VALUE_INPUT), INVALID_VALUE);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), INVALID_DESCRIPTION);
    expect(screen.getByText(/Adicionar despesa/i)).toBeDisabled();
  });

  test('6-Testa se o botão Adicionar despesa está desabilitado somente com value inválido', () => {
    userEvent.type(screen.getByTestId(VALUE_INPUT), INVALID_VALUE);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), VALID_DESCRIPTION);
    expect(screen.getByText(/Adicionar despesa/i)).toBeDisabled();
  });

  test('7-Testa se o botão Adicionar despesa está desabilitado somente com description inválido', () => {
    userEvent.type(screen.getByTestId(VALUE_INPUT), VALID_VALUE);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), INVALID_DESCRIPTION);
    expect(screen.getByText(/Adicionar despesa/i)).toBeDisabled();
  });
});

describe('Contnua Testando o componente Wallet', () => {
  test('8- Testa se o valor muda ao adicionar despesa e excluir despesa', async () => {
    const totalValueInitial = screen.getByTestId('total-field');
    expect(totalValueInitial).toBeInTheDocument();
    expect(totalValueInitial.innerHTML).toBe('0.00');

    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
    userEvent.type(valueInput, '100.00');

    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
    userEvent.type(descriptionInput, 'Teste');

    const addButton = screen.getByRole('button', /Adicionar despesa/i);
    expect(addButton).not.toBeDisabled();
    userEvent.click(addButton);
    const findValue = await screen.findByTestId('total-field');
    expect(findValue.innerHTML).toBe('475.31');

    const deleteButton = await screen.findByTestId('delete-btn');
    userEvent.click(deleteButton);

    expect(findValue.innerHTML).toBe('0.00');
  });
});
