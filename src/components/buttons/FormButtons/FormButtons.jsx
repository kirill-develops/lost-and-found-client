import './FormButtons.scss';
import React from 'react';

const FormButtons = ({ handleSubmit, handleCancel }) => (
  <div className="form-button__block">
    <button
      type="submit"
      onClick={handleSubmit}
      className="form-button--submit"
    >
      SUBMIT
    </button>
    <button
      type="button"
      onClick={handleCancel}
      className="form-button--cancel"
    >
      CANCEL
    </button>
  </div>
);

export default React.memo(FormButtons);
