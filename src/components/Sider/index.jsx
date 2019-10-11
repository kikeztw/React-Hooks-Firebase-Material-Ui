/* eslint-disable react/self-closing-comp */
import React, { memo, useState } from 'react';
import {
  IconButton,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';


const useStyles = makeStyles((theme) => ({
  sider: {
    position: 'relative',
    width: 300,
  },
  siderHeader: {
    padding: '5px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  siderBody: {
    position: 'fixed',
    height: '100%',
    width: 300,
    backgroundColor: '#f5f5f5',
    boxSizing: 'border-box',
    zIndex: 100,
    transition: 'transform .3s ease-in-out',
    overflow: 'hidden',
  },
  siderOn: {
    transform: 'translateX(0%)',
  },
  siderOff: {
    transform: 'translateX(-100%)',
  },
  closeButtonWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 50,
    padding: '5px 24px',
  },
  actionsSider: {
    width: 'calc(100% - 36px)',
  },
  siderHasActions: {
    justifyContent: 'space-between',
  },
  siderHasNotActions: {
    justifyContent: 'flex-end',
  },
  icon: {
    color: theme.palette.secondary.dark,
  },
}));

export default memo(({
  children, visible, onOpen, onClose, actions,
}) => {
  const styles = useStyles();
  const handlerSider = () => {
    onOpen();
  };
  return (
    <div className={styles.sider}>
      <div className={styles.closeButtonWrapper}>
        <IconButton
          onClick={handlerSider}
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <FaAngleDoubleRight size={12} className={styles.icon} />
        </IconButton>
      </div>
      <div className={visible ? `${styles.siderBody} ${styles.siderOn}` : `${styles.siderBody} ${styles.siderOff}`}>
        <div className={actions ? `${styles.siderHeader} ${styles.siderHasActions}` : `${styles.siderHasNotActions} ${styles.siderHeader}`}>
          {
            actions && (
              <div className={styles.actionsSider}>
                {actions}
              </div>
            )
          }
          <IconButton
            onClick={handlerSider}
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <FaAngleDoubleLeft size={12} className={styles.icon} />
          </IconButton>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
});
