/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import apiUtils from '../../utils/apiUtils';
import './EditForm.scss';
import closeIco from '../../assets/icons/x_close.svg';

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

  // Handle the submission of the form by validating content and then doing an
  // api PUT req
  handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, address, city, province, phone, volunteer } = e.target;

    if (!first_name.value || !last_name.value || !city.value || !province.value || !phone.value || !volunteer.value) {
      this.setState({ clicked: true })
    } else {

      const profileObj = {
        'first_name': first_name.value,
        'last_name': last_name.value,
        'address': address.value,
        'city': city.value,
        'province': province.value,
        'phone': phone.value,
        'volunteer': volunteer.value,
      }

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
        <div className='edit-form-block'>
          <img
            onClick={this.props.handleCancel}
            src={closeIco}
            alt='close icon'
            className='edit-form__close-ico' />
          <h1 className='edit-form__title'>Edit Profile</h1>
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
                className={`edit-form__field ${!this.state.address && this.state.clicked ? "edit-form__field--error" : ""}`} />
            </label>
            <label className='edit-form__label'>
              CITY*
              <input
                name='city'
                defaultValue={this.state.city}
                onChange={this.handleChange}
                className={`edit-form__field ${!this.state.city && this.state.clicked ? "edit-form__field--error" : ""}`} />
            </label>
            <label className='edit-form__label'>
              PROVINCE*
              <input
                name='province'
                defaultValue={this.state.province}
                onChange={this.handleChange}
                className={`edit-form__field ${!this.state.province && this.state.clicked ? "edit-form__field--error" : ""}`} />
            </label>
            <label className='edit-form__label'>
              PHONE*
              <input
                name='phone'
                defaultValue={this.state.phone}
                onChange={this.handleChange}
                className={`edit-form__field ${!this.state.phone && this.state.clicked ? "edit-form__field--error" : ""}`} />
            </label>
            <div className='edit-form__input-block'>
              <h3 className='edit-form__label'>
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
            <button className='edit-form__button'>SUBMIT</button>
          </form>
        </div>
      </div >
    )
  }
}

export default EditForm;