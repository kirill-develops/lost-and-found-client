/* eslint-disable sort-imports */
import './BackButton.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackIco from '../../../assets/icons/back_StyleRound.svg';

const BackButton = ({ to = -1 }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="back-button__wrapper"
    >
      <img
        src={BackIco}
        alt="Back Icon"
        className="back-button__ico"
      />
    </button>
  );
};

export default React.memo(BackButton);
