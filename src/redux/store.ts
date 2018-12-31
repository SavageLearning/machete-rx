import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore, Store } from 'redux';
import { InitialState, IApplicationState } from './state';

function configureStore(): Store<IApplicationState> {
    // redux-thunk: it is a middleware that looks at every
    // action that passes through the system, and if it’s a 
    // function, it calls that function. That’s all it does.
    // https://daveceddia.com/what-is-a-thunk/
    const middleware = applyMiddleware(thunk);

    return createStore(
        rootReducer,
        InitialState,
        composeWithDevTools(middleware)
    );
}

export let store = configureStore();
