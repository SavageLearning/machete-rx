import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';
import store  from './services/ReduxStore';

export const getQueries = (state: any) => state.queries;

ReactDOM.render(
        <Provider store={store}>
            <ReduxQueryProvider queriesSelector={getQueries}>
                <BrowserRouter>
                    <SnackbarProvider 
                        anchorOrigin= {{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        maxSnack={3}
                        preventDuplicate={true}
                    >
                        <App />
                    </SnackbarProvider>
                </BrowserRouter>
            </ReduxQueryProvider>
        </Provider>

    , document.getElementById('root') as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
