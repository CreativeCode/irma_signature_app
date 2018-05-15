import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

// Icons
import Delete from 'material-ui-icons/Delete';
import Save from 'material-ui-icons/Save';
import Next from 'material-ui-icons/NavigateNext';

import AttributeDropdown from './../AttributeDropdown/AttributeDropdown';
import { setRequestElectron, getSignatureSavePath, saveSignatureRequestElectron } from './../../actions/electron';
import { createSigrequestFromInput, generateDate } from './../../utils/requestUtils';


class ComposeSigrequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: {},
      errorAttributes: false,
      errorMessage: false,
      sigMessage: '',
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

  validate = () => {
    const errorAttributes = Object.keys(this.state.selectedAttributes).length === 0;
    const errorMessage = this.state.sigMessage.length === 0;

    this.setState({
      errorAttributes,
      errorMessage,
    });

    return !errorAttributes && !errorMessage;
  }

  handleNext = () => {
    if (!this.validate()) {
      return;
    }

    this.props.onComplete({
      sigMessage: this.state.sigMessage,
      attributes: this.state.selectedAttributes,
    });
  }

  handleSigMessageChange = (event) => {
    this.setState({
      sigMessage: event.target.value,
    });
  }

  onDiscard = () => {
    this.props.history.push('/');
  }

  exportRequest = () => {
    if (!this.validate()) {
      return;
    }
    const { sigMessage, selectedAttributes } = this.state;
    const exportedRequest = createSigrequestFromInput('Manually exported', { sigMessage, attributes: selectedAttributes });

    const savePath = getSignatureSavePath();

    if (savePath !== undefined) {
      saveSignatureRequestElectron(exportedRequest, savePath);
      setRequestElectron(exportedRequest, generateDate(), 'Manually exported');
    }
  }

  render() {
    const { selectedAttributes, errorAttributes, errorMessage, sigMessage } = this.state;
    return (
      <div>
        <TextField style={{backgroundColor: '#f5f5f5', border: '1px solid #16a085', padding: '5px 12px', width: 'calc(100% - 34px)'}}
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
          required="true"
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
        <Typography style={{ paddingTop: '20px', paddingBottom: '20px',  fontSize: '14px', color: 'rgba(0, 0, 0, 0.54)'}}>You can save this request and share it manually or proceed to share it by email.</Typography>
          <Button size="small" style={{ float: "left",  marginRight:"20px"}} variant="raised" onClick={this.onDiscard} >
            Discard request
            <Delete style={{ fontSize: "20", marginLeft: "10",  marginRight: "2"}} />
           </Button>
          <Button size="small" style={{ fontSize: "20"}} variant="raised" onClick={this.exportRequest} >
            Save request
            <Save style={{ fontSize: "20", marginLeft: "10",  marginRight: "2"}}/>
          </Button>
          <Button size="small" style={{ float: "right"}} variant="raised" color="primary" onClick={this.handleNext} >
            Next
            <Next style={{ fontSize: "20", marginLeft: "10",  marginRight: "2"}}/>
          </Button>
      </div>
    );
  }
}

ComposeSigrequest.propTypes = {
  onComplete: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ComposeSigrequest);
