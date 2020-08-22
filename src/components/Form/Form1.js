import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {phonebookSelectors} from '../../redux/phonebook'
import  {addContact}  from '../../redux/phonebook/phonebook-operations';
import styles from './Form.module.css';
import 'react-toastify/dist/ReactToastify.css';
class Form extends Component {
  static propTypes = {
    state: propTypes.objectOf(propTypes.string.isRequired),
  };
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    const notifyDublicate = () => toast('This contact already exist');
    const notifyEmptyInput = ()=> toast('enter name and number')
    const isDublicate = this.props.contacts.some(
      contact => contact.name === this.state.name,
    );
    e.preventDefault();
    if (this.state.name  && this.state.number !== '') {
      if (isDublicate) {
        notifyDublicate();
      } else {
        this.props.onSubmit(this.state);
        this.resetForm();
        return;
      }
    } else {
      notifyEmptyInput()
    }
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              className={styles.input}
            ></input>
          </label>

          <label>
            Number
            <input
              type="tel"
              name="number"
              value={number}
              onChange={this.handleChange}
              className={styles.input}
            ></input>
          </label>
        </div>
        <button type="submit" className={styles.buttonForm}>
          add contact
        </button>
       
      </form>
     <ToastContainer/>
     </>
    );
  }
}
const mapStateToProps = state => ({
  contacts: phonebookSelectors.getContacts(state),
});
const mapDispatchToPtroms = dispatch => ({
  onSubmit: data => dispatch(addContact(data)),
});
export default connect(mapStateToProps, mapDispatchToPtroms)(Form);
