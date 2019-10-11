import React, { memo } from 'react';
import { Container, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(12),
  },
  p: {
    marginTop: theme.spacing(4),
    '& p': {
      color: '#4c4c4c',
    },
  },
  title: {
    fontWeight: 300,
  },
}));

export default memo(() => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Container maxWidth="sm">
        <Typography variant="h5" className={styles.title} component="p" gutterBottom>
          My todo list
        </Typography>
        <Divider />
        <div className={styles.p}>
          <Typography variant="caption" component="p">
          Here you can write you delay todo, this will store in the cloud so
          you can check your todo liste after from other device :)
          </Typography>
        </div>
      </Container>
    </div>
  );
});
