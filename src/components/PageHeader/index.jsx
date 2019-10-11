/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Collapse, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `0px ${theme.spacing(2)}px`,
    background: theme.palette.common.white,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.secondary.dark}`,
  },
}));

const PageHeader = ({ title, profile, hasName }) => {
  const [isCollapse, setCollpase] = useState(false);
  const styles = useStyles();
  useEffect(() => {
    setTimeout(() => {
      setCollpase(true);
    }, 200);
  }, [profile]);

  if (!profile) return null;

  return (
    <Collapse in={isCollapse} timeout={200}>
      <div className={styles.container}>
        <Typography variant="subtitle1">
          {hasName ? `${profile.firstName}’s ${title} ` : title }
        </Typography>
      </div>
    </Collapse>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(PageHeader);
