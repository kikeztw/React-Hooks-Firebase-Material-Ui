import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Button,
  TextField,
  Link as MaterialLink,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles((theme) => ({
  root: {

  },
  btn: {

  },
  footer: {

  },
}));


export default () => {
  const styles = useStyle();

  return (
    <div className={styles.root}>
      <Container maxWidth="xs">
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            id="signin-email"
            label="Email"
            margin="normal"
          />
          <TextField
            fullWidth
            id="signin-password"
            label="Password"
            margin="normal"
          />
          <Button variant="contained" fullWidth color="primary" className={styles.btn}>Signin</Button>
        </form>
        <div className={styles.footer}>
          <Grid container>
            <Grid item>
              <MaterialLink to="/signin" component={Link} variant="body2">
                  Do you have an account? Sign in
              </MaterialLink>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};
