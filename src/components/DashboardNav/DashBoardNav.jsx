/* eslint-disable sort-imports */
import './DashboardNav.scss';
import React from 'react';
import DashboardMobileNav from './ForMobile/ForMobile';
import DashboardTabletNav from './ForTablet/ForTablet';
import useMediaQuery from '../../utils/useMediaQuery';

const DashboardNav = ({ setFilterBy }) => {
  const isDashNavMobile = useMediaQuery('(max-width:73.75rem)');

  return (
    <div className="dashboard-nav">
      {isDashNavMobile && <DashboardMobileNav setFilterBy={setFilterBy} />}
      {!isDashNavMobile && <DashboardTabletNav setFilterBy={setFilterBy} />}
    </div>
  );
};

export default React.memo(DashboardNav);
