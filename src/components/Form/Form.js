import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import propTypes from 'prop-types';
import { phonebookSelectors } from '../../redux/phonebook';
import { addContact } from '../../redux/phonebook/phonebook-operations';
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
    const notifyEmptyInput = () => toast('enter name and number');
    const isDublicate = this.props.contacts.some(
      contact => contact.name === this.state.name,
    );
    e.preventDefault();
    if (this.state.name && this.state.number !== '') {
      if (isDublicate) {
        notifyDublicate();
      } else {
        this.props.onSubmit(this.state);
        this.resetForm();
        return;
      }
    } else {
      notifyEmptyInput();
    }
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };
  classes = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  render() {
    const { name, number } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.classes.paper}>
          <Typography component="h1" variant="h5">
            Fill all fields to add contact *
          </Typography>
          <form
            onSubmit={this.handleSubmit}
            className={this.classes.form}
            autoComplete="off"
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              value={name}
              onChange={this.handleChange}
              autoComplete="off"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="number"
              value={number}
              onChange={this.handleChange}
              label="Number"
              type="number"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.classes.submit}
            >
              Add contact
            </Button>
            <ToastContainer />
          </form>
        </div>
      </Container>
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
