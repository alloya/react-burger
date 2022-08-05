import { useEffect } from 'react';
import 'moment/locale/ru';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { ForgotPasswordPage, LoginPage, ProfilePage, RecoverPasswordPage, RegistrationPage, OrdersPage, IngredientPage, LogoutPage, NotFoundPage, FeedPage, FeedDetailedPage } from '../../pages';
import { REMOVE_INGREDIENT_INFO_TO_MODAL, SHOW_INGREDIENT_DETAILS_POPUP } from '../../services/actions/ingredient-modal';
import { getIngredients } from '../../services/actions/ingredients';
import { CLOSE_ALL_POPUPS } from '../../services/actions/modal';
import Header from '../app-header/app-header';
import MainPage from '../main/main';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { ingredients } = useSelector(store => store.ingredients);
  const { ingredientModalOpened, orderModalOpened } = useSelector(store => store.modal);
  let background = location.state && location.state?.background;

  const closeModal = () => {
    if (ingredientModalOpened) {
      dispatch({ type: REMOVE_INGREDIENT_INFO_TO_MODAL });
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
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
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