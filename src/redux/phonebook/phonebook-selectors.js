import {createSelector} from '@reduxjs/toolkit';

const getContacts = state => {
  const contacts = state.phonebook.contacts;
  return contacts;
};
const getFilter = state => {
  const filter = state.phonebook.filter;
  return filter;
};
const getLoading = state => {
  const loading = state.phonebook.loading;
  return loading;
};
const getVisibleContacts = createSelector([getContacts,getFilter], 
    (contacts,filter) => {
        const normolizeContact = filter.toLowerCase();
        return contacts.filter(({ name }) =>
        name.toLowerCase().includes(normolizeContact),
      );
    })


export default {
  getContacts,
  getFilter,
  getLoading,
  getVisibleContacts,
};
