import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { getSummary, getSummarySuccess, getSummaryFailure } from '../../actions/summary';
import ArchiveList from '../../components/archive-list';
import { formatTitle } from '../../util/util';
import './style.scss';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      tab: 0
    }
  }

  componentDidMount() {
    const { site } = this.props.match.params;
    this.props.getSummary(site);
  }

  handleChange(e, value) {
    this.setState({ tab: value });
  }

  getEnv() {
    const { tab } = this.state;
    return tab === 0 ? "live" : "qa";
  }

  filterEnvData(env) {
    const { data } = this.props;
    let output = {};

    Object.keys(data).forEach(item => {
      if (data[item].env === env) {
        output = { ...output, [item]: data[item] };
      }
    });

    return output;
  }

  buildTabContainer() {
    const { tab } = this.state;
    const { site } = this.props.match.params;
    const env = this.getEnv();

    return (
      <div>
        {
          tab === 0 &&
          <ArchiveList
            data={this.filterEnvData("live")}
            history={this.props.history}
            env={env}
          />
        }
        {
          tab === 1 &&
          <ArchiveList
            data={this.filterEnvData("qa")}
            history={this.props.history}
            env={env}
          />
        }
      </div>
    )
  }

  buildHeader() {
    const env = this.getEnv();
    const { site } = this.props.match.params;
    const title = formatTitle(site);

    return (
      <div className="title-wrapper">
        <Typography variant="title" component="h1">{`${title}: ${env}`}</Typography>
      </div>
    )
  }

  render() {
    const { data, match } = this.props;
    return (
      <main className="archive">
        <Paper className="env-tabs-wrapper">
          <Tabs
            value={this.state.tab}
            onChange={this.handleChange}
            textColor="primary"
            className="env-tabs"
            centered
          >
            <Tab label="Live" />
            <Tab label="QA" />
          </Tabs>
        </Paper>
        { this.buildHeader() }
        { data && this.buildTabContainer() }
      </main>
    );
  }
}

const mapStateToProps = ({summary}) => {
  return {
    data: summary.site
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSummary: site => {
      dispatch(getSummary(site))
        .then(result => {
          const { payload } = result;
          if (payload && payload.status !== 200) {
            dispatch(getSummaryFailure(payload.data.message));
          } else {
            dispatch(getSummarySuccess(payload.data.data));
          }
        })
        .catch(err => {
          dispatch(getSummaryFailure(err));
        });
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Archive));
