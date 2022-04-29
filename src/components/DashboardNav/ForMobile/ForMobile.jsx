import React, { useState } from 'react';

const DashboardMobileNav = ({ filterParams, setFilterParams }) => {
  const [active, setActive] = useState(false);
  // const [filterParams, setFilterParams] = useSearchParams();

  const selectMobileFilter = (category) => {
    setFilterParams({ filter: category });
    setActive(false);
  };

  const isActive = (type) => (
    type === filterParams.get('filter') ?? ''
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setActive(!active)}
        className="dashboard-nav__label--first-mobile"
      >
        SELECT FILTER
      </button>
      {active && (
        <nav className="dashboard-nav__active">
          <button
            type="button"
            onClick={() => selectMobileFilter('housing')}
            className={isActive('housing') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
          >
            Housing
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('jobs')}
            className={isActive('jobs') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
          >
            Jobs
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('employment_services')}
            className={isActive('employment_services') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
          >
            Employment Services
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('on-boarding')}
            className={isActive('on-boarding') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
          >
            On-Boarding
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('translations')}
            className={isActive('translations') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
          >
            Translations
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('goods')}
            className={isActive('goods') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
          >
            Free Goods
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('transportation')}
            className={isActive('transportation') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
          >
            Transportation
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('')}
            className="dashboard-nav__label--reset"
          >
            Reset
          </button>
        </nav>
      )}
    </>
  );
};

export default React.memo(DashboardMobileNav);
