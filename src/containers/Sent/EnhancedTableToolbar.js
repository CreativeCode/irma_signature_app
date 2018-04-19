import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';

// Icons
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

class EnhancedTableToolbar extends Component {
  render() {
    const { num } = this.props;
    if (num === 0) {
      return '';
    }

    return (
      <Toolbar>
          <Typography variant="subheading">{num} selected</Typography>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={this.props.onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
      </Toolbar>
    )
  }
}

EnhancedTableToolbar.propTypes = {
  num: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
