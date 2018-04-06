import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Stats from '../../components/stats';
import GlobalStats from '../../components/global-stats';
import { getSummaryAll, getSummaryAllFailure, getSummaryAllSuccess } from '../../actions/summary';
import { resetReport } from '../../actions/report';
import { cleanUpDOM } from '../../util/util';
import './dashboard.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    cleanUpDOM();
    this.props.resetReport();
    this.props.getSummaryAll();
  }

  render() {
    const { loading, error, summary, inProgress } = this.props;
    return (
      <main className="dashboard">
        { summary && <GlobalStats data={summary} /> }
        { summary && <Stats data={summary} inProgress={inProgress}/> }
        { loading && <p>Loading...</p> }
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { loading, error, all } = state.summary;
  return {
    loading,
    error,
    sites: state.sites.data,
    summary: all,
    inProgress: state.progress.inProgress
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSummaryAll: config => {
      dispatch(getSummaryAll(config))
        .then(result => {
          const { payload } = result;
          if (payload && payload.status !== 200) {
            dispatch(getSummaryAllFailure(payload.data.message));
          } else {
            dispatch(getSummaryAllSuccess(payload.data.data));
          }
        })
        .catch(err => {
          dispatch(getSummaryAllFailure(err));
        });
    },
    resetReport: () => {
      dispatch(resetReport());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
