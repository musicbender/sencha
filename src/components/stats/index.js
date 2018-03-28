import React from 'react';
import StatCard from '../../components/stat-card';
import './style.scss';

export default (props) => {
  const { data } = props;

  const buildStatCards = data => {
    return Object.keys(data).map(site => {
      return (
        <StatCard data={data[site]} key={Math.random()}/>
      );
    });
  }

  return (
     <section className="stats-section">
       { data && buildStatCards(data) }
     </section>
  );
}
