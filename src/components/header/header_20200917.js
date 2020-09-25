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

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
//import Box from "@material-ui/core/Box";
//import Container from "@material-ui/core/Container";

import RXLogo from "../../assets/png/logo_RX_250.png";
import YLogo from "../../assets/png/logo_Y_250.png";
import { colors } from "../../theme";

import Store from "../../stores";
const emitter = Store.emitter;
const store = Store.store;

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
    paddingLeft: "4em",
    paddingRight: "4em",
    //backgroundColor: 'red',
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

  useEffect(() => {
    const bootstrapAsync = async () => {
      console.log("Header useEffect");
      console.log("account", account);

      if (account.address) {
        setAddress(
          account.address.substring(0, 6) +
            "..." +
            account.address.substring(
              account.address.length - 4,
              account.address.length
            )
        );
      }

      console.log("address", address);

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
  }, []);

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

  const list = (anchor) => (
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
    </div>
  );

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar disableGutters className={classes.toolbar}>
            dd
          </Toolbar>
          {/* <Toolbar disableGutters className={classes.toolbar}>          
            {logoRender}
            {isMobileView ? (
              <React.Fragment>
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
                  {list("left")}
                </Drawer>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div>ss</div>
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
              </React.Fragment>
            )}
          </Toolbar> */}
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

Header.propTypes = {};

export default Header;
