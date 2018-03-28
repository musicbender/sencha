import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { global_stats as content } from '../../data/content';
import './style.scss';

export default (props) => {
  const { name, data } = props;
  const stat = name === "passPercent" ? `${data}%` : data;

  return (
     <Paper className={`global-stats-card ${name}`}>
       <Typography className="title" variant="headline" component="h5">{content[name]}</Typography>
       <Typography className="data" component="h3">{stat}</Typography>
     </Paper>
  );
}
