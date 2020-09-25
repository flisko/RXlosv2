import React, { useState, useEffect } from "react";
import clsx from "clsx";
//import PropTypes from "prop-types";
import { useHistory, useLocation, Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import PowerIcon from '@material-ui/icons/Power';

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
//import Box from "@material-ui/core/Box";
//import Container from "@material-ui/core/Container";
import UnlockModal from "../unlock/unlockModal.jsx";

import RXLogo from "../../assets/png/logo_RX_250.png";
import YLogo from "../../assets/png/logo_Y_250.png";
import { colors } from "../../theme";

import { injected } from "../../stores/connectors";

import { CONNECTION_CONNECTED,CONFIGURE, CONFIGURE_RETURNED, CONNECTION_DISCONNECTED,GET_BALANCES_PERPETUAL, GET_BALANCES_PERPETUAL_RETURNED } from "../../constants";

import { useSelector } from "react-redux";

import Store from "../../stores";
const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "6em",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  menuButton: {
    //marginRight: theme.spacing(2)
    paddingRight: "0.6em",
    paddingTop: "0em",
  },
  title: {
    flexGrow: 1,
  },
  logoContainer: {
    flexGrow: 1,
  },
  logo: {
    height: "6em",
    [theme.breakpoints.down("sm")]: {
      height: "3em",
    },
  },
  logoMobileMenu: {
    height: "2em",
  },
  toolbar: {
    paddingTop: "3em",
    paddingBottom: "3em",
    paddingLeft: "4em",
    paddingRight: "4em",
    //backgroundColor: "red",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "1em",
      paddingLeft: "1em",
      paddingRight: "0em",
    },
  },
  buttonBack: {
    backgroundColor: "transparent",
    color: "#0b8f92",
    border: "2px solid rgba(11, 143, 146, 0.5)",
  },
  drawer: {
    //backgroundColor: 'red'
  },
  list: {
    width: 250,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.bgColor2,
  },
  fullList: {
    width: "auto",
  },
  headerLeftContainer: {
    display: "flex",
    justifyContent: "flex-start",
    //backgroundColor: "red",
    //alignContent: "center",
    //alignItems: "center"
  },
  headerMiddleContainer: {
    display: "flex",
    justifyContent: "center",
  },
  headerRightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    verticalAlign: "top",
  },
  mobileHeaderRightContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "1em",
  },
  buttonConnectWallet: {
    paddingTop: "1em",
    paddingBottom: "1em",
    paddingLeft: "2em",
    paddingRight: "2em",
    borderRadius: 30,
    backgroundColor: "transparent",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(6, 196, 222, 0.2)",
    color: colors.textColor1,
    textTransform: "none",
  },
  connectedDot: {
    background: colors.compoundGreen,
    opacity: "1",
    borderRadius: "10px",
    width: "10px",
    height: "10px",
    marginRight: "3px",
    marginLeft: "6px",
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    //elevation: trigger ? 4 : 0
    elevation: trigger ? 0 : 0,
  });
}

const Header = (props) => {
  const idTokenInStore = useSelector((state) => state.Auth.idToken);
  const addressInStore = useSelector((state) => state.Auth.address);
 // console.log("idTokenInStore", idTokenInStore);
 // console.log("addressInStore", addressInStore);
  let isconfigured = false;
  const classes = useStyles();
  const { logo } = props;
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, setState] = useState({
    left: false,
  });
  const [account, setAccount] = useState(store.getStore("account"));
  const [address, setAddress] = useState("");
  const [logoRender, setLogoRender] = useState();
  const [isOpenUnlockModal, setIsOpenUnlockModal] = useState(false);

  //console.log("account", account);

  useEffect(() => {
    const bootstrapAsync = async () => {
      console.log("Header useEffect");

      emitter.on(CONNECTION_CONNECTED, connectionConnected);
      emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected);
      emitter.on(CONFIGURE_RETURNED, configureReturned);
      emitter.on(GET_BALANCES_PERPETUAL_RETURNED, getBalancesReturned);

      injected.isAuthorized().then((isAuthorized) => {
        console.log("isAuthorized", isAuthorized);
        if (isAuthorized) {
          injected
            .activate()
            .then((a) => {
              console.log("a.account", a.account);

              setAddress(
                a.account.substring(0, 6) +
                  "..." +
                  a.account.substring(a.account.length - 4, a.account.length)
              );

              store.setStore({
                account: { address: a.account },
                web3context: { library: { provider: a.provider } },
              });
              emitter.emit(CONNECTION_CONNECTED);
              console.log(a);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });

      switch (logo) {
        case "staking":
          setLogoRender(
            <div className={classes.logoContainer}>
              <img src={RXLogo} className={classes.logo} />
            </div>
          );
          break;
        case "farming":
          setLogoRender(
            <div className={classes.logoContainer}>
              <img src={YLogo} className={classes.logo} />
            </div>
          );
          break;
      }
    };

    bootstrapAsync();

    return function cleanup() {
      console.log('cleanup here in header.js');
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected);
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected);
      emitter.removeListener(GET_BALANCES_PERPETUAL_RETURNED, connectionDisconnected);
    };
  }, []);

  const getBalancesReturned = () => {
    window.setTimeout(() => {
     // dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
    }, 15000)
  }
 const configureReturned = () => {
   console.log(isconfigured);
   if(!isconfigured){
    dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
    isconfigured = true;
   }
    
  }
  const connectionConnected = () => {
    console.log("connectionConnected");

    const account = store.getStore("account");
    console.log("account", account);
  
    setAccount(account);
    setAddress(
      account.address.substring(0, 6) +
        "..." +
        account.address.substring(
          account.address.length - 4,
          account.address.length
        )
    );
  };

  const connectionDisconnected = () => {
    console.log("connectionDisconnected");
    setAccount('');
    setAddress('');
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    console.log("open", open);

    setState({ ...state, [anchor]: open });
  };

  const connectWallet = () => {
    console.log("connectWallet");
    setIsOpenUnlockModal(true);
  };

  const closeUnlockModal = () => {
    setIsOpenUnlockModal(false);
  };

  const renderUnlockModal = () => {
    return (
      <UnlockModal
        closeModal={closeUnlockModal}
        modalOpen={isOpenUnlockModal}
      />
    );
  };

  const list = (anchor, address) => {
    console.log("address", address);
    return (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {["Staking"].map((text, index) => (
            <ListItem component={Link} to="/staking" button key={text}>
              <ListItemIcon>
                <img src={RXLogo} className={classes.logoMobileMenu} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Farming"].map((text, index) => (
            <ListItem component={Link} to="/farming" button key={text}>
              <ListItemIcon>
                <img src={YLogo} className={classes.logoMobileMenu} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        {address ? (
          <React.Fragment>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <div className={classes.connectedDot}></div>
                </ListItemIcon>
                <ListItemText onClick={connectWallet} primary={address} />
              </ListItem>
            </List>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <PowerIcon />
                </ListItemIcon>
                <ListItemText onClick={connectWallet} primary="Connect your wallet" />
              </ListItem>
            </List>
          </React.Fragment>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar disableGutters className={classes.toolbar}>
            {isMobileView ? (
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div className={classes.headerLeftContainer}>
                    {logoRender}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.mobileHeaderRightContainer}>
                    <IconButton
                      onClick={toggleDrawer("left", true)}
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Drawer
                      className={classes.drawer}
                      anchor={"left"}
                      open={state["left"]}
                      onClose={toggleDrawer("left", false)}
                    >
                      {list("left", address)}
                    </Drawer>
                  </div>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <div className={classes.headerLeftContainer}>
                    {logoRender}
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className={classes.headerMiddleContainer}>
                    {address ? (
                      <Button
                        onClick={connectWallet}
                        className={classes.buttonConnectWallet}
                      >
                        {address}
                        <div className={classes.connectedDot}></div>
                      </Button>
                    ) : (
                      <Button
                        onClick={connectWallet}
                        className={classes.buttonConnectWallet}
                      >
                        Connect your wallet
                      </Button>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className={classes.headerRightContainer}>
                    <Button
                      component={Link}
                      to="/"
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.buttonBack}
                      startIcon={<ChevronLeftIcon />}
                    >
                      Back
                    </Button>
                  </div>
                </Grid>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {isOpenUnlockModal && renderUnlockModal()}
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

Header.propTypes = {};

export default Header;
