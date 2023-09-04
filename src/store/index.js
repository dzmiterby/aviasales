import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import { aviasalesReducer } from './storeaviasales';

const rootReducer = combineReducers({
  avia: aviasalesReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
