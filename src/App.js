import React from 'react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';

function App() {

  const [refreshDashboard, setRefreshDashboard] = React.useState(false);

  const handleTransactionAdded = () => {
    setRefreshDashboard(prev => !prev);
  }

  return (
    <div className="App">
      <h1>Painel de Finanças</h1>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <hr />
      <Dashboard key={refreshDashboard} />
    </div>
  );
}

export default App;
