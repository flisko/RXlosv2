import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import { withNamespaces } from "react-i18next";
import { colors } from "../../theme";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SpaIcon from "@material-ui/icons/Spa";
import WidgetsIcon from "@material-ui/icons/Widgets";
import BarChartIcon from "@material-ui/icons/BarChart";
import PieChartIcon from "@material-ui/icons/PieChart";
import SecurityIcon from "@material-ui/icons/Security";

import LogoRX from '../../assets/logo_RX_250.png';
import LogoRXWhite from '../../assets/logo_RX_white_250.png';
import RXBackgroundImage from "../../assets/RX_background_crop.png";
import LogoY from '../../assets/logo_Y_250.png';
import LogoYWhite from '../../assets/logo_Y_white_250.png';
import YBackgroundImage from "../../assets/Y_background_crop.png";

const styles = theme => ({
  root: {
    flex: 1,
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",   
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  headerContainer: {
    border: "1px solid rgb(0, 0, 0)",
    borderRadius: 50,
    borderWidth: 5,
    color: colors.black,
    position: "absolute",
    marginTop: 50,
    backgroundColor: colors.white
  },
  card: {
    flex: "1",
    height: "25vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    borderRadius: "0px",
    transition: "background-color 0.2s linear",
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
      minWidth: "20%",
      minHeight: "50vh"
    }
  },
  earn: {
    backgroundColor: colors.customDark1,
    "&:hover": {
      backgroundColor: colors.pink,
      "& .title": {
        color: colors.white
      },
      "& .icon": {
        color: colors.white
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
      color: colors.pink
    },
    "& .description": {
      display: "none"
    }
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
        backgroundPosition: "center center",
      },
      "& .description": {
        display: "block",
        color: colors.white,
        padding: "48px",
        textAlign: "center"
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
      backgroundPosition: "center center",
    },
    "& .description": {
      display: "none"
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
        backgroundPosition: "center center",
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
      backgroundPosition: "center center",
    },
    "& .description": {
      display: "none"
    }
  },


  zap: {
    backgroundColor: colors.customDark1,
    "&:hover": {
      backgroundColor: colors.blue,
      "& .title": {
        color: colors.white
      },
      "& .icon": {
        color: colors.white
      },
      "& .description": {
        display: "block",
        color: colors.white,
        padding: "48px",
        textAlign: "center"
      }
    },
    "& .title": {
      color: colors.blue,
      display: "block"
    },
    "& .soon": {
      color: colors.blue,
      display: "none"
    },
    "& .icon": {
      color: colors.blue
    },
    "& .description": {
      display: "none"
    }
  },
  apr: {
    backgroundColor: colors.customDark1,
    "&:hover": {
      backgroundColor: colors.lightBlack,
      "& .title": {
        color: colors.white
      },
      "& .icon": {
        color: colors.white
      },
      "& .description": {
        display: "block",
        color: colors.white,
        padding: "48px",
        textAlign: "center"
      }
    },
    "& .title": {
      color: colors.lightBlack
    },
    "& .icon": {
      color: colors.lightBlack
    },
    "& .description": {
      display: "none"
    }
  },
  vault: {
    backgroundColor: colors.customDark1,
    "&:hover": {
      backgroundColor: colors.tomato,
      "& .title": {
        color: colors.white
      },
      "& .icon": {
        color: colors.white
      },
      "& .description": {
        display: "block",
        color: colors.white,
        padding: "48px",
        textAlign: "center"
      }
    },
    "& .title": {
      color: colors.tomato
    },
    "& .icon": {
      color: colors.tomato
    },
    "& .description": {
      display: "none"
    }
  },
  
  cover: {
    backgroundColor: colors.customDark1,
    "&:hover": {
      backgroundColor: colors.compoundGreen,
      "& .title": {
        color: colors.white
      },
      "& .icon": {
        color: colors.white
      },
      "& .description": {
        display: "block",
        color: colors.white,
        padding: "48px",
        textAlign: "center"
      }
    },
    "& .title": {
      color: colors.compoundGreen
    },
    "& .icon": {
      color: colors.compoundGreen
    },
    "& .description": {
      display: "none"
    }
  },
  title: {
    padding: "24px",
    paddingBottom: "0px",
    [theme.breakpoints.up("sm")]: {
      paddingBottom: "24px"
    }
  },
  icon: {
    fontSize: "60px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "100px"
    }
  },
  link: {
    textDecoration: "none"
  }
});

class Home extends Component {
  constructor(props) {
    super();

    this.state = {};
  }

  render() {
    const { classes, t, location } = this.props;

    return (
      <>
        {/* <div className={classes.headerContainer}>          
          <Typography variant={"h3"} className={`${classes.title} title`}>- RX Yield Farming -</Typography>
        </div> */}
        <div className={classes.root}>
          <Card
            className={`${classes.card} ${classes.staking}`}
            onClick={() => {
              this.nav(location.pathname + "staking");
            }}
          >            
            {/* <WidgetsIcon className={`${classes.icon} icon`} /> */}
            {/* <img src={LogoRX} className={`${classes.icon} icon`} /> */}
            <div className={`icon`}></div>
            <Typography variant={"h4"} className={`${classes.description} description`}>
              {
                "Earn your share of RVX from rewards pool by staking RVX"
              }
            </Typography>
            {/* <Typography variant={"h3"} className={`${classes.title} title`}>
              Staking
            </Typography>
            <Typography variant={"h4"} className={`${classes.description} description`}>
              {
                "Vaults follow a unique strategy that are designed to maximize the yield of the deposited asset and minimize risk."
              }
            </Typography> */}
          </Card>
          {/* <Card
            className={`${classes.card} ${classes.vault}`}
            onClick={() => {
              this.nav(location.pathname + "vaults");
            }}
          >
            <PieChartIcon className={`${classes.icon} icon`} />
            <Typography variant={"h3"} className={`${classes.title} title`}>
              {t("Home.Vaults")}
            </Typography>
            <Typography variant={"h4"} className={`${classes.description} description`}>
              {
                "Vaults follow a unique strategy that are designed to maximize the yield of the deposited asset and minimize risk."
              }
            </Typography>
          </Card> */}
          {/* <Card
            className={`${classes.card} ${classes.earn}`}
            onClick={() => {
              this.nav(location.pathname + "earn");
            }}
          >
            <AttachMoneyIcon className={`${classes.icon} icon`} />
            <Typography variant={"h3"} className={`${classes.title} title`}>
              {t("Home.Earn")}
            </Typography>
            <Typography variant={"h4"} className={`${classes.description} description`}>
              {
                "Earn performs profit switching for lending providers, moving your funds between dydx, Aave, Compound autonomously."
              }
            </Typography>
          </Card> */}
          {/* <Card
            className={`${classes.card} ${classes.earn}`}
            onClick={() => {
              this.nav(location.pathname + "farming");
            }}
          >
            <SpaIcon className={`${classes.icon} icon`} />
            <Typography variant={"h3"} className={`${classes.title} title`}>
              Farming
            </Typography>
            <Typography variant={"h4"} className={`${classes.description} description`}>
              {
                "Earn performs profit switching for lending providers, moving your funds between dydx, Aave, Compound autonomously."
              }
            </Typography>
          </Card> */}
          <Card
            className={`${classes.card} ${classes.farming}`}
            onClick={() => {
              this.nav(location.pathname + "farming");
            }}
          >
            <div className={`icon`}></div>
            <Typography variant={"h4"} className={`${classes.description} description`}>
              {
                "Earn your share of YRX Governance Token by staking asset published"
              }
            </Typography>
            {/* <SpaIcon className={`${classes.icon} icon`} />
            <Typography variant={"h3"} className={`${classes.title} title`}>
              Farming
            </Typography>
            <Typography variant={"h4"} className={`${classes.description} description`}>
              {
                "Earn performs profit switching for lending providers, moving your funds between dydx, Aave, Compound autonomously."
              }
            </Typography> */}
          </Card>
          {/* <Card
            className={`${classes.card} ${classes.zap}`}
            onClick={() => {
              this.nav(location.pathname + "zap");
            }}
          >
            <FlashOnIcon className={`${classes.icon} icon`} />
            <Typography variant={"h3"} className={`${classes.title} title`}>
              {t("Home.Zap")}
            </Typography>
          </Card> */}
          {/* <Card
            className={`${classes.card} ${classes.apr}`}
            onClick={() => {
              this.nav(location.pathname + "apr");
            }}
          >
            <BarChartIcon className={`${classes.icon} icon`} />
            <Typography variant={"h3"} className={`${classes.title} title`}>
              {t("Home.Apr")}
            </Typography>
          </Card> */}
          {/* <Card
            className={`${classes.card} ${classes.cover}`}
            onClick={() => {
              window.open("https://yinsure.finance", "_blank");
            }}
          >
            <SecurityIcon className={`${classes.icon} icon`} />
            <Typography variant={"h3"} className={`${classes.title} title`}>
              {t("Home.Cover")}
            </Typography>
            <Typography variant={"h4"} className={`${classes.description} description`}>
              {"Get cover with Nexus Mutual from yinsure.finance"}
            </Typography>
          </Card> */}
        </div>
      </>
    );
  }

  nav = screen => {
    this.props.history.push(screen);
  };
}

export default withNamespaces()(withRouter(withStyles(styles)(Home)));
