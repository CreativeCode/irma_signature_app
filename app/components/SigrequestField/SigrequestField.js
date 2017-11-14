import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

export default class SigrequestField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sigMessage: '',
      attributeValue: 'pbdf.pbdf.address',
      body: '',
      subject: '',
      dest: '',
      error: false,
    };
  }

  setAttributeValue = (event, index, attributeValue) => this.setState({ attributeValue });

  handleTextFieldChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    return this.setState({
      [id]: value,
    });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    if (this.validate()) {
      onSubmit(this.state);
    }
  }

  validate = () => {
    const error = (
      this.state.sigMessage === '' ||
      this.state.dest === '' ||
      this.state.subject === '' ||
      this.state.body === ''
    );
    this.setState({
      error,
    });
    return !error;
  }

  render() {
    const { disabled } = this.props;
    const errorText = 'This field is required';
    return (
      <div>
        <TextField
          id="sigMessage"
          hintText="Message to be signed"
          errorText={(this.state.error && this.state.sigMessage === '' ? errorText : '')}
          onChange={this.handleTextFieldChange}
          value={this.state.sigMessage}
        />
        <Divider />
        <TextField
          id="subject"
          hintText="Mail subject"
          errorText={(this.state.error && this.state.subject === '' ? errorText : '')}
          onChange={this.handleTextFieldChange}
          value={this.state.subject}
        />
        <Divider />
        <TextField
          id="body"
          hintText="Mail body"
          errorText={(this.state.error && this.state.body === '' ? errorText : '')}
          onChange={this.handleTextFieldChange}
          value={this.state.body}
        />
        <Divider />
        <TextField
          id="dest"
          hintText="Recipient mail address"
          errorText={(this.state.error && this.state.dest === '' ? errorText : '')}
          onChange={this.handleTextFieldChange}
          value={this.state.dest}
        />
        <Divider />
        <SelectField
          floatingLabelText="Select attribute"
          value={this.state.attributeValue}
          onChange={this.setAttributeValue}
        >
          <MenuItem value="pbdf.pbdf.address" primaryText="Address" />
          <MenuItem value="pbdf.pbdf.city" primaryText="City" />
          <MenuItem value="pbdf.pbdf.familyname" primaryText="Name" />
        </SelectField>
        <Divider />
        <Divider />
        <FlatButton
          label="Send signature request"
          fullWidth
          onClick={this.handleSubmit}
          disabled={disabled}
        />
      </div>
    );
  }
}

SigrequestField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
