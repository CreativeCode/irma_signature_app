import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { CardContent } from 'material-ui/Card';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

class MailClientControl extends Component {
  render() {
    const { mailClients, selectedClient, handleChange } = this.props;
    return (
      <CardContent style={{ paddingLeft: '30px' }}>
        <FormControl>
          <FormLabel>Mail Client</FormLabel>
          <RadioGroup
            value={selectedClient}
            onChange={event => handleChange(event.target.value)}
          >
            {Object.keys(mailClients).map(client =>
              <FormControlLabel
                key={client}
                value={client}
                control={<Radio />}
                label={mailClients[client].description}
              />
             )
            }
          </RadioGroup>
        </FormControl>
      </CardContent>
    );
  }
}

MailClientControl.propTypes = {
  handleChange: PropTypes.func.isRequired,
  mailClients: PropTypes.objectOf(PropTypes.object),
  selectedClient: PropTypes.string.isRequired,
}

export default MailClientControl;