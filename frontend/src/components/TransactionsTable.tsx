import { useEffect, useState } from "react";
import moment from 'moment';
import Transaction from "../interfaces/Transaction";
import formatCurrency from "../utils/formatCurrency";
import { getTransactions } from "../services/requests";

function TransactionsTable({ accountId }: { accountId: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [startDateInput, setStartDateInput] = useState<string>('');
  const [endDateInput, setEndDateInput] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const allTransactions = await getTransactions(startDate, endDate);
      setTransactions(allTransactions);
      setFilteredTransactions(allTransactions);
      setIsLoading(false);
    })();
  }, [startDate, endDate]);

  const getTransactionType = (transaction: Transaction): ('cashin' | 'cashout') => {
    return transaction.debitedAccountId === accountId ? 'cashout' : 'cashin';
  }

  const getTransactionStyle = (transaction: Transaction): string => {
    const type = getTransactionType(transaction);

    return type === 'cashout' ? 'text-danger' : 'text-success';
  }

  const filterTransactions = (type: ('cashin' | 'cashout' | 'both')) => {
    setFilteredTransactions(transactions.filter((transaction) => {
      return type === 'both'
        ? true
        : getTransactionType(transaction) === type;
    }));
  }

  const applyDateFilters = () => {
    setStartDate(startDateInput);
    setEndDate(endDateInput);
  };

  const cleanDateFilters = () => {
    setStartDateInput('');
    setEndDateInput('');
    setStartDate('');
    setEndDate('');
  }

  const hasDateFilters = (): boolean => {
    return !!startDate || !!endDate;
  };

  const getDateRangeText = (): string => {
    if (isLoading) return 'Carregando...';
    if (!startDate && !endDate) return '';

    const momentStartDate = moment(startDate).format('DD/MM/YYYY');
    const momentEndDate = moment(endDate).format('DD/MM/YYYY');

    if (startDate && endDate) return startDate === endDate
      ? `No dia ${momentStartDate}`
      : `Entre ${momentStartDate} e ${momentEndDate}`;
    if (startDate) return `A partir de ${momentStartDate}`;
    return `Até ${momentEndDate}`;
  };

  const getNoTransactionsMessage = (): string => {
    if (isLoading) return 'Carregando...';
    if (transactions.length > 0) return '';

    return hasDateFilters()
      ? `Nenhuma transação ${getDateRangeText().toLowerCase()}`
      : `Você ainda não movimentou sua conta`
  };

  return (
    <div className="card">
      <div className="card-body">
        <button className="btn btn-outline-dark float-end" data-bs-toggle="modal" data-bs-target="#modal-filters">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter me-2" viewBox="0 0 16 16">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
          Filtros
        </button>
        {/* <button className="btn btn-outline-dark float-end me-3"> */}
        {/*   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x me-2" viewBox="0 0 16 16"> */}
        {/*     <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> */}
        {/*   </svg> */}
        {/*   Remover filtros */}
        {/* </button> */}
        <h4 className="card-title mb-2">Transfêrencias</h4>
        {transactions.length === 0 ? (
          <h6 className="card-subtitle text-secondary">{getNoTransactionsMessage()}</h6>
        ) : (
          <>
          <h6 className="card-subtitle text-secondary">{getDateRangeText()}</h6>
            <ul className="nav nav-tabs mb-1 mt-4">
              <li className="nav-item">
                <button
                  className="nav-link active text-dark"
                  data-bs-toggle="tab"
                  onClick={ () => filterTransactions('both') }
                >
                  Todas
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link text-dark"
                  data-bs-toggle="tab"
                  onClick={ () => filterTransactions('cashin') }
                >
                  Entrada
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link text-dark"
                  data-bs-toggle="tab"
                  onClick={ () => filterTransactions('cashout') }
                >
                  Saída
                </button>
              </li>
            </ul>
            <table className="table mb-2">
              <tbody>
                {
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{ moment(transaction.createdAt).format('DD/MM/YYYY à[s] H:mm') }</td>
                    <td className={getTransactionStyle(transaction) + ' text-end'}>
                      {getTransactionType(transaction) === 'cashout' ? '-' : ''}
                      {formatCurrency(transaction.value)}
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </>
        )}
      </div>
      <div className="modal fade" id="modal-filters">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filtros</h5>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="start-date-input" className="form-label">Data inicial</label>
                  <input
                    id="start-date-input"
                    className="form-control mb-3"
                    type="date"
                    value={ startDateInput }
                    onChange={ ({ target: { value } }) => setStartDateInput(value) }
                    />
                </div>
                <div className="col-6">
                  <label htmlFor="end-date-input" className="form-label">Data final</label>
                  <input
                    id="end-date-input"
                    className="form-control mb-3"
                    type="date"
                    value={ endDateInput }
                    onChange={ ({ target: { value } }) => setEndDateInput(value) }
                    />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={cleanDateFilters}>Limpar</button>
              <button className="btn btn-dark" data-bs-dismiss="modal" onClick={applyDateFilters}>Aplicar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsTable;
