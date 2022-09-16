import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const {
      email,
      totalValue } = this.props;
    return (
      <div>
        Header
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          { totalValue}
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
  totalValue: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
