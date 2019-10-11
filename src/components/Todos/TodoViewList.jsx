/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import TodoViewListItem from './TodoViewListItem';
import TodoViewListItemForm from './TodoViewListItemForm';
import TodoViewListItemTrashBtn from './TodoViewListItemTrashBtn';

const useStyles = makeStyles((theme) => ({
  ul: {
    maxWidth: '50%',
    width: '100%',
  }
}));


const TodoViewList = (props) => {
  const { itemsIds } = props;
  const styles = useStyles();
  const todosItems = useSelector((state) => state.todos.todosItems);

  if (!Object.values(todosItems).length) return null;

  return (
    <ul className={styles.ul}>
      {itemsIds.map((e) => (
        <TodoViewListItem
          key={todosItems[e].tempId || todosItems[e].id}
        >
          <TodoViewListItemForm
            title={todosItems[e].title}
            status={todosItems[e].status}
            id={todosItems[e].tempId || todosItems[e].id}
          />
          <TodoViewListItemTrashBtn ItemId={todosItems[e].tempId || todosItems[e].id} />
        </TodoViewListItem>
      ))}
    </ul>
  );
};


export default memo(TodoViewList);
