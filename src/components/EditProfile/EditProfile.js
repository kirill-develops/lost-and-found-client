/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Select from 'react-select';
import apiUtils from '../../utils/apiUtils';
import closeIco from '../../assets/icons/x_close.svg';
import './EditProfile.scss';

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
]

const editProfile = ({ profileData, toggleEditProfile }) => {

  const [firstName, setFirstName] = useState(profileData.first_name);
  const [lastName, setLastName] = useState(profileData.last_name);
  const [address, setAddress] = useState(profileData.address);
  const [city, setCity] = useState(profileData.city);
  const [province, setProvince] = useState(profileData.province);
  const [phone, setPhone] = useState(profileData.phone);
  const [volunteer, setVolunteer] = useState(profileData.volunteer || 'false');
  const [postalCode, setPostalCode] = useState();
  const [hasSubmitted, toggleSubmitted] = useState(false);

  // Handle the submission of the form by validating content and then doing an api PUT req
  const handleSubmit = (e) => {
    e.preventDefault();

    !firstName || !lastName || !city || !province || !phone || !volunteer
      ?
      toggleSubmitted(e => !e)
      :
      apiUtils.editProfile({
        'first_name': firstName,
        'last_name': lastName,
        'address': address,
        'city': city,
        'province': province,
        'phone': phone,
        'volunteer': volunteer,
      })
        .then(
          toggleEditProfile(e => !e)
        )
  }

  return (
    <div className='edit-form'>
      {/* Animation wrapper */}
      <div className='slide-inelliptic-bottom-bck'>
        <div className='edit-form-block'>
          {/* close Icon */}
          <img
            onClick={() => toggleEditProfile(e => !e)}
            src={closeIco}
            alt='close icon'
            className='edit-form__close-ico' />
          {/* Title component */}
          <h1 className='edit-form__title'>Edit Profile</h1>
          {/* styled color block */}
          <div className={'edit-form__filler'}></div>
          <form
            onSubmit={handleSubmit}
            className='edit-form__form'>
            <label className='edit-form__label'>
              FIRST NAME*
              {!firstName && hasSubmitted ? <span> Please enter your first name</span> : ""}
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`edit-form__field ${!firstName && hasSubmitted ? "edit-form__field--error" : ""}`} />
            </label>
            <label className='edit-form__label'>
              LAST NAME*
              {!lastName && hasSubmitted ? <span> Please enter your last name</span> : ""}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`edit-form__field ${!lastName && hasSubmitted ? "edit-form__field--error" : ""}`} />
            </label>
            <label className='edit-form__label--address'>
              ADDRESS
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`edit-form__field`} />
            </label>
            <label className='edit-form__label'>
              CITY*
              {!city && hasSubmitted ? <span> A city is required</span> : ""}
              <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`edit-form__field ${!city && hasSubmitted ? "edit-form__field--error" : ""}`} />
            </label>
            <div className='edit-form__label'>
              <label className='edit-form__label'>
                PROVINCE*
                {!province && hasSubmitted ? <span> Your province is required</span> : ""}
                <Select
                  value={province}
                  placeholder={province}
                  onChange={(e) => setProvince(e.value)}
                  options={dropdownOptions}
                  className={`edit-form__field ${!province && hasSubmitted ? "edit-form__field--error" : ""}`}
                />
              </label>
            </div>
            <label className='edit-form__label'>
              PHONE*
              {!phone && hasSubmitted ? <span> A phone number you can be reached is required</span> : ""}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`edit-form__field ${!phone && hasSubmitted ? "edit-form__field--error" : ""}`}
              />
            </label>
            <label className='edit-form__label'>
              POSTAL CODE
              <input
                type='text'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className={`edit-form__field`} />
            </label>
            <div className='edit-form__input-block'>
              <h3 className='edit-form__label--volunteer'>
                VOLUNTEER
              </h3>
              <label
                className='edit-form__label'>
                YES
                <input
                  type="radio"
                  value='true'
                  checked={volunteer === 'true'}
                  onChange={(e) => setVolunteer(e.target.value)}
                  className="edit-form__radio"
                />
              </label>
              <label
                className='edit-form__label'>
                NO
                <input
                  type="radio"
                  value='false'
                  checked={volunteer === 'false'}
                  onChange={(e) => setVolunteer(e.target.value)}
                  className="edit-form__radio"
                />
              </label>
            </div>
            <div className='edit-form__button-block'>
              <button className='edit-form__button--submit'>SUBMIT</button>
              <button
                onClick={() => toggleEditProfile(e => !e)}
                className='edit-form__button--cancel'>CANCEL</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default editProfile;