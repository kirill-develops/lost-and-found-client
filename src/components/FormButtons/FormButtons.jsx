import './FormButtons.scss';
import React from 'react';

const FormButtons = ({ clickHandler }) => (
  <div className="form-button__block">
    <button
      type="submit"
      className="form-button--submit"
    >
      SUBMIT
    </button>
    <button
      type="button"
      onClick={clickHandler}
      className="form-button--cancel"
    >
      CANCEL
    </button>
  </div>
);

export default FormButtons;
