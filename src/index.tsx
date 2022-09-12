import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, ActionCreator, Action } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from './services/websocket/socketMiddleware';
import { TWSActions, wsActions } from './services/actions/websocket';
import { TAuthActions } from './services/actions/auth';
import { TCheckoutAction } from './services/actions/checkout';
import { TConstructorAction } from './services/actions/constructor';
import { TIngredientsActions } from './services/actions/ingredients';
import { TIngredientModalActions } from './services/actions/ingredient-modal';
import { TModalActions } from './services/actions/modal';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions))));

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  //<React.StrictMode>
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  //</React.StrictMode>
);

export const useAppDispatch = () => useDispatch<TAppDispatch & TAppThunk>();
export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

type TApplicationActions = TAuthActions | TCheckoutAction | TConstructorAction | TIngredientsActions | TIngredientModalActions | TModalActions | TWSActions;

export type TAppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
