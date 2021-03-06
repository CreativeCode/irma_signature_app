import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Next from '@material-ui/icons/NavigateNext';

import AttributeDropdown from './AttributeDropdown';

class ComposeSigrequest extends Component {
  constructor(props) {
    super(props);
    const initialAttributes = props.initialSigrequest ? props.initialSigrequest.attributes : null;
    const initialMessage = props.initialSigrequest ? props.initialSigrequest.sigMessage : null;
    this.state = {
      selectedAttributes: initialAttributes || {},
      sigMessage: initialMessage || '',
      validationForced: false,
    };
  }

  addAttribute = (id, value) => {
    this.setState((prevState) => {
      const selected = prevState.selectedAttributes;
      return {
        selectedAttributes: {
          ...selected,
          [id]: value,
        }
      }
    });
  }

  removeAttribute = (id) => {
    this.setState((prevState) => {
      const selected = prevState.selectedAttributes;
      // TODO: better way to delete key from object?
      const newSelected = Object.keys(selected)
        .reduce((acc, val) => {
          if (val !== id) {
            acc[val] = selected[val];
          }
          return acc;
        }, {});
      return {
        selectedAttributes: newSelected,
      };
    });
  }

  validateMessage() {
    return this.state.sigMessage.length !== 0;
  }

  validateAttributes() {
    return Object.keys(this.state.selectedAttributes).length !== 0
  }

  validate() {
    return this.validateMessage() && this.validateAttributes();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedAttributes, sigMessage } = this.state
    if (prevState.selectedAttributes !== selectedAttributes
        || prevState.sigMessage !== sigMessage) {
      this.props.onChange({
        attributes: selectedAttributes,
        sigMessage: sigMessage
      });
    }
  }
  
  forceValidate = (continuation) => () => {
    if (!this.validate()) {
      this.setState({validationForced: true});
      return;
    }
    
    continuation()
  }

  handleSigMessageChange = (event) => {
    this.setState({
      sigMessage: event.target.value,
    });
  }

  render() {
    const { selectedAttributes, sigMessage, validationForced } = this.state;
    const errorMessage = !this.validateMessage() && validationForced;
    const errorAttributes = !this.validateAttributes() && validationForced;
    return (
      <div>
        <TextField style={{ backgroundColor: '#f5f5f5', border: '1px solid #16a085', padding: '5px 12px', width: 'calc(100% - 34px)' }}
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          label={errorMessage ? "This field is required" : "Message to be signed"}
          onChange={this.handleSigMessageChange}
          value={sigMessage}
          multiline
          rows="4"
          rowsMax="10"
          required={true}
          fullWidth
          margin="normal"
          error={errorMessage}
        />
        {(errorAttributes ? <Typography style={{ paddingTop: '20px', fontSize: '14px', color: 'red', paddingBottom: '6px' }}>You should select at least one attribute!</Typography> : '')}
        <AttributeDropdown
          selectedAttributes={selectedAttributes}
          addAttribute={this.addAttribute}
          removeAttribute={this.removeAttribute}
        />
        <Typography style={{ paddingTop: '20px', paddingBottom: '20px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.54)' }}>You can export this request and share it manually or proceed to share it by email.</Typography>
        <Button size="small" style={{ float: "left", marginRight: "20px" }} variant="raised" onClick={this.props.onDiscard} >
          Discard request
            <Delete style={{ fontSize: "20", marginLeft: "10", marginRight: "2" }} />
        </Button>
        <Button size="small" style={{ fontSize: "20" }} variant="raised" onClick={this.forceValidate(this.props.exportRequest)} >
          Export request
            <Save style={{ fontSize: "20", marginLeft: "10", marginRight: "2" }} />
        </Button>
        <Button size="small" style={{ float: "right" }} variant="raised" color="primary" onClick={this.forceValidate(this.props.onComplete)} >
          Next
            <Next style={{ fontSize: "20", marginLeft: "10", marginRight: "2" }} />
        </Button>
      </div>
    );
  }
}

ComposeSigrequest.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  exportRequest: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  initialSigrequest: PropTypes.object,
};

export default ComposeSigrequest;
