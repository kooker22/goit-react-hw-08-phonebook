import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../NavBar/NavBar';
import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import { authSelectors } from '../../redux/auth';
import styles from './AppBar.module.css';

const AppBar = ({ isAuthenticated }) => (
  <header className={styles.header}>
    <Navigation />
    {isAuthenticated ? <UserMenu /> : <AuthNav />}
  </header>
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(AppBar);
