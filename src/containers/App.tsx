import 'babel-polyfill';
import * as React from 'react';
import PrimeMenu from '../components/prime-menu/PrimeMenu';
import './App.css';
import { AppFooter } from '../components/prime-menu/AppFooter';
import { withRouter } from 'react-router';
import { ILocationAwareProps } from '../helpers/props';
import { EmployersView } from 'src/employers/EmployersView';

class App extends React.Component<ILocationAwareProps> {
  public render(): JSX.Element {
    return (
      <div className="App">
        <PrimeMenu />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <EmployersView />
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}


export default withRouter(App);
