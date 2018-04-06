import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { progress as content } from '../../data/content';

export default (props) => {
  return (
    <Snackbar
      open={props.inProgress}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      message={content.in_progress}
    />
  );
}
