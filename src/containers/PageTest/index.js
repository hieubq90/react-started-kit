import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { makeSelectPageName } from './selectors';
import { defaultAction } from './actions';

import '../../styles/App.css';

class TestPage extends React.PureComponent {
  componentDidMount() {
    this.props.doDefaultAction();
  }

  render() {
    const { pageName } = this.props;
    return (
      <p className="App-intro">
        {pageName}
      </p>
    );
  }
}

TestPage.PropTypes = {
  pageName: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    doDefaultAction: evt => dispatch(defaultAction()),
  };
}

const mapStateToProps = createStructuredSelector({
  pageName: makeSelectPageName(),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
