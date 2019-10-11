import React, {
  useRef, useState, useCallback, memo,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  ClickAwayListener,
  MenuItem,
  Popper,
  MenuList,
  Paper,
} from '@material-ui/core';
import { FaEllipsisV } from 'react-icons/fa';


const useStyles = makeStyles({
  avatar: {
    width: 28,
    height: 28,
  },
  iconContainer: {
    padding: 12,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  popover: {
    zIndex: 300,
  },
  menuItem: {
    minHeight: 'auto',
    fontSize: 14,
    width: 100,
  },
});

export default memo(({ onDelete, onEdit }) => {
  const styles = useStyles();
  const [isOpen, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleActions = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  const handleDelete = useCallback(() => {
    setOpen((state) => !state);
    if (onDelete) {
      onDelete();
    }
  }, [onDelete]);

  return (
    <div ref={anchorRef}>
      <IconButton ria-label="add-item-actions" onClick={handleActions}>
        <FaEllipsisV size={12} color="#000" />
      </IconButton>
      <Popper open={isOpen} anchorEl={anchorRef.current} className={styles.popover}>
        <Paper>
          <ClickAwayListener onClickAway={handleActions}>
            <MenuList>
              <MenuItem className={styles.menuItem} onClick={handleDelete}>
                Delete
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
});


// TodoListItemActions
