import React from 'react';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import SiteSelector from '../site-selector';
import SettingsMenu from '../../components/settings-menu';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import SettingsIcon from 'material-ui-icons/Settings';
import './style.scss';

export default ({
  toggleDrawer,
  drawerOpen,
  handleSettings,
  handleClickRun,
  handleSiteSelect,
  toggleEnv,
  toggleArchive,
  site,
  sites,
  settings,
  settingsEl,
  settingsOpen
}) => {
  const handleRunTest = () => {
    toggleDrawer(false);
    handleClickRun();
  }

  return (
    <Drawer
      className="new-test-drawer"
      anchor="bottom"
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      <div className="top-drawer">
        <div>
          <Typography component="h4" className="drawer-title">Run a new test</Typography>
        </div>
        <div className="drawer-selector-container">
          <SiteSelector
            sites={sites}
            site={site}
            env={settings.env}
            handleSiteSelect={handleSiteSelect}
          />
        </div>
        <div className="drawer-settings-container">
          <SettingsMenu
            settingsOpen={settingsOpen}
            settingsEl={settingsEl}
            toggleEnv={toggleEnv}
            toggleArchive={toggleArchive}
            handleSettings={handleSettings}
            settings={settings}
          />
        </div>
      </div>
      <Divider />
      <div className="bottom-drawer">
        <Button
          className="btn cancel-btn"
          color="default"
          onClick={() => toggleDrawer(false)}
        >
          Cancel
        </Button>
        <Button
          className="btn run-test-btn"
          variant="raised"
          color="secondary"
          onClick={() => handleRunTest()}
        >
          Run Test
        </Button>
      </div>
    </Drawer>
  );
}
