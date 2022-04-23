import React from 'react';

const DashboardTabletNav = ({ setFilterBy }) => (
  <nav className="dashboard-nav__tablet">
    <h4 className="dashboard-nav__label--first">
      Filter By:
    </h4>
    <button
      type="button"
      onClick={() => setFilterBy('housing')}
      className="dashboard-nav__label"
    >
      Housing
    </button>
    <button
      type="button"
      onClick={() => setFilterBy('jobs')}
      className="dashboard-nav__label"
    >
      Jobs
    </button>
    <button
      type="button"
      onClick={() => setFilterBy('employment_services')}
      className="dashboard-nav__label"
    >
      Employment Services
    </button>
    <button
      type="button"
      onClick={() => setFilterBy('on-boarding')}
      className="dashboard-nav__label"
    >
      On-Boarding
    </button>
    <button
      type="button"
      onClick={() => setFilterBy('translations')}
      className="dashboard-nav__label"
    >
      Translations
    </button>
    <button
      type="button"
      onClick={() => setFilterBy('goods')}
      className="dashboard-nav__label"
    >
      Free Goods
    </button>
    <button
      type="button"
      onClick={() => setFilterBy('transportation')}
      className="dashboard-nav__label"
    >
      Transportation
    </button>
    <button
      type="button"
      onClick={() => setFilterBy('')}
      className="dashboard-nav__label--reset"
    >
      Reset
    </button>
  </nav>
);

export default React.memo(DashboardTabletNav);
