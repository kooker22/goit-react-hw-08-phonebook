import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../components/Form';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';

import { fetchContacts } from '../redux/phonebook/phonebook-operations';
class ContactsPage extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="wrapper">
            <Form onSubmit={this.formSubmitHandler} />
            <Filter />
          </div>
          <ContactList />
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(fetchContacts()),
});

export default connect(null, mapDispatchToProps)(ContactsPage);
