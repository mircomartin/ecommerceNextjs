import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

//Reducers
import { authReducer } from './reducers/authReducer';
import { uiReducer } from './reducers/uiReducer';
import { addressReducer } from './reducers/addressReducer';
import { gamesReducer } from './reducers/gamesReducer';



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    address: addressReducer,
    games: gamesReducer,
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);