import React, { Component } from 'react';

class SignupPage extends Component {
  state = {
    firstName: '',
    lastName: '',
    userName: '',
    address: '',
    city: '',
    province: '',
    phone: undefined
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type='text'
              name='firstName'
              value={this.state.firstName}
              onChange={this.handleChange}
              className=''
            />
          </label>
          <label>
            Last Name:
            <input type='text'
              name='lastName'
              value={this.state.lastName}
              onChange={this.handleChange}
              className=''
            />
          </label>
          <label>
            Address:
            <input type='text'
              name='address'
              value={this.state.address}
              onChange={this.handleChange}
              className=''
            />
          </label>
          <label>
            City:
            <input type='text'
              name='city'
              value={this.state.city}
              onChange={this.handleChange}
              className=''
            />
          </label>
          <label>
            Province:
            <input type='text'
              name='province'
              value={this.state.province}
              onChange={this.handleChange}
              className=''
            />
          </label>
          <label>
            Mobile number:
            <input type='text'
              name='phone'
              value={this.state.phone}
              onChange={this.handleChange}
              className=''
            />
          </label>
        </form>
      </div >
    )
  }
}

export default SignupPage;