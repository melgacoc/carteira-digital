import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleDeleteButton = (id) => {
    // event.preventDefault();
    // const { deleteExpense } = this.props;
    const { dispatch } = this.props;
    // const id = event.target.id;
    console.log(id);
    dispatch(deleteExpense(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          {expenses.length > 0 && (
            expenses.map((e) => {
              const {
                id,
                tag,
                description,
                method,
                value,
                currency,
                exchangeRates: { [currency]: { ask, name } } } = e;
              const totalValue = Number((value) * (ask)).toFixed(2);
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ parseFloat(value).toFixed(2) }</td>
                  <td>{ parseFloat(ask).toFixed(2) }</td>
                  <td>{ name }</td>
                  <td>{ totalValue }</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.handleDeleteButton(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape,
  )
    .isRequired,
  // deleteExpense: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
// deleteTheExpense: (id) => dispatch(deleteExpense(id)),
// });

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
