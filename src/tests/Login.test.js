import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import { VALID_EMAIL, INVALID_EMAIL, VALID_PASSWORD, INVALID_PASSWORD, EMAIL_INPUT, PASSWORD_INPUT } from './helpers/consts';

describe('Testa o componente Login', () => {
  test('1-Testa se os campos de input e botão existem', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
  });

  test('2-Testa se o botão de login existe e começa desabiltado', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByText(/Entrar/i)).toBeDisabled();
  });

  test('3-Testa se o botão de login está habilitado com inputs válidos e se redireciona a rota correta', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    expect(screen.getByText(/Entrar/i)).not.toBeDisabled();
  });

  test('4-Testa se o botão de login está desaabilitado com inputs inválidos', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), INVALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), INVALID_PASSWORD);
    expect(screen.getByText(/Entrar/i)).toBeDisabled();
  });

  test('5-Testa se o botão de login está habilitado com somente email inválido', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), INVALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    expect(screen.getByText(/Entrar/i)).toBeDisabled();
  });

  test('6-Testa se o botão de login está habilitado com somente senha inválida', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), INVALID_PASSWORD);
    expect(screen.getByText(/Entrar/i)).toBeDisabled();
  });

  test('7- Testa se a página de Login tem a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });

  test('8- testa se ao clicar no botão entrar é redirecionado para carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    // renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId('email-input'), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.type(screen.getByText(/Entrar/i));
    expect(history.location.pathname).toBe('/carteira');
  });
});
