import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root') as HTMLElement);
registerServiceWorker();
