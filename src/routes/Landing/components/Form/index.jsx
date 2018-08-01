import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class FormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {

    console.log('this.state on form on change: ', this.state);

    return (
      <Form style={{ margin: '16px', width: '50%' }}>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            onChange={this.handleChange}
            type="text"
            value={'FIX.4'}
            name="firstName"
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            onChange={this.handleChange}
            type="text"
            value={'FIX.5'}
            name="lastName"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            onChange={this.handleChange}
            type="email"
            value={'FIX.6'}
            name="email"
          />
        </FormGroup>
      </Form>
    );
  }
}

export default FormComponent;
