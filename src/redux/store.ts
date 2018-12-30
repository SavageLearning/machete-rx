import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore, Store } from 'redux';
import { InitialState, IApplicationState } from './state';

function configureStore(): Store<IApplicationState> {
    // Incorporate the 'thunk' library, to simplify the dispatching of async actions.
    const middleware = applyMiddleware(thunk);

    return createStore(
        rootReducer,
        InitialState,
        composeWithDevTools(middleware) // Hook up to Redux debugging.
    );
}

/** The data store for the application. */
export let store = configureStore();
