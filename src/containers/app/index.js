import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { fetchSites, fetchSitesSuccess, fetchSitesFailure } from '../../actions/sites';
import { setInProgress, socketFail } from '../../actions/progress';
import { SITE_URL } from '../../data/config';
import muiTheme from '../../style/vendor/mui-theme';
import TestToolbar from '../test-toolbar';
import NewTest from '../new-test';
import Snackbar from '../../components/snackbar';

// component routes
import Dashboard from '../dashboard';
import Report from '../report';
import Archive from '../archive';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io(SITE_URL);
    this.theme = createMuiTheme(muiTheme);
    this.state = {
      status: {},
      sites: []
    };
  }W

  componentDidMount() {
    this.props.fetchSites();
    // sockets
    this.socket.on('inProgress', res => {
      this.props.setInProgress(true);
    });

    this.socket.on('notInProgress', res => {
      this.props.setInProgress(false);
    });

    this.socket.on('error', res => {
      console.error(res);
      this.props.socketFail(res);
    });
  }

  render() {
    return (
      <div className="nc-test-app">
        <MuiThemeProvider theme={this.theme}>
          <TestToolbar />
          <Route exact path="/" component={Dashboard} />
          <Route path="/report/:site/:date/:env" render={() => (
            <Report socket={this.socket} />
          )} />
          <Route path="/archive/:site" component={Archive} />
          <NewTest />
          <Snackbar inProgress={this.props.inProgress} />
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = ({progress}) => {
  return {
    inProgress: progress.inProgress,
    progressError: progress.error
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
    },
    setInProgress: bool => {
      dispatch(setInProgress(bool));
    },
    socketFail: res => {
      dispatch(socketFail(res));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
