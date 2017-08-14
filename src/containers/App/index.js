import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import logo from '../../logo.svg';
import '../../styles/App.css';

import { defaultAction } from './actions';
import { makeSelectLoading, makeSelectError } from './selectors';

import Routes from '../../routes';

class App extends React.PureComponent {
  componentDidMount() {
    this.props.doDefaultAction();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Routes />
      </div>
    );
  }
}

App.PropTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    doDefaultAction: () => dispatch(defaultAction()),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
