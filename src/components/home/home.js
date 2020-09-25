import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { colors } from "../../theme";
//import PropTypes from "prop-types";

import LogoRX from "../../assets/png/logo_RX_250.png";
import LogoRXWhite from "../../assets/png/logo_RX_white_250.png";
import RXBackgroundImage from "../../assets/png/RX_background_crop.png";
import LogoY from "../../assets/png/logo_Y_250.png";
import LogoYWhite from "../../assets/png/logo_Y_white_250.png";
import YBackgroundImage from "../../assets/png/Y_background_crop.png";

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    // [theme.breakpoints.up("sm")]: {
    //   flexDirection: "row"
    // }
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  card: {
    flex: "1",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    borderRadius: "0px",
    transition: "background-color 0.2s linear",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {      
      minHeight: "50vh"
    }
    
    // [theme.breakpoints.up("sm")]: {
    //   height: "100vh",
    //   minWidth: "20%",
    //   minHeight: "50vh"
    // }
  },
  staking: {
    backgroundColor: colors.customDark1,
    "&:hover": {
      backgroundImage: `url(${RXBackgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center center",

      "& .title": {
        color: colors.white
      },
      "& .icon": {
        backgroundImage: `url(${LogoRXWhite})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center"
      },
      "& .description": {
        display: "block",
        color: colors.white,
        padding: "48px",
        textAlign: "center",                
      }
    },
    "& .title": {
      color: colors.tomato
    },
    "& .icon": {
      width: 150,
      height: 150,
      backgroundImage: `url(${LogoRX})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center"
    },
    "& .description": {
      display: "none",      
    }
  },
  farming: {
    backgroundColor: colors.customDark1,
    "&:hover": {
      backgroundImage: `url(${YBackgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center center",

      "& .title": {
        color: colors.white
      },
      "& .icon": {
        backgroundImage: `url(${LogoYWhite})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center"
      },
      "& .description": {
        display: "block",
        color: colors.white,
        padding: "48px",
        textAlign: "center"
      }
    },
    "& .title": {
      color: colors.pink
    },
    "& .icon": {
      width: 150,
      height: 150,
      backgroundImage: `url(${LogoY})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center"
    },
    "& .description": {
      display: "none"
    }
  },
  // description: {
  //   textDecoration: "none"
  // }
}));

const Home = props => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  // const nav = screen => {
  //   history.push(screen);
  // };

  return (
    <div className={classes.root}>
      <Card
        className={`${classes.card} ${classes.staking}`}
        component={Link} to="staking"       
      >
        <div className={`icon`} />
        <Typography variant={"h4"} className={`${classes.description} description`}>
          {"Earn your share of RVX from rewards pool by staking RVX"}
        </Typography>
      </Card>
      <Card
        className={`${classes.card} ${classes.farming}`}
        component={Link} to="farming"    
      >
        <div className={`icon`} />
        <Typography variant={"h4"} className={`${classes.description} description`}>
          {"Earn your share of YRX Governance Token by staking asset published"}
        </Typography>
      </Card>
    </div>
  );
};

Home.propTypes = {};

export default Home;
