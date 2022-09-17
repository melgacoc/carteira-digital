import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  inputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      this.isSubmitButtonDisabled();
    });
  };

  isSubmitButtonDisabled = () => {
    const {
      password,
      email } = this.state;
    const number = 6;
    const verifyPassword = /\S+@\S+\.\S+/;
    const validPassword = verifyPassword.test(email);
    const verifyInput = password.length < number;
    const enable = validPassword && !verifyInput;
    this.setState({
      isButtonDisabled: !enable,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const {
      email } = this.state;
    const {
      dispatch,
      history } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const {
      isButtonDisabled,
      email,
      password } = this.state;
    return (
      <div>
        Login
        <input
          name="email"
          type="email"
          data-testid="email-input"
          onChange={ this.inputChange }
          value={ email }
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          onChange={ this.inputChange }
          value={ password }
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ isButtonDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
