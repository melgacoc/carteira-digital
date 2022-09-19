import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiRequest from '../services/apiRequest';
import { resultApi, saveExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatchApi } = this.props;
    dispatchApi();
  }

  inputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChanges = async (event, action) => {
    event.preventDefault();
    const {
      value,
      currency,
      id,
      description,
      method,
      tag } = this.state;
    const {
      dispatchSaveExpense } = this.props;
    const fetchApi = await apiRequest(action);
    const exchangeRates = fetchApi;
    dispatchSaveExpense({ id, value, description, currency, method, tag, exchangeRates });
    // });
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <input
          data-testid="value-input"
          type="number"
          name="value"
          onChange={ this.inputChange }
          value={ value }
        />
        <input
          data-testid="description-input"
          type="text"
          name="description"
          onChange={ this.inputChange }
          value={ description }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.inputChange }
          value={ currency }
        >
          {
            currencies.map((e) => (
              <option key={ e } value={ e }>{ e }</option>
            ))
          }
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.inputChange }
        >
          <option
            value="Dinheiro"
          >
            Dinheiro
          </option>
          <option
            value="Cartão de crédito"
          >
            Cartão de crédito
          </option>
          <option
            value="Cartão de débito"
          >
            Cartão de débito
          </option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.inputChange }
        >
          <option value="Alimentação">
            Alimentação
          </option>
          <option value="Lazer">
            Lazer
          </option>
          <option value="Trabalho">
            Trabalho
          </option>
          <option value="Transporte">
            Transporte
          </option>
          <option value="Saúde">
            Saúde
          </option>
        </select>
        <button
          type="button"
          onClick={ this.handleChanges }
          disabled={ !value || !description }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchApi: PropTypes.func.isRequired,
  dispatchSaveExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveExpense: (expense) => dispatch(saveExpense(expense)),
  dispatchApi: (result) => dispatch(resultApi(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
