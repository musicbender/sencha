import React from 'react';
import { ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Switch from 'material-ui/Switch';
import ArchiveIcon from 'material-ui-icons/Archive';
import CodeIcon from 'material-ui-icons/Code';

import './settings-menu.scss';

export default (props) => {
  const  { settings, toggleEnv, toggleArchive, settingsOpen, settingsEl, handleSettings } = props;
  const { live, archive } = settings;

  const handleClose = () => {
    handleSettings(null, false);
  }

  return (
    <div className="settings-menu">
      <MenuItem>
        <ListItemIcon>
          <CodeIcon />
        </ListItemIcon>
        <ListItemText primary="Test Live Enviroment" />
        <ListItemSecondaryAction>
          <Switch
            onChange={() => toggleEnv(!live)}
            checked={live}
          />
        </ListItemSecondaryAction>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ArchiveIcon />
        </ListItemIcon>
        <ListItemText primary="Archive Results" />
        <ListItemSecondaryAction>
          <Switch
            onChange={() => toggleArchive(!archive)}
            checked={archive}
          />
        </ListItemSecondaryAction>
      </MenuItem>
    </div>
  );
}
