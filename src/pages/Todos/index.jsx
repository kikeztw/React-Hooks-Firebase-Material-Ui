import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import Sider from '../../components/Sider';
import {
  TodoHome,
  TodoListMenu,
  TodoSiderHeader,
  TodoView,
} from '../../components/Todos';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  container: {
    marginLeft: 'auto',
    transition: 'width .3s ease-in-out',
  },
  containerOn: {
    width: 'calc(100% - 300px)',
  },
  containerOff: {
    width: 'calc(100% - 72px)',
  },
}));

const Todos = ({ match, history }) => {
  const styles = useStyles();
  const [isOpen, setOpen] = useState(true);
  const { path } = match;
  const handlerSider = () => {
    setOpen((state) => !state);
  };


  return (
    <div className={styles.root}>
      <Sider visible={isOpen} onOpen={handlerSider} actions={<TodoSiderHeader />}>
        <TodoListMenu />
      </Sider>
      <div className={isOpen ? `${styles.container} ${styles.containerOn}` : `${styles.container} ${styles.containerOff}`}>
        <Switch>
          <Route path={`${path}/:id`} component={TodoView} />
          <Route exact path={path} component={TodoHome} />
        </Switch>
      </div>
    </div>
  );
};


export default Todos;
