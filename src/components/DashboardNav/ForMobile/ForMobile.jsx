import React, { useCallback, useState } from 'react';

const DashboardMobileNav = ({ setFilterParams }) => {
  const [active, setActive] = useState(false);
  // const [filterParams, setFilterParams] = useSearchParams();

  const selectMobileFilter = useCallback(() => (category) => {
    setActive(false);
    setFilterParams({ filter: category });
  }, [setFilterParams]);

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
            className="dashboard-nav__label"
          // className={ ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
          >
            Housing
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('jobs')}
            className="dashboard-nav__label"
          >
            Jobs
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('employment_services')}
            className="dashboard-nav__label"
          >
            Employment Services
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('on-boarding')}
            className="dashboard-nav__label"
          >
            On-Boarding
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('translations')}
            className="dashboard-nav__label"
          >
            Translations
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('goods')}
            className="dashboard-nav__label"
          >
            Free Goods
          </button>
          <button
            type="button"
            onClick={() => selectMobileFilter('transportation')}
            className="dashboard-nav__label"
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
