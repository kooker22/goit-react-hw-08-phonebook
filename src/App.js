//Core
import React, { Component, Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';

//Components

import AppBar from './components/AppBar/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import { authOperations } from './redux/auth';
import { connect } from 'react-redux';
const ContactsPage = lazy(() => import('./PhonebookPages/ContactsPage'));
const Register = lazy(() => import('./PhonebookPages/RegisterPage'));
const LogIn = lazy(() => import('./PhonebookPages/LoginPage'));
class Phonebook extends Component {
  componentDidMount() {
    this.props.onGetCurretnUser();
  }

  render() {
    return (
      <>
        <AppBar />
        <Suspense fallback={<p>Loading... </p>}>
          <Switch>
            <PrivateRoute
              exact
              path="/contacts"
              component={ContactsPage}
              redirectTo="/login"
            />
            <PublicRoute
              path="/register"
              restricted
              redirectTo="/"
              component={Register}
            />
            <PublicRoute
              restricted
              redirectTo="/contacts"
              path="/login"
              component={LogIn}
            />
          </Switch>
        </Suspense>
      </>
    );
  }
}

const mapDispatchToProps = {
  onGetCurretnUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(Phonebook);
