/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { List } from '@material-ui/core';
import TodoListItem from './TodoListItem';


const TodoListMenu = () => {
  const todosList = useSelector((state) => state.todos.todosList);
  const todosListArray = todosList ? Object.values(todosList) : [];

  return (
    <List dense disablePadding>
      {todosListArray.map((e) => (
        <TodoListItem
          key={e.tempId || e.id}
          id={e.tempId || e.id}
          title={e.title}
          itemsId={e.items}
        />
      ))}
    </List>
  );
};

export default memo(TodoListMenu);
