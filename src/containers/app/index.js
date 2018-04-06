import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { fetchSites, fetchSitesSuccess, fetchSitesFailure } from '../../actions/sites';
import { setInProgress, socketFail } from '../../actions/progress';
import { SITE_URL } from '../../data/config';
import red from 'material-ui/colors/red';

// components
import TestToolbar from '../test-toolbar';
import Dashboard from '../dashboard';
import Report from '../report';
import Archive from '../archive';
import NewTest from '../new-test';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = io(SITE_URL);

    this.theme = createMuiTheme({
      palette: {
        primary: {
          main: '#388e3c',
          contrastTest: '#fff'
        },
        secondary: {
          main: '#0288d1',
          contrastTest: '#fff'
        },
        error: red
      }
    });

    this.state = {
      status: {},
      sites: []
    };
  }

  componentDidMount() {
    this.props.fetchSites();

    // sockets
    this.socket.on('inProgress', res => {
      console.log(res);
      this.props.setInProgress(true);
    });

    this.socket.on('notInProgress', res => {
      console.log(res);
      this.props.setInProgress(false);
    });

    this.socket.on('error', res => {
      console.log(res);
      this.props.socketFail(res);
    });
  }

  render() {
    return (
      <div className="nc-test-app">
        <MuiThemeProvider theme={this.theme}>
          <TestToolbar />
          <Route exact path="/" component={Dashboard} />
          {/* <Route path="/report/:site/:date" component={Report} /> */}
          <Route path="/report/:site/:date" render={() => (
            <Report socket={this.socket} />
          )} />
          <Route path="/archive/:site" component={Archive} />
          <NewTest />
        </MuiThemeProvider>
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
    },
    setInProgress: bool => {
      dispatch(setInProgress(bool));
    },
    socketFail: res => {
      dispatch(socketFail(res));
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
