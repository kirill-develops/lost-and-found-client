/* eslint-disable sort-imports */
import './EditProfile.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import apiUtils from '../../utils/apiUtils';
import closeIco from '../../assets/icons/x_close.svg';
import { dropdownProvinceOptions } from '../../utils/constants';
import FormButtons from '../buttons/FormButtons/FormButtons';

const FormComponent = ({
  children, state, setStateFn, hasSubmitted, type = 'text', mandatory = true,
}) => (
  // If user attempts to submit while required field is entered, will throw up error
  <label className="edit-form__label">
    {children}
    {!state && hasSubmitted && mandatory
      && <span className="edit-form__label--error"> This field is required</span>}
    <input
      type={type}
      value={state}
      onChange={(e) => setStateFn(e.target.value)}
      className={`edit-form__field ${!state && hasSubmitted && mandatory
        && 'edit-form__field--error'}`}
    />
  </label>
);

// type userData = {
//   userData: {
//     first_name: string,
//     last_name: string,
//     address: ?string,
//     city: string,
//     province: string,
// userData,
//     phone: number,
//     volunteer: boolean,
//     postal: string,
//     avatar_url: ?string,
//     updated_at: string
//   }
// }

const EditProfile = ({
  userData,
  setUserData,
}) => {
  // STATE HOOKS for profile values
  const [firstName, setFirstName] = useState(userData.first_name || '');
  const [lastName, setLastName] = useState(userData.last_name || '');
  const [address, setAddress] = useState(userData.address || '');
  const [city, setCity] = useState(userData.city || '');
  const [province, setProvince] = useState(userData.province || '');
  const [phone, setPhone] = useState(userData.phone || '');
  const [volunteer, setVolunteer] = useState(userData.volunteer || 'false');
  const [postalCode, setPostalCode] = useState();
  const [hasSubmitted, toggleSubmitted] = useState(false);

  const navTo = useNavigate();

  // Handle the submission of the form by validating content and then doing an api PUT req
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let user = { ...userData };

    (!firstName || !lastName || !city || !province || !phone || !volunteer) ? (
      toggleSubmitted(true)
    ) : (
      apiUtils.editProfile(user = {
        ...{
          first_name: firstName,
          last_name: lastName,
          address,
          city,
          province,
          phone,
          volunteer,
        },
      })
        .then(
          setUserData(user),
          toggleSubmitted(false),
          navTo('../'),
        ).catch()
    );
  };

  return (
    <div className="edit-form">
      {/* Animation wrapper */}
      <div className="slide-inelliptic-bottom-bck">
        <div className="edit-form-block">
          {/* close Icon */}
          <button
            type="button"
            onClick={() => navTo(-1)}
            className="edit-form__close-ico-wrapper"
          >
            <img
              src={closeIco}
              alt="close icon"
              className="edit-form__close-ico"
            />
          </button>
          {/* Title component */}
          <h1 className="edit-form__title">Edit Profile</h1>
          {/* styled color block */}
          <div className="edit-form__filler" />
          <form
            onSubmit={handleFormSubmit}
            className="edit-form__form"
          >
            <FormComponent
              state={firstName}
              setStateFn={setFirstName}
              hasSubmitted={hasSubmitted}
            >
              First Name*
            </FormComponent>
            <FormComponent
              state={lastName}
              setStateFn={setLastName}
              hasSubmitted={hasSubmitted}
            >
              Last Name*
            </FormComponent>
            <FormComponent
              state={address}
              setStateFn={setAddress}
              hasSubmitted={hasSubmitted}
              mandatory={false}
            >
              Address
            </FormComponent>
            <FormComponent
              state={city}
              setStateFn={setCity}
              hasSubmitted={hasSubmitted}
            >
              City*
            </FormComponent>
            <div className="edit-form__label">
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label className="edit-form__label">
                PROVINCE*
                {!province && hasSubmitted
                  && <span className="edit-form__label--error"> Your province is required</span>}
                <Select
                  value={province}
                  placeholder={province}
                  onChange={(e) => setProvince(e.value)}
                  options={dropdownProvinceOptions}
                  id="province"
                  menuShouldBlockScroll
                  className={`edit-form__field ${!province && hasSubmitted
                    && 'edit-form__field--error'}`}
                />
              </label>
            </div>
            <FormComponent
              state={phone}
              setStateFn={setPhone}
              hasSubmitted={hasSubmitted}
              type="tel"
            >
              PHONE*
            </FormComponent>
            <FormComponent
              state={postalCode}
              setStateFn={setPostalCode}
              hasSubmitted={hasSubmitted}
              mandatory={false}
            >
              Postal Code
            </FormComponent>
            <fieldset className="edit-form__input-block">
              <legend className="edit-form__label--volunteer">
                VOLUNTEER
              </legend>
              <label className="edit-form__label">
                <input
                  type="radio"
                  value="true"
                  checked={volunteer === 'true'}
                  onChange={(e) => setVolunteer(e.target.value)}
                  className="edit-form__radio"
                />
                YES
              </label>
              <label className="edit-form__label">
                <input
                  type="radio"
                  value="false"
                  checked={volunteer === 'false'}
                  onChange={(e) => setVolunteer(e.target.value)}
                  className="edit-form__radio"
                />
                NO
              </label>
            </fieldset>
            <FormButtons
              handleSubmit={handleFormSubmit}
              handleCancel={() => navTo('../')}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditProfile);
