import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import { VALID_EMAIL, INVALID_EMAIL, VALID_PASSWORD, INVALID_PASSWORD } from './helpers/consts';

describe('Testa o componente Login', () => {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginButton = screen.getByTestId('login-submit-btn');

  test('1-Testa se os campos de input existem', () => {
    renderWithRouterAndRedux(<App />);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('2-Testa se o botão de login existe e começa desabiltado', () => {
    renderWithRouterAndRedux(<App />);

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  test('3-Testa se o botão de login está habilitado com inputs válidos', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginButton).not.toBeDisabled();
  });

  test('4-Testa se o botão de login está desaabilitado com inputs inválidos', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(loginButton).toBeDisabled();
  });

  test('5-Testa se o botão de login está habilitado com somente email inválido', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginButton).toBeDisabled();
  });

  test('6-Testa se o botão de login está habilitado com somente senha inválida', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(loginButton).toBeDisabled();
  });
});
