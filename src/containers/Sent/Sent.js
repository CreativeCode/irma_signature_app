import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Table, TableBody } from '@material-ui/core';

// Icons
import IconButton from '@material-ui/core/IconButton';

import { deleteRequestsElectron } from './../../actions/electron';
import EnhancedTableHead from './EnhancedTableHead.js';
import EnhancedTableBody from './EnhancedTableBody.js';
import EnhancedTableToolbar from './EnhancedTableToolbar.js';

class Sent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      headChecked: false,
    };
  }

  handleSelectAll = (event, checked) => {
    const { requests } = this.props;

    this.setState({
      headChecked: checked,
    });

    Object.keys(requests).forEach(el =>
      this.handleCheckbox(el)(event, checked)
    );
  }

  handleCheckbox = id => (event, checked) => {
    if (checked) {
      this.setState((prevState, props) => ({
        checked: prevState.checked.concat([id]),
      }));
    } else {
      this.setState((prevState, props) => ({
        checked: prevState.checked.filter(el => el !== id),
      }));
    }
  }

  handleDelete = () => {
    const toBeDeleted = this.state.checked;
    deleteRequestsElectron(toBeDeleted);
    this.setState({
      headChecked: false,
      checked: [],
    });
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
            title="Request History"
          />
          <Divider />
          <CardContent style={{ padding: '0px' }}>
            <EnhancedTableToolbar num={this.state.checked.length} onDelete={this.handleDelete} />
            <Table>
              <EnhancedTableHead handleSelect={this.handleSelectAll} checked={this.state.headChecked} />
              <TableBody>
                <EnhancedTableBody handleCheckbox={this.handleCheckbox} checked={this.state.checked} requests={this.props.requests} />
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Sent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  requests: PropTypes.objectOf(PropTypes.object).isRequired,
  requestsFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { storage } = state;

  return {
    ...storage,
  };
}

export default connect(mapStateToProps)(Sent);
