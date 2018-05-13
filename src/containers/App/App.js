import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { compose } from 'recompose';

import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home';
import Typography from 'material-ui/Typography';

import './App.css';
import logoImg from '../../static/images/logo.png'; //relative path to image

import SideMenu from '../../containers/SideMenu/SideMenu';
import Home from '../../containers/Home/Home';
import RequestSignature from '../../containers/RequestSignature/RequestSignature';
import VerifySignature from '../../containers/VerifySignature/VerifySignature';
import Sent from '../../containers/Sent/Sent';
import Settings from '../../containers/Settings/Settings';
import About from '../../containers/About/About';

import { detectMailClients } from '../../actions';

const IrmaTheme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
});

const drawerWidth = 240;
const styles = theme => ({
  main: {
    minHeight: 200,
    // margin: 90,
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  root: {
    width: '100%',
    height: 1000,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  handleMenuClick = () => {
    this.setState({ showMenu: !this.state.showMenu });
  }

  componentWillMount() {
    const { mailClientsDetected, dispatch } = this.props;
    if (!mailClientsDetected) {
      dispatch(detectMailClients());
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <MuiThemeProvider theme={IrmaTheme}>
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <AppBar style={{ position: 'fixed', backgroundColor: '#074487' }} className={classes.appBar}>
                <Toolbar >
                  <IconButton style={{ marginLeft: '-52', marginRight: '0px', padding: '0px', width: '32px' }} 
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleMenuClick}
                    className={classes.menuButton}
                  >
                    <MenuIcon style={{ marginLeft: '-44'}} />
                  </IconButton >
                  <img style={{ width: '52px', padding: '4px' }} alt={"logo"} src={logoImg} />
                  <Typography type="title" color="inherit" noWrap>
                    Signature app
                </Typography>
                  <div style={{ marginLeft: 'auto', marginRight: '10px' }}>
                    <Link to="/" style={{ color: 'inherit' }}>
                      <IconButton style={{ display: 'block', align: 'right' }} color="inherit" >
                        <HomeIcon />
                      </IconButton>
                    </Link>
                  </div>
                </Toolbar>
              </AppBar>
              <Grid style={{ marginLeft: '0', paddingLeft: '0' }}>
                <Row>
                  {
                    this.state.showMenu &&
                    <Col xs={12} sm={4} >
                      <SideMenu />
                    </Col>
                  }

                  <Col xs >
                    <div className={classes.main}>
                      <Route exact path="/" component={Home} />
                      <Route path="/request-signature" component={RequestSignature} />
                      <Route path="/verify-signature" component={VerifySignature} />
                      <Route path="/sent" component={Sent} />
                      <Route path="/settings" component={Settings} />
                      <Route path="/about" component={About} />
                    </div>
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mailClientsDetected: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { mail } = state;

  return {
    mailClientsDetected: mail.mailClientsDetected,
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps),
)(App);
