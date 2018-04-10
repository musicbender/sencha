import React from 'react';
import ArchiveListItem from '../archive-list-item';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import './style.scss';

export default (props) => {
  const { data, history, env } = props;

  const buildList = data => {
    return Object.keys(data).map((item, i) => {
      return (
        <ArchiveListItem
          data={data[item]}
          history={history}
          env={env}
          key={Math.random()} 
        />
      );
    });
  }

  return (
     <section className="archive-list">
        { data && buildList(data) }
     </section>
  );
}
