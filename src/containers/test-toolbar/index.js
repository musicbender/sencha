import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SiteSelector from '../../components/site-selector';
import SettingsMenu from '../../components/settings-menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import SettingsIcon from 'material-ui-icons/Settings';
import { toggleEnv, toggleArchive } from '../../actions/settings';
import { cleanUpDOM } from '../../util/util';
import './test-toolbar.scss';

class TestToolbar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.toDashboard = this.toDashboard.bind(this);
    this.handleSiteSelect = this.handleSiteSelect.bind(this);
    this.state = {
      site: '',
      settingsOpen: false,
      settingsEl: null
    }
  }

  handleClick() {
    this.redirectToReport(this.state.site);
  }

  handleSettings(el, isOpen = !this.state.settingsOpen) {
    this.setState({
      settingsOpen: isOpen,
      settingsEl: el
    });
  }

  toDashboard() {
    this.props.history.push('/');
  }

  handleSiteSelect(site) {
    this.setState({site});
  }

  isHome() {
    return this.props.location.pathname === "/";
  }

  render() {
    const { sites, settings, toggleEnv, toggleArchive } = this.props;
    return (
      <section className={`test-toolbar home-${this.isHome()}`}>
        <Toolbar className="toolbar">
          <IconButton className="back-btn" color="inherit" aria-label="Back">
            <ArrowBackIcon
              onClick={() => this.toDashboard()}
            />
          </IconButton>
          <Typography variant="title" color="inherit" className="title">
            Sencha
          </Typography>
        </Toolbar>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    sites: state.sites.data,
    settings: state.settings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleEnv: bool => {
      dispatch(toggleEnv(bool));
    },
    toggleArchive: bool => {
      dispatch(toggleArchive(bool));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestToolbar));
