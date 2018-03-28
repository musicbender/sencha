import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSites, fetchSitesSuccess, fetchSitesFailure } from '../../actions/sites';

// components
import TestToolbar from '../test-toolbar';
import Dashboard from '../dashboard';
import Report from '../report';
import Archive from '../archive';
import NewTest from '../new-test';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {},
      sites: []
    }
  }

  componentDidMount() {
    this.props.fetchSites();
  }

  render() {
    return (
      <div className="nc-test-app">
        <TestToolbar />
        <Route exact path="/" component={Dashboard} />
        <Route path="/report/:site/:date" component={Report} />
        <Route path="/archive/:site" component={Archive} />
        <NewTest />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSites: () => {
      dispatch(fetchSites())
        .then(result => {
          const { payload } = result;
          if (payload && payload.status !== 200) {
            dispatch(fetchSitesFailure(payload.data.message));
          } else {
            dispatch(fetchSitesSuccess(payload.data.data));
          }
        })
        .catch(err => {
          dispatch(runTestFailure(err));
        });
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
