import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const {
      email,
      expenses } = this.props;

    let total = 0;
    if (expenses.length > 0) {
      const result = [];
      // const { expenses } = this.props;
      expenses.forEach((e) => {
        const totalValue = (e.value * (e.exchangeRates[e.currency].ask)).toFixed(2);
        result.push(Number(totalValue));
      });
      const totalValor = result.reduce((acc, curr) => acc + curr);
      total += totalValor;
    }
    console.log(total);

    return (
      <div>
        Header
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          { total }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape,
  )
    .isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
