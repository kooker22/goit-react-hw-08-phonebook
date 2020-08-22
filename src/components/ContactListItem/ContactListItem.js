import React from 'react';
import { connect } from 'react-redux';
import { deleteContact } from '../../redux/phonebook/phonebook-operations';
import styles from './ContactListItem.module.css';
import { phonebookSelectors } from '../../redux/phonebook';
import { ReactComponent as Icon } from '../../theme/icons/icon.svg';
const ContactListItem = ({ contacts, onDelete, isLoadingContacts }) => (
  <>
    {contacts.map(({ id, name, number }) => (
      <li className={styles.item} key={id}>
        {name}: {number}
        <button
          type="button"
          className={styles.button}
          id={id}
          onClick={() => onDelete(id)}
        >
          <Icon className={styles.icon} />
        </button>
      </li>
    ))}
    {isLoadingContacts && <h1 className={styles.loading}>Загружаем...</h1>}
  </>
);

const mapStateToProps = state => ({
  contacts: phonebookSelectors.getVisibleContacts(state),
  isLoadingContacts: phonebookSelectors.getLoading(state),
});
const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteContact(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem);
