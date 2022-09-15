import React, { Component } from 'react';
// import apiRequest from '../services/apiRequest';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resultApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    despesas: '',
    despesasDesc: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    // currencies: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resultApi());
  }

  // passar essas funções pro redux
  // crr = async () => {
  // const crrApiRequest = await apiRequest();
  // this.setState({
  // result: crrApiRequest,
  // });
  // this.filterCrr();
  // }

  // filterCrr = () => {
  // const { result } = this.state;
  // const fresult = Object.keys(result).filter((e) => e !== 'USDT');
  // this.setState({
  // result: fresult,
  // });
  // }

  inputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      despesas,
      despesasDesc,
      currency,
      method,
      tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <input
          data-testid="value-input"
          type="text"
          name="despesas"
          onChange={ this.inputChange }
          value={ despesas }
        />
        <input
          data-testid="description-input"
          type="text"
          name="despesasDesc"
          onChange={ this.inputChange }
          value={ despesasDesc }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.inputChange }
          value={ currency }
        >
          {
            currencies.length > 0 && currencies.map((e) => (
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
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
