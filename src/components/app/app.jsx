import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ForgotPasswordPage } from '../../pages/forgot-password-page';
import { LoginPage } from '../../pages/login-page';
import { RecoverPasswordPage } from '../../pages/recover-password-page';
import { RegistrationPage } from '../../pages/registration-page';
import Header from '../app-header/app-header';
import MainPage from '../main/main';
import { ProtectedRoute } from '../protected-route/protected-route';
// import { ProvideAuth } from './services/auth';

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
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          {/* <ProtectedRoute path="/list" exact={true}>
            <ListPage />
          </ProtectedRoute>
          <ProtectedRoute path={`/list/:country`} exact={true}>
            <CountryPage />
          </ProtectedRoute>
          <ProtectedRoute path={`/list/:country/:personId`} exact={true}>
            <PersonPage />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route> */}
        </Switch>
      </Router>
    // </ProvideAuth>
  );
}

export default App;