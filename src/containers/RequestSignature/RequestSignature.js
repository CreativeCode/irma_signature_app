import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import { Card,  CardHeader } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// Icons
import IconButton from '@material-ui/core/IconButton';

import RequestSignatureStepper from './../RequestSignatureStepper/RequestSignatureStepper';
import { sendSignatureRequest } from './../../actions';
import { setRequestElectron } from './../../actions/electron';
import { createSigrequestFromInput, generateDate } from './../../utils/requestUtils';

class RequestSignature extends Component {
  handleComplete = (mail, sigRequest) => {
    const mailClientName = this.props.preferredMailClient;
    const mailClientPath = this.props.mailClients[mailClientName].path;

    const request = createSigrequestFromInput(mail.from, sigRequest);

    sendSignatureRequest(request, mailClientName, mailClientPath, mail);
    setRequestElectron(request, generateDate(), mail.recipient);
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            action={
              <IconButton>
                {/* <HelpIcon /> */}
              </IconButton>
            }
            title="Request a signature"
          />
          <Divider />
          <RequestSignatureStepper onComplete={this.handleComplete} />
        </Card>
      </div>
    );
  }
}

RequestSignature.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mailClients: PropTypes.objectOf(PropTypes.object),
};

function mapStateToProps(state) {
  const { mail } = state;

  return {
    mailClients: mail.mailClients,
    preferredMailClient: mail.preferredMailClient,
  };
}

export default connect(mapStateToProps)(RequestSignature);
