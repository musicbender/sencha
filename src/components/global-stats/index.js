import React from 'react';
import GlobalStatsCard from '../global-stats-card';
import getGlobalStats from '../../util/global-stats';
import './style.scss';

export default (props) => {
  const { data } = props;
  const globalStatsData = getGlobalStats(data);

  return (
     <section className="global-stats">
       {
         Object.keys(globalStatsData).map(stat => (
           <GlobalStatsCard
             name={stat}
             data={globalStatsData[stat]}
             key={Math.random()}
           />
         ))
       }
     </section>
  );
}
