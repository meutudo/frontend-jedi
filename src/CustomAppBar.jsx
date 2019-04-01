import React, { Fragment } from 'react';
import {
  Toolbar, Typography, AppBar, IconButton, Icon,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/HomeRounded';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './component/Loading';

const styles = {
  loading: {
    position: 'absolute', right: '25px',
  },
};

const CustomAppBar = ({ isLoading }) => (
  <Fragment>
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <IconButton>
          <Link to="/">
            <HomeIcon />
          </Link>
        </IconButton>
        <Typography variant="h6" color="inherit">
          Frontend Jedi
        </Typography>
        <Icon style={styles.loading}>
          {isLoading && <Loading />}
        </Icon>
      </Toolbar>
    </AppBar>
  </Fragment>

);

CustomAppBar.defaultProps = {
  isLoading: false,
};

CustomAppBar.propTypes = {
  isLoading: bool,
};

const mapStateToProps = state => ({
  isLoading: state.ui.get('loading'),
});

export default connect(mapStateToProps)(CustomAppBar);
