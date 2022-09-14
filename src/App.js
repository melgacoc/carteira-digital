import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <section>
      <div>Hello, TrybeWallet!</div>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </section>
  );
}

export default App;
