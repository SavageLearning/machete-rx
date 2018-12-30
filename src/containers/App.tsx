import 'babel-polyfill';
import * as React from 'react';
import AppContent from '../components/AppContent';
import PrimeMenu from '../components/prime-menu/PrimeMenu';
import './App.css';
import { AppFooter } from '../components/prime-menu/AppFooter';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <PrimeMenu />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <AppContent />
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}

export default App;
