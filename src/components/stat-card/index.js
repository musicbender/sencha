import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Chart from './chart';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { formatDate } from '../../util/date';
import { formatTitle } from '../../util/util';
import { stat_card_menu as nav } from '../../data/nav';
import './style.scss';

class StatCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      anchorEl: null
    }
  }

  handleClick(e) {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose() {
    this.setState({ anchorEl: null });
  };

  getMenuPath(item) {
    const { site, createdAt } = this.props.data;
    switch(item) {
      case "report":
        return `/report/${site}/${createdAt}`;
      case "archive":
        return `/archive/${site}`;
      case "run-test":
        return `/report/${site}/new`;
      default:
        return "";
    }
  }

  renderMenu() {
    const { site } = this.props.data;
    const { anchorEl } = this.state;

    return (
      <div className="stat-menu-wrapper">
        <IconButton onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={`stat-menu-${site}`}
          anchorEl={this.state.anchorEl}
          open={!!anchorEl}
          onClose={this.handleClose}
        >
          {
            Object.keys(nav).map(item => (
              <MenuItem className={`menu-item-${item}`} key={item} onClick={this.handleClose}>
                <Link to={this.getMenuPath(item)}>{nav[item].label}</Link>
              </MenuItem>
            ))
          }
        </Menu>
      </div>
    );
  }

  render() {
    const {
      site,
      createdAt,
      reportURL,
      env,
      suites,
      tests,
      passes,
      failures,
      duration,
      passPercent
    } = this.props.data;

    const detailData = [`${tests} Tests`,`${passes} Passes`, `${failures} Failures`, `${duration} seconds`];

    return (
       <Card className={`stat-card ${site}`}>
         { this.renderMenu() }
         <div className="percent-wrapper">
           <Chart passes={passes} failures={failures} />
           <Typography component="p" className="percent">{passPercent}</Typography>
         </div>
         <CardContent className="content-wrapper">
           <Typography variant="headline" component="h3">{formatTitle(site)}</Typography>
           <Typography>Last Run: {formatDate(createdAt)}</Typography>
           <ul className="other-data">
             {
               detailData.map(item => (
                 <li key={Math.random()}>
                   <Typography component="p">{item}</Typography>
                 </li>
               ))
             }
           </ul>
         </CardContent>
       </Card>
    );
  }
}

export default StatCard;
