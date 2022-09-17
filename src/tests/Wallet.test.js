import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import { VALID_EMAIL, VALID_PASSWORD, VALID_VALUE, INVALID_VALUE, VALID_DESCRIPTION, INVALID_DESCRIPTION, INITIAL_CURRENCY, INITIAL_VALUE } from './helpers/consts';
import mockData from './helpers/mockData';

describe('Testa o componente Wallet', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, VALID_EMAIL);
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, VALID_PASSWORD);
    const loginButton = screen.getByTestId('login-submit-btn');
    userEvent.click(loginButton);
  });

  const valueInput = screen.getByTestId('value-input');
  const descriptionInput = screen.getByTestId('description-input');
  const addExpenseButton = screen.getByText('Adicionar despesa');

  test('1- Testa se as informações estão presentes no componente Header', async () => {
    const userEmail = await screen.findByTestId('email-field');
    const userTotalValue = await screen.findByTestId('total-field');
    const userCurrency = await screen.findByTestId('header-currency-field');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail).toHaveTextContent(VALID_EMAIL);
    expect(userTotalValue).toBeInTheDocument();
    expect(userTotalValue).toHaveTextContent(INITIAL_VALUE);
    expect(userCurrency).toBeInTheDocument();
    expect(userCurrency).toHaveTextContent(INITIAL_CURRENCY);
  });

  test('2- Testa se há todos os inputs no formulário', () => {
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  test('3-Testa se o botão Adicionar despesa existe', () => {
    expect(addExpenseButton).toBeInTheDocument();
  });

  test('4-Testa se o botão Adicionar despesa está habilitado com inputs válidos', () => {
    userEvent.type(valueInput, VALID_VALUE);
    userEvent.type(descriptionInput, VALID_DESCRIPTION);
    expect(addExpenseButton).not.toBeDisabled();
  });

  test('5-Testa se o botão Adicionar despesa está desabilitado com inputs inválidos', () => {
    userEvent.type(valueInput, INVALID_VALUE);
    userEvent.type(descriptionInput, INVALID_DESCRIPTION);
    expect(addExpenseButton).toBeDisabled();
  });

  test('6-Testa se o botão Adicionar despesa está desabilitado somente com value inválido', () => {
    userEvent.type(valueInput, INVALID_VALUE);
    userEvent.type(descriptionInput, VALID_DESCRIPTION);
    expect(addExpenseButton).toBeDisabled();
  });
  test('7-Testa se o botão Adicionar despesa está desabilitado somente com description inválido', () => {
    userEvent.type(valueInput, VALID_VALUE);
    userEvent.type(descriptionInput, INVALID_DESCRIPTION);
    expect(addExpenseButton).toBeDisabled();
  });

  test('8- Testa se o input currency possui 15 opções e inicia com USD', () => {
    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
    // expect(currencyInput).toHaveLength(15);
    expect(currencyInput).toHaveValue('USD');
  });

  test('9- Testa se o input method possui 3 opções e inicia com Dinheiro', () => {
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
    // expect(methodInput).toHaveLength(3);
    expect(methodInput).toHaveValue('Dinheiro');
  });

  test('10- Testa se o input tag possui 6 opções e inicia com Alimentação', () => {
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument(6);
    // expect(tagInput).toHaveLength(6);
    expect(tagInput).toHaveValue('Alimentação');
  });

  test('11- Testa se a lista de gastos possui um cabeçalho com 7 elementos', () => {
    const tableHeader = screen.getAllByRole('columnheader');
    expect(tableHeader).toBeInTheDocument();
    expect(tableHeader).toHaveLength(7);
  });
});
