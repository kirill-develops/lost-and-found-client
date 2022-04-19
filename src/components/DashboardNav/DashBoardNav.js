/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './DashBoardNav.scss';

const DashBoardNav = ({ setFilterBy }) => {
  const [active, setActive] = useState(false);


  // on mobile aspect ratio 
  const expandNav = () => {
    setActive(!active);
  }

  const handleClick = (category) => {
    setActive(false);
    setFilterBy(category);
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
          onClick={() => setFilterBy('housing')}
          className='dashboard-nav__label'>
          Housing</li>
        <li
          onClick={() => setFilterBy('jobs')}
          className='dashboard-nav__label'>
          Jobs</li>
        <li
          onClick={() => setFilterBy('employment_services')}
          className='dashboard-nav__label'>
          Employment Services</li>
        <li
          onClick={() => setFilterBy('on-boarding')}
          className='dashboard-nav__label'>
          On-Boarding</li>
        <li
          onClick={() => setFilterBy('translations')}
          className='dashboard-nav__label'>
          Translations</li>
        <li
          onClick={() => setFilterBy('goods')}
          className='dashboard-nav__label'>
          Free Goods</li>
        <li
          onClick={() => setFilterBy('transportation')}
          className='dashboard-nav__label'>
          Transportation</li>
        <li
          onClick={() => setFilterBy('')}
          className='dashboard-nav__label--reset'>
          Reset</li>
      </ul>
    </div>
  )
};

export default DashBoardNav;