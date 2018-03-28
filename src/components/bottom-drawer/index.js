import React from 'react';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import SiteSelector from '../site-selector';
import SettingsMenu from '../../components/settings-menu';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';

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
  return (
    <Drawer
      anchor="bottom"
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      <div>
        <SiteSelector
          sites={sites}
          site={site}
          env={settings.env}
          handleSiteSelect={() => handleSiteSelect()}
        />
        <div>
          <Button
            className="run-test-btn"
            variant="raised"
            color="primary"
            onClick={() => handleClickRun()}
          >
            Run Test
          </Button>
        </div>
        <IconButton className="settings-btn" color="inherit" aria-label="Settings">
          <SettingsIcon
            onClick={(e) => handleSettings(e.currentTarget)}
          />
        </IconButton>
        <SettingsMenu
          settingsOpen={settingsOpen}
          settingsEl={settingsEl}
          toggleEnv={toggleEnv}
          toggleArchive={toggleArchive}
          handleSettings={handleSettings}
          settings={settings}
        />
      </div>
    </Drawer>
  );
}
