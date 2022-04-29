import React from 'react';

const DashboardTabletNav = ({ filterParams, setFilterParams }) => {
  const handleClick = (category) => {
    setFilterParams({
      filter: category,
    });
  };

  const isActive = (type) => (
    type === filterParams.get('filter') ?? ''
  );

  return (
    <nav className="dashboard-nav__tablet">
      <h4 className="dashboard-nav__label--first">
        FILTER BY:
      </h4>
      <button
        type="button"
        onClick={() => handleClick('housing')}
        className={isActive('housing') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
      >
        Housing
      </button>
      <button
        type="button"
        onClick={() => handleClick('jobs')}
        className={isActive('jobs') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
      >
        Jobs
      </button>
      <button
        type="button"
        onClick={() => handleClick('employment_services')}
        className={isActive('employment_services') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
      >
        Employment Services
      </button>
      <button
        type="button"
        onClick={() => handleClick('on-boarding')}
        className={isActive('on-boarding') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
      >
        On-Boarding
      </button>
      <button
        type="button"
        onClick={() => handleClick('translations')}
        className={isActive('translations') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
      >
        Translations
      </button>
      <button
        type="button"
        onClick={() => handleClick('goods')}
        className={isActive('goods') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
      >
        Free Goods
      </button>
      <button
        type="button"
        onClick={() => handleClick('transportation')}
        className={isActive('transportation') ? 'dashboard-nav__label--active' : 'dashboard-nav__label'}
      >
        Transportation
      </button>
      <button
        type="button"
        onClick={() => handleClick('')}
        className="dashboard-nav__label--reset"
      >
        Reset
      </button>
    </nav>
  );
};

export default React.memo(DashboardTabletNav);
