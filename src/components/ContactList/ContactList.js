import React from 'react';
import ContactListItem from '../ContactListItem';
import styles from './ContactList.module.css';
const ContactList = () => (
  <ul className={styles.contactList}>
    <ContactListItem />
  </ul>
);

export default ContactList;
