import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';
import store  from './services/ReduxStore';

export const getQueries = (state: any) => state.queries;

ReactDOM.render(
        <Provider store={store}>
            <ReduxQueryProvider queriesSelector={getQueries}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </ReduxQueryProvider>
        </Provider>

    , document.getElementById('root') as HTMLElement);
// registerServiceWorker();
