import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NoteSaveDb from './NoteSaveDb';
import NotesSyncWithDb from './NotesSyncWithDb';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },
  wrapperBtn: {
    padding: theme.spacing(0, 2),
    display: 'flex',
  },
}));

export default memo(() => {
  const styles = useStyles();
  return (
    <Grid container direction="row" justify="flex-end">
      <div className={styles.wrapperBtn}>
        <NoteSaveDb />
        <NotesSyncWithDb />
      </div>
    </Grid>
  );
});
