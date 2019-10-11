import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  img: {
    width: '100%',
  },
}));

export default ({ img }) => {
  const styles = useStyle();
  return (
    <Grid item xs={3}>
      <div>
        <img src={require(`../../assets/images/${img}`)} atl="some description" className={styles.img} />
      </div>
    </Grid>
  );
};
