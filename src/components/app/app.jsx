import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ForgotPasswordPage, LoginPage, ProfilePage, RecoverPasswordPage, RegistrationPage, OrderInfoPage, OrdersPage } from '../../pages';
import Header from '../app-header/app-header';
import MainPage from '../main/main';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  return (
    // <ProvideAuth>
      <Router>
        <Header />
        <Switch>
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
          <Route path="/" exact>
            <MainPage />
          </Route>
          {/* 
          <Route>
            <NotFound404 />
          </Route> */}
        </Switch>
      </Router>
    // </ProvideAuth>
  );
}

export default App;