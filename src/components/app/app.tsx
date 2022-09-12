import { useEffect } from 'react';
import 'moment/locale/ru';
import { useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { ForgotPasswordPage, LoginPage, ProfilePage, RecoverPasswordPage, RegistrationPage, OrdersPage, IngredientPage, LogoutPage, NotFoundPage, FeedPage, FeedDetailedPage } from '../../pages';
import { SHOW_INGREDIENT_DETAILS_POPUP } from '../../services/constants/ingredient-modal';
import { getIngredients } from '../../services/actions/ingredients';
import { CLOSE_ALL_POPUPS } from '../../services/constants/modal';
import Header from '../app-header/app-header';
import MainPage from '../main/main';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ProtectedRoute } from '../protected-route/protected-route';
import { IIngredientState } from '../../services/reducers/ingredient';
import { TRootState, useAppDispatch } from '../..';
import { IModalState } from '../../services/reducers/modal';
import { Location } from 'history';
import { TOrder } from '../../utils/types';
import { removeIngredientInfoFromModal } from '../../services/actions/ingredient-modal';

export interface ILocationStateType {
  from?: Location<ILocationStateType>,
  order?: TOrder
}

const App = () => {
  const location = useLocation<ILocationStateType>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { ingredients } = useSelector<TRootState, IIngredientState>(store => store.ingredients);
  const { ingredientModalOpened, orderModalOpened } = useSelector<TRootState, IModalState>(store => store.modal);
  let background = location.state && location.state?.from;
  console.log(background);

  const closeModal = () => {
    if (ingredientModalOpened) {
      dispatch(removeIngredientInfoFromModal());
    }
    dispatch({ type: CLOSE_ALL_POPUPS });
    history.goBack();
  }

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch])

  useEffect(() => {
    if (background) {
      dispatch({ type: SHOW_INGREDIENT_DETAILS_POPUP })
    }
  }, [])

  return (
    <>
      <Header />
      <Switch location={background || location}>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegistrationPage />
        </Route>
        <Route path="/recover-password">
          <RecoverPasswordPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders">
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id">
          <FeedDetailedPage />
        </ProtectedRoute>
        <Route path="/ingredient/:id" exact>
          <IngredientPage />
        </Route>
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact>
          <FeedDetailedPage />
        </Route>
        <Route path="/logout" exact>
          <LogoutPage />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      {
        background && (background.pathname == '/' &&
          <Route path="/ingredient/:id">
            {ingredientModalOpened && <Modal closeModal={closeModal} ><IngredientPage /></Modal>}
          </Route>
          || background.pathname.includes('/feed') &&
          <Route path="/feed/:id">
            <Modal closeModal={closeModal}><FeedDetailedPage /></Modal>
          </Route>
          || background.pathname.includes('/orders') &&
          <ProtectedRoute path="/profile/orders/:id">
            <Modal closeModal={closeModal}><FeedDetailedPage /></Modal>
          </ProtectedRoute>
        )
      }
      {orderModalOpened && <Modal closeModal={closeModal} ><OrderDetails /></Modal>}
    </>
  );
}

export default App;