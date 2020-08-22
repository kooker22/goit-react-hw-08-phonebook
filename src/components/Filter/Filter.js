import React, { Component } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { changeFilter } from '../../redux/phonebook/phonebook-actions';
import { phonebookSelectors } from '../../redux/phonebook';

class Filter extends Component {
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
    return (
      this.props.contacts.length > 2 && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={this.classes.paper}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Contact Filter"
              value={this.props.value}
              onChange={this.props.onChange}
              autoFocus
            />
          </div>
        </Container>
      )
    );
  }
}
const mapStateToProps = state => ({
  value: phonebookSelectors.getFilter(state),
  contacts: phonebookSelectors.getContacts(state),
});
const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeFilter(e.target.value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
