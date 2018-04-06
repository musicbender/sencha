import React from 'react';
import StatCard from '../../components/stat-card';
import './style.scss';

export default (props) => {
  const { data, inProgress } = props;

  const buildStatCards = data => {
    return Object.keys(data).map(site => {
      return (
        <StatCard
          data={data[site]} 
          inProgress={inProgress}
          key={Math.random()}
        />
      );
    });
  }

  return (
     <section className="stats-section">
       { data && buildStatCards(data) }
     </section>
  );
}
