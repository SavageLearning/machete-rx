import 'babel-polyfill';
import * as React from 'react';
import AppContent from '../components/AppContent';
import PrimeMenu from '../components/prime-menu/PrimeMenu';
import './App.css';
import { AppFooter } from '../components/prime-menu/AppFooter';
import { IApplicationState } from '../redux/state';
import { loadEmployer } from '../redux/employer';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { ILocationAwareProps } from '../helpers/props';

interface IAppProps extends ILocationAwareProps {
  handleLoadEmployer: () => void;
}

class App extends React.Component<IAppProps> {
  public render(): JSX.Element {
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

  public componentDidMount(): void {
    const { handleLoadEmployer, } = this.props;
    handleLoadEmployer();
  }
}

// Returns the slice of the Redux state that's available to this component
const mapStateToProps = (state: IApplicationState) => ({
  employer: state.employer.employer,
});

// A mapping of Redux actions available to this component
const mapDispatchToProps = (dispatch: any) => {
  return {
    handleLoadEmployer: () => dispatch(loadEmployer())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
