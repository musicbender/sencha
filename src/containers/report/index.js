import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { runTest, runTestSuccess, runTestFailure } from '../../actions/runner';
import { cleanUpDOM, deleteAttr } from '../../util/util';
import {
  loadingReport,
  fetchReportURL,
  fetchReportURLSuccess,
  fetchReport,
  fetchReportSuccess,
  fetchReportFailure,
  resetReport
} from '../../actions/report';

class Report extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getReport();
  }

  componentDidUpdate(prevProps) {
    const { site, date } = this.props.match.params;
    const { data, config } = this.props;

    switch (date) {
      case "new":
        if (site && site !== prevProps.match.params.site) {
          this.getReport();
        }
        break;
      default:
        if (date && date !== prevProps.match.params.date) {
          this.getReport();
        }
        break;
    }

    if (data && data !== prevProps.data) {
      if (date !== "new") {
        this.setDataToDOM({data: JSON.stringify(data), config: JSON.stringify(config)});
      } else {
        this.setDataToDOM({data, config});
      }
    }
  }

  getReport() {
    const { data, config } = this.props;
    const { site, date } = this.props.match.params;

    switch(date) {
      case "new":
        this.runNewTest();
        break;
      default:
        this.getArchivedReport({date, site});
        break;
    }
  }

  runNewTest()  {
    const { site } = this.props.match.params;
    const { live, archive } = this.props.settings;
    const env = live ? 'live' : 'qa';

    this.cleanUp();
    this.props.runTest({site, env, archive});
  }

  getArchivedReport(config) {
    this.props.fetchReport(config);
  }

  setDataToDOM(dataObj) {
    const { data, config } = dataObj;

    if (data) {
      console.log('set data to DOM');
      document.body.setAttribute('data-raw', data);
      document.body.setAttribute('data-config', config);
      this.makeScript();
    }

    setTimeout(() => {
      if(document.body.hasAttribute('data-raw')) {
        deleteAttr();
      }
    }, 2000);
  }

  makeScript() {
    const script = document.getElementById('report-script');
    if (!script) {
      console.log('setting script app.js to DOM');
      const reportJS = document.createElement('script');
      reportJS.type = 'text/javascript';
      reportJS.src = '/app.js';
      reportJS.id = 'report-script';
      document.body.appendChild(reportJS);
    }
  }

  cleanUp() {
    cleanUpDOM();
    this.props.resetReport();
  }

  render() {
    const { data, config } = this.props;

    return (
      <section className="report-container">
        <div id="report"></div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.report.loading,
    data: state.report.data,
    config: state.report.config,
    error: state.report.error,
    settings: state.settings,
    runnerLoading: state.runner.loading,
    runnerError: state.runner.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReport: config => {
      dispatch(fetchReportURL(config))
        .then(result => {
          const { payload } = result;
          if (payload && payload.status !== 200) {
            dispatch(fetchReportFailure(payload.data.message));
          } else {
            dispatch(fetchReportURLSuccess(payload.data.data.config));
            dispatch(fetchReport(payload.data.data.url))
              .then(result => {
                const { payload } = result;
                if (payload && payload.status !== 200) {
                  dispatch(fetchReportFailure(payload.data.message));
                } else {
                  dispatch(fetchReportSuccess(payload.data));
                }
              })
              .catch(err => {
                dispatch(fetchReportFailure(err));
              });
          }
        })
        .catch(err => {
          dispatch(fetchReportFailure(err));
        });
    },
    runTest: config => {
      dispatch(runTest(config))
        .then(result => {
          const { payload } = result;
          if (payload && payload.status !== 200) {
            dispatch(runTestFailure(payload.data.message));
          } else {
            dispatch(runTestSuccess(payload.data.data));
          }
        })
        .catch(err => {
          dispatch(runTestFailure(err));
        });
    },
    loadingReport: loading => {
      dispatch(loadingReport(loading));
    },
    resetReport: () => {
      dispatch(resetReport());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Report));