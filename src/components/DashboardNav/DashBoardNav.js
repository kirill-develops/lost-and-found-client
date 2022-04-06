/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './DashBoardNav.scss';

const DashBoardNav = ({ handleFilter }) => {
  const [active, setActive] = useState(false);


  // on mobile aspect ratio 
  const expandNav = () => {
    setActive(!active);
  }

  const handleClick = (category) => {
    setActive(false);
    handleFilter(category);
  }

  return (
    <div className="dashboard-nav">

      <div
        className='dashboard-nav__mobile'>
        <h3
          onClick={() => expandNav()}
          className='dashboard-nav__label--first-mobile'>
          Filter By:
        </h3>
        <ul className={active ? 'dashboard-nav__mobile-block--active' : 'dashboard-nav__mobile-block'}>
          <li
            onClick={() => handleClick('housing')}
            className='dashboard-nav__label'>
            Housing</li>
          <li
            onClick={() => handleClick('jobs')}
            className='dashboard-nav__label'>
            Jobs</li>
          <li
            onClick={() => handleClick('employment_services')}
            className='dashboard-nav__label'>
            Employment Services</li>
          <li
            onClick={() => handleClick('on-boarding')}
            className='dashboard-nav__label'>
            On-Boarding</li>
          <li
            onClick={() => handleClick('translations')}
            className='dashboard-nav__label'>
            Translations</li>
          <li
            onClick={() => handleClick('goods')}
            className='dashboard-nav__label'>
            Free Goods</li>
          <li
            onClick={() => handleClick('transportation')}
            className='dashboard-nav__label'>
            Transportation</li>
          <li
            onClick={() => handleClick('')}
            className='dashboard-nav__label--reset'>
            Reset</li>
        </ul>
      </div>

      <ul className="dashboard-nav__block">
        <li
          className='dashboard-nav__label--first'>
          Filter By:</li>
        <li
          onClick={() => handleFilter('housing')}
          className='dashboard-nav__label'>
          Housing</li>
        <li
          onClick={() => handleFilter('jobs')}
          className='dashboard-nav__label'>
          Jobs</li>
        <li
          onClick={() => handleFilter('employment_services')}
          className='dashboard-nav__label'>
          Employment Services</li>
        <li
          onClick={() => handleFilter('on-boarding')}
          className='dashboard-nav__label'>
          On-Boarding</li>
        <li
          onClick={() => handleFilter('translations')}
          className='dashboard-nav__label'>
          Translations</li>
        <li
          onClick={() => handleFilter('goods')}
          className='dashboard-nav__label'>
          Free Goods</li>
        <li
          onClick={() => handleFilter('transportation')}
          className='dashboard-nav__label'>
          Transportation</li>
        <li
          onClick={() => handleFilter('')}
          className='dashboard-nav__label--reset'>
          Reset</li>
      </ul>
    </div>
  )
};

export default DashBoardNav;