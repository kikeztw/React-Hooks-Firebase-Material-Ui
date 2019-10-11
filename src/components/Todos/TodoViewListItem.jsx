import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  li: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default memo((props) => {
  const styles = useStyles();
  const { children } = props;
  return (
    <li className={styles.li}>
      {children}
    </li>
  );
});
