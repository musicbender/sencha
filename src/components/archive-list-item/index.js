import React from 'react';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import { archive_details } from '../../data/content.json';
import { formatDate } from '../../util/date';
import './style.scss';

export default (props) => {
  const { data, history } = props;

  const redirectToReport = (site, createdAt) => {
    history.push(`/report/${site}/${createdAt}`);
  }

  const handleClick = () => {
    const { site, createdAt } = data;
    redirectToReport(site, createdAt);
  }

  const getDetailStats = () => {
    return Object.keys(archive_details).map(item => {
      return (
        <div className="archive-detail">
          <Typography className="archive-detail-name">{archive_details[item]}</Typography>
          <Typography className="archive-detail-value">{data[item]}</Typography>
        </div>
      );
    });
  }

  return (
    <ExpansionPanel className={`archive-list-item`}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{formatDate(data.createdAt)}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="detail-wrapper">
        { data && getDetailStats() }
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small" color="primary" onClick={handleClick}>
          Full Report
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}
