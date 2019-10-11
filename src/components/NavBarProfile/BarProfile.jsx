import React, { useRef, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Avatar,
  ClickAwayListener,
  MenuItem,
  Popper,
  MenuList,
  Paper,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import LogOut from './LogOut';

const useStyles = makeStyles({
  avatar: {
    width: 32,
    height: 32,
  },
  iconContainer: {
    padding: 12,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

function AppBarComponent(props) {
  const [isOpen, setOpen] = useState(false);
  const profile = useSelector((state) => state.profile);
  const anchorRef = useRef(null);
  const styles = useStyles();

  const menuId = 'primary-search-account-menu';

  const handlerOpen = () => {
    setOpen(true);
  };
  const handlerClose = () => {
    setOpen(false);
  };

  if (!profile) {
    return (
      <div className={styles.iconContainer}>
        <Skeleton variant="circle" width={28} height={28} />
      </div>
    );
  }


  return (
    <div ref={anchorRef}>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handlerOpen}
        color="inherit"
      >
        <Avatar alt="Remy Sharp" src={profile.picture} className={styles.avatar} />
      </IconButton>
      <Popper open={isOpen} anchorEl={anchorRef.current} style={{ zIndex: 1000 }}>
        <Paper>
          <ClickAwayListener onClickAway={handlerClose}>
            <MenuList>
              <MenuItem onClick={handlerClose}>
                <Link className={styles.link} to="/profile">Profile</Link>
              </MenuItem>
              <LogOut />
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>

  );
}


export default withRouter(AppBarComponent);
