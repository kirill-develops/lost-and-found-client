/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Select from 'react-select';
import apiUtils from '../../utils/apiUtils';
import closeIco from '../../assets/icons/x_close.svg';
import './EditForm.scss';

const dropdownOptions = [
  { value: 'Alberta', label: 'Alberta' },
  { value: 'British Columbia', label: 'British Columbia' },
  { value: 'Manitoba', label: 'Manitoba' }, { value: 'New Brunswick', label: 'New Brunswick' }, { value: 'Newfoundland', label: 'Newfoundland' },
  { value: 'Nova Scotia', label: 'Nova Scotia' },
  { value: 'Ontario', label: 'Ontario' },
  { value: 'Prince Edward Island', label: 'Prince Edward Island' },
  { value: 'Quebec', label: 'Quebec' },
  { value: 'Saskatchewan', label: 'Saskatchewan' },
  { value: 'Northern Territories', label: 'Northern Territories' },
  { value: 'Nunavut', label: 'Nunavut' },
  { value: 'Yukon', label: 'Yukon' },
]

class EditForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    province: "",
    phone: "",
    email: "",
    volunteer: "false",
  }

  componentDidMount() {
    const { address, city, first_name, last_name, phone, province, volunteer } = this.props.profileData;

    this.setState({
      first_name: first_name,
      last_name: last_name,
      address: address,
      city: city,
      province: province,
      phone: phone,
      volunteer: volunteer || 'false',
      clicked: false
    })
  }

  // Create a change handler for all inputs
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Create a change handler for dropdown
  handleSelectMenu = (e) => {
    this.setState({
      province: e.value,
    });
  };

  // Handle the submission of the form by validating content and then doing an
  // api PUT req
  handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, address, city, province, phone, volunteer } = this.state;

    if (!first_name || !last_name || !city || !province || !phone || !volunteer) {
      this.setState({ clicked: true })
    } else {

      const profileObj = {
        'first_name': first_name,
        'last_name': last_name,
        'address': address,
        'city': city,
        'province': province,
        'phone': phone,
        'volunteer': volunteer,
      }
      console.log("🚀 ~ file: EditForm.js ~ line 82 ~ EditForm ~ profileObj", profileObj);

      apiUtils.editProfile(profileObj)
        .then((_res) => {
          this.props.handleFormSubmit();
        })
    }
  }



  // todo create form validation messages on error state
  render() {

    return (
      <div className='edit-form'>
        <div className='slide-inelliptic-bottom-bck'>
          <div className='edit-form-block'>
            <img
              onClick={this.props.handleCancel}
              src={closeIco}
              alt='close icon'
              className='edit-form__close-ico' />
            <h1 className='edit-form__title'>Edit Profile</h1>
            <div className={'edit-form__filler'}></div>
            <form
              onSubmit={this.handleSubmit}
              className='edit-form__form'>
              <label className='edit-form__label'>
                FIRST NAME*
                <input
                  name='first_name'
                  defaultValue={this.state.first_name}
                  onChange={this.handleChange}
                  className={`edit-form__field ${!this.state.first_name && this.state.clicked ? "edit-form__field--error" : ""}`} />
              </label>
              <label className='edit-form__label'>
                LAST NAME*
                <input
                  name='last_name'
                  defaultValue={this.state.last_name}
                  onChange={this.handleChange}
                  className={`edit-form__field ${!this.state.last_name && this.state.clicked ? "edit-form__field--error" : ""}`} />
              </label>
              <label className='edit-form__label--address'>
                ADDRESS
                <input
                  name='address'
                  defaultValue={this.state.address}
                  onChange={this.handleChange}
                  className={`edit-form__field`} />
              </label>
              <label className='edit-form__label'>
                CITY*
                <input
                  name='city'
                  defaultValue={this.state.city}
                  onChange={this.handleChange}
                  className={`edit-form__field ${!this.state.city && this.state.clicked ? "edit-form__field--error" : ""}`} />
              </label>
              <div className='edit-form__label'>
                <label className='edit-form__label'>
                  PROVINCE*
                  <Select
                    name='province'
                    value={this.state.province}
                    placeholder={this.state.province}
                    onChange={this.handleSelectMenu}
                    options={dropdownOptions}
                    className={`edit-form__field ${!this.state.province && this.state.clicked ? "edit-form__field--error" : ""}`}
                  />
                </label>
              </div>
              <label className='edit-form__label'>
                PHONE*
                <input
                  name='phone'
                  defaultValue={this.state.phone}
                  onChange={this.handleChange}
                  className={`edit-form__field ${!this.state.phone && this.state.clicked ? "edit-form__field--error" : ""}`} />
              </label>
              <label className='edit-form__label'>
                POSTAL CODE
                <input
                  name='postal_code'
                  onChange={this.handleChange}
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
                    name="volunteer"
                    value='true'
                    checked={this.state.volunteer === 'true'}
                    onChange={this.handleChange}
                    className="edit-form__radio"
                  />
                </label>
                <label
                  className='edit-form__label'>
                  NO
                  <input
                    type="radio"
                    name="volunteer"
                    value='false'
                    checked={this.state.volunteer === 'false'}
                    onChange={this.handleChange}
                    className="edit-form__radio"
                  />
                </label>
              </div>
              <div className='edit-form__button-block'>
                <button className='edit-form__button--submit'>SUBMIT</button>
                <button
                  onClick={this.props.handleCancel}
                  className='edit-form__button--cancel'>CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      </div >
    )
  }
}

export default EditForm;