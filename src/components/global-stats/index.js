import React from 'react';
import GlobalStatsCard from '../global-stats-card';
import getGlobalStats from '../../util/global-stats';
import LocalHospitalIcon from 'material-ui-icons/LocalHospital';
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck';
import WebIcon from 'material-ui-icons/Web';
import './style.scss';

export default (props) => {
  const { data } = props;
  const globalStatsData = getGlobalStats(data);

  const icons = [
    <LocalHospitalIcon className="icon-1"    />,
    <PlaylistAddCheckIcon className="icon-2" />,
    <WebIcon className="icon-3"              />
  ];

  return (
     <section className="global-stats">
       {
         Object.keys(globalStatsData).map((stat, i) => (
           <GlobalStatsCard
             name={stat}
             data={globalStatsData[stat]}
             key={Math.random()}
           >
             {icons[i]}
           </GlobalStatsCard>
         ))
       }
     </section>
  );
}
