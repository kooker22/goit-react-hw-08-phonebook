import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';

const AuthNav = () => (
  <div className={styles.menu}>
    <button type="button" className={styles.btn}>
      <NavLink to="/register" exact className={styles.link}>
        Sign Up
      </NavLink>
    </button>
    <button type="button" className={styles.btn}>
      <NavLink to="/login" exact className={styles.link}>
        Log in
      </NavLink>
    </button>
  </div>
);

export default AuthNav;
