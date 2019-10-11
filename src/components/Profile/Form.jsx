/* eslint-disable react/prop-types */
import React, { memo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';

import firebase from '../../firebase';


import { colletionsNames } from '../../utils/constans';

import { uidSelector } from '../../redux/selectors';

const { profile } = colletionsNames;

const userDb = firebase.firestore().collection(profile);


const useStyles = makeStyles((theme) => ({
  formRoot: {
    marginTop: theme.spacing(5),
  },
  wrapperbtn: {
    marginTop: theme.spacing(3),
  },
}));


const ProfileForm = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const profileState = useSelector((state) => state.profile);
  const uid = useSelector(uidSelector);
  const [values, setValues] = useState({
    firstName: profileState ? profileState.firstName : '',
    lastName: profileState ? profileState.lastName : '',
    description: profileState ? profileState.description : '',
    userName: profileState ? profileState.userName : '',
  });

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        setLoading(true);
        const data = { ...values };
        if (!data.description) {
          delete data.description;
        }
        await userDb.doc(uid).update(data);
        dispatch({ type: 'UPDATE_PROFILE', payload: data });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }, [dispatch, uid, values],
  );


  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form noValidate autoComplete="off" className={styles.formRoot}>
      <TextField
        InputProps={{
          defaultValue: values.userName,
        }}
        fullWidth
        id="userName"
        label="User Name"
        onChange={handleChange('userName')}
        margin="normal"
      />
      <TextField
        InputProps={{
          defaultValue: values.firstName,
        }}
        fullWidth
        id="firstName"
        label="FirstName"
        onChange={handleChange('firstName')}
        margin="normal"
      />
      <TextField
        InputProps={{
          defaultValue: values.lastName,
        }}
        fullWidth
        id="lastName"
        label="LastName"
        margin="normal"
        onChange={handleChange('lastName')}
      />
      <TextField
        InputProps={{
          defaultValue: values.description,
        }}
        rows={3}
        multiline
        fullWidth
        id="description"
        label="Description"
        margin="normal"
        onChange={handleChange('description')}
      />
      <div className={styles.wrapperbtn}>
        <Button
          disabled={isLoading}
          variant="contained"
          fullWidth
          color="primary"
          onClick={onSubmit}
        >
          {isLoading && <CircularProgress size={16} />}
          {isLoading ? 'Saving....' : 'save'}
        </Button>
      </div>
    </form>
  );
};


export default memo(ProfileForm);
