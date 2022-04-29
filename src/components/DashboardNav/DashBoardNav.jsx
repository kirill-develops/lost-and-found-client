/* eslint-disable sort-imports */
import './DashboardNav.scss';
import React from 'react';
import DashboardMobileNav from './ForMobile/ForMobile';
import DashboardTabletNav from './ForTablet/ForTablet';
import useMediaQuery from '../../utils/useMediaQuery';

const DashboardNav = ({ filterParams, setFilterParams }) => {
  const isDashNavMobile = useMediaQuery('(max-width:73.75rem)');

  return (
    <div className="dashboard-nav">
      {isDashNavMobile && (
        <DashboardMobileNav
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />
      )}
      {!isDashNavMobile && (
        <DashboardTabletNav
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />
      )}
    </div>
  );
};

export default React.memo(DashboardNav);
