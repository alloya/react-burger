import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { ForgotPasswordPage, LoginPage, ProfilePage, RecoverPasswordPage, RegistrationPage, OrderInfoPage, OrdersPage } from '../../pages';
import { IngredientPage } from '../../pages/ingredient-page';
import { LogoutPage } from '../../pages/logout-page';
import { REMOVE_INGREDIENT_INFO_TO_MODAL } from '../../services/actions/ingredient-modal';
import { CLOSE_ALL_POPUPS } from '../../services/actions/modal';
import Header from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import MainPage from '../main/main';
import Modal from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { ingredientModalOpened, orderModalOpened } = useSelector(store => store.modal);
  let background = location.state && location.state?.background;

  const closeModal = () => {
    if (ingredientModalOpened) {
      dispatch({ type: REMOVE_INGREDIENT_INFO_TO_MODAL });
    }
    dispatch({ type: CLOSE_ALL_POPUPS });
    history.goBack();
  }

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
          <OrderInfoPage />
        </ProtectedRoute>
        <Route path="/ingredient/:id" exact>
          <IngredientPage />
        </Route>
        <Route path="/logout" exact>
          <LogoutPage />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
        {/* 
          <Route>
            <NotFound404 />
          </Route> */}
      </Switch>
      {background &&
        <Route path="/ingredient/:id">
          {ingredientModalOpened && <Modal closeModal={closeModal} ><IngredientDetails /></Modal>}
        </Route>}
    </>
  );
}

export default App;