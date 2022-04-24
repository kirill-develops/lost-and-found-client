import './EditProfile.scss';
import React, { useState } from 'react';
import Select from 'react-select';
import apiUtils from '../../utils/apiUtils';
import closeIco from '../../assets/icons/x_close.svg';

const dropdownOptions = [
  { value: 'Alberta', label: 'Alberta' },
  { value: 'British Columbia', label: 'British Columbia' },
  { value: 'Manitoba', label: 'Manitoba' },
  { value: 'New Brunswick', label: 'New Brunswick' },
  { value: 'Newfoundland', label: 'Newfoundland' },
  { value: 'Nova Scotia', label: 'Nova Scotia' },
  { value: 'Ontario', label: 'Ontario' },
  { value: 'Prince Edward Island', label: 'Prince Edward Island' },
  { value: 'Quebec', label: 'Quebec' },
  { value: 'Saskatchewan', label: 'Saskatchewan' },
  { value: 'Northern Territories', label: 'Northern Territories' },
  { value: 'Nunavut', label: 'Nunavut' },
  { value: 'Yukon', label: 'Yukon' },
];

// type userData = {
//   userData: {
//     first_name: string,
//     last_name: string,
//     address: ?string,
//     city: string,
//     province: string,
//     phone: number,
//     volunteer: boolean,
//     postal: string,
//     avatar_url: ?string,
//     updated_at: string
//   }
// }

const EditProfile = ({
  userData, toggleEditProfile, setUserData,
}) => {
  // STATE HOOKS
  const [firstName, setFirstName] = useState(userData.first_name || '');
  const [lastName, setLastName] = useState(userData.last_name || '');
  const [address, setAddress] = useState(userData.address || '');
  const [city, setCity] = useState(userData.city || '');
  const [province, setProvince] = useState(userData.province || '');
  const [phone, setPhone] = useState(userData.phone || '');
  const [volunteer, setVolunteer] = useState(userData.volunteer || 'false');
  const [postalCode, setPostalCode] = useState();
  const [hasSubmitted, toggleSubmitted] = useState(false);
  // Function to set opopsite editProfile STATE
  const toggleEdit = () => toggleEditProfile((event) => !event);

  // Handle the submission of the form by validating content and then doing an api PUT req
  const handleSubmit = (event) => {
    event.preventDefault();
    let user = { ...userData };

    !firstName || !lastName || !city || !province || !phone || !volunteer ? (
      toggleSubmitted((checked) => !checked)
    ) : (
      apiUtils.editProfile({
        first_name: firstName,
        last_name: lastName,
        address,
        city,
        province,
        phone,
        volunteer,
      })
        .then(
          user = {
            ...{
              first_name: firstName,
              last_name: lastName,
              address,
              city,
              province,
              phone,
              volunteer,
            },
          },
          setUserData(user),
          toggleEdit(),
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
            onClick={toggleEdit}
            onKeyUp={(e) => e.key === 'Escape' && toggleEdit}
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
            onSubmit={handleSubmit}
            className="edit-form__form"
          >
            <label className="edit-form__label">
              FIRST NAME*
              {!firstName && hasSubmitted
                && <span className="edit-form__label--error"> Please enter your first name</span>}
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`edit-form__field ${!firstName && hasSubmitted
                  && 'edit-form__field--error'}`}
              />
            </label>
            <label className="edit-form__label">
              LAST NAME*
              {!lastName && hasSubmitted
                && <span className="edit-form__label--error"> Please enter your last name</span>}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`edit-form__field ${!lastName && hasSubmitted
                  && 'edit-form__field--error'}`}
              />
            </label>
            <label className="edit-form__label--address">
              ADDRESS
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="edit-form__field"
              />
            </label>
            <label className="edit-form__label">
              CITY*
              {!city && hasSubmitted
                && <span className="edit-form__label--error"> A city is required</span>}
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`edit-form__field ${!city && hasSubmitted
                  && 'edit-form__field--error'}`}
              />
            </label>
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
                  options={dropdownOptions}
                  id="province"
                  className={`edit-form__field ${!province && hasSubmitted
                    && 'edit-form__field--error'}`}
                />
              </label>
            </div>
            <label className="edit-form__label">
              PHONE*
              {!phone && hasSubmitted
                && <span className="edit-form__label--error"> A phone number you can be reached is required</span>}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`edit-form__field ${!phone && hasSubmitted
                  && 'edit-form__field--error'}`}
              />
            </label>
            <label className="edit-form__label">
              POSTAL CODE
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="edit-form__field"
              />
            </label>
            <div className="edit-form__input-block">
              <h3 className="edit-form__label--volunteer">
                VOLUNTEER
              </h3>
              <label className="edit-form__label">
                YES
                <input
                  type="radio"
                  value="true"
                  checked={volunteer === 'true'}
                  onChange={(e) => setVolunteer(e.target.value)}
                  className="edit-form__radio"
                />
              </label>
              <label className="edit-form__label">
                NO
                <input
                  type="radio"
                  value="false"
                  checked={volunteer === 'false'}
                  onChange={(e) => setVolunteer(e.target.value)}
                  className="edit-form__radio"
                />
              </label>
            </div>
            <div className="edit-form__button-block">
              <button
                type="submit"
                className="edit-form__button--submit"
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={toggleEdit}
                className="edit-form__button--cancel"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditProfile);
