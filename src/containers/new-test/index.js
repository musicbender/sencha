import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import BottomDrawer from '../../components/bottom-drawer';
import { toggleDrawer } from '../../actions/global';
import { toggleEnv, toggleArchive } from '../../actions/settings';
import './style.scss';

class NewTest extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickRun = this.handleClickRun.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.handleSiteSelect = this.handleSiteSelect.bind(this);
    this.state = {
      site: '',
      settingsOpen: false,
      settingsEl: null
    }
  }

  handleClick() {
    const { toggleDrawer, drawerOpen } = this.props;
    toggleDrawer(!drawerOpen);
  }

  handleClickRun() {
    this.redirectToReport(this.state.site);
  }

  handleSiteSelect(site) {
    this.setState({site});
  }

  handleSettings(el, isOpen = !this.state.settingsOpen) {
    this.setState({
      settingsOpen: isOpen,
      settingsEl: el
    });
  }

  render() {
    return (
      <div className="new-test">
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          className="new-test-btn"
          onClick={() => this.handleClick()}
        >
          <AddIcon />
        </Button>
        <BottomDrawer
          handleSettings={this.handleSettings}
          handleClickRun={this.handleClickRun}
          toggleDrawer={this.props.toggleDrawer}
          drawerOpen={this.props.drawerOpen}
          sites={this.props.sites}
          site={this.state.site}
          settings={this.props.settings}
          toggleEnv={this.props.toggleEnv}
          toggleArchive={this.props.toggleArchive}
          settingsEl={this.state.settingsEl}
          settingsOpen={this.state.settingsOpen}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drawerOpen: state.global.drawerOpen,
    sites: state.sites.data,
    settings: state.settings
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleDrawer,
    toggleArchive,
    toggleEnv
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTest));
