import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
//import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { colors } from "../../theme";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  "@global": {
    ".MuiAccordion-root": {
      //border: "1px solid " + colors.borderBlue,
      borderRadius: 30,
      marginBottom: "1em",
      backgroundColor: colors.bgColor4,
      //margin: "8px 0px",
      // "&:before": {
      //   backgroundColor: "none",
      //   height: "0px"
      // }
    },
    ".MuiAccordionSummary-root": {
      padding: "20px 42px",
    },
    ".MuiAccordionSummary-content": {
      margin: "0px !important",
    },
    ".MuiInputBase-input": {
      color: colors.white,
    },
    ".MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    ".MuiAccordionSummary-expandIcon": {
      color: colors.white,
    },
  },
  accordionSummary: {},
  col1: {
    flexBasis: "34%",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
    },
  },
  col1_label1: {
    color: colors.pink,
    marginBottom: "0.2em",
  },
  col1_label2: {
    color: colors.white,
  },
  col1_label3: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      color: colors.white,
      marginTop: "0.5em",
    },
  },
  col1_label4: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      color: colors.white,
      marginTop: "0.5em",
    },
  },
  col2: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    //backgroundColor: "red",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  col2_label1: {
    color: colors.white,
  },
  col3: {
    flexBasis: "34%",
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  col3_label1: {
    color: colors.labelColor1,
    marginBottom: "0.2em",
  },
  col3_label2: {
    color: colors.white,
  },
  form: {
    width: "100%",
    marginTop: "1em",
  },
  textbox1: {
    width: "100%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#1E2935",
    borderRadius: 20,
  },
  rvxBalanceLabel1: {
    textAlign: "right",
    color: colors.white,
    marginBottom: "1em",
    marginRight: "1em",
  },
  yrxBalanceLabel1: {
    textAlign: "right",
    color: colors.white,
    marginBottom: "1em",
    marginRight: "1em",
  },
  buttonDeposit: {
    width: "100%",
    paddingTop: "1em",
    paddingBottom: "1em",
    borderRadius: 20,
    backgroundColor: "transparent",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.borderColor1,
    color: colors.white,
    textTransform: "none",
  },
  buttonPercentageContainer: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
  buttonPercentage: {
    color: colors.pink,
  },
  buttonWithdrawContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonWithdraw: {
    paddingTop: "1em",
    paddingBottom: "1em",
    borderRadius: 20,
    backgroundColor: "transparent",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.borderColor1,
    color: colors.white,
    textTransform: "none",
    flexBasis: "49%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: colors.bgColor1,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.borderColor1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
}))(MuiAccordionDetails);

const PoolItem = (props) => {
  const {
    classes,
    pool,
    expanded,
    onChange,
    onChangeTextInputDeposit,
    onChangeTextInputWithdraw,
    onToggleConfirmationDepositAlert,
    onToggleConfirmationWithdrawAlert,
    onToggleConfirmationUnstakeAndWithdrawAlert,
    depositAmount,
    withdrawAmount,
    onToggleDepositPercentage,
    onToggleWithdrawPercentage
  } = props;

  //const [depositAmount, setDepositAmount] = useState(0);

  //console.log("depositAmount", depositAmount);

  useEffect(() => {
    const bootstrapAsync = async () => {
      //setDepositAmount(0);
      //console.log('expanded',pool.id + "_expand_" + expanded)
      if (pool.id === expanded) {
        //console.log('pool.id',pool.id)
      } else {
        //setDepositAmount(0)
      }
    };

    bootstrapAsync();
  });

  return (
    <Accordion
      square
      key={pool.id + "_expand"}
      expanded={expanded === pool.id}
      onChange={onChange}
    >
      <AccordionSummary
        className={classes.accordionSummary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id={pool.id + "_panel1bh-header"}
      >
        <div className={classes.col1}>
          <div>
            <Typography variant="h4" className={`${classes.col1_label1}`}>
              Pool {pool.poolNum}
            </Typography>
          </div>
          <div>
            <Typography variant="h3" className={`${classes.col1_label2}`}>
              {pool.name}
            </Typography>
          </div>
          <div>
            <Typography variant="h5" className={`${classes.col1_label3}`}>
              Available to deposit
            </Typography>
          </div>
          <div>
            <Typography variant="h5" className={`${classes.col1_label4}`}>
              {pool.balance} {pool.unit}
            </Typography>
          </div>
        </div>
        <div className={classes.col2}>
          <div>
            <Typography variant="h4" className={`${classes.col2_label1}`}>
              {pool.exchange}
            </Typography>
          </div>
        </div>
        <div className={classes.col3}>
          <div>
            <Typography variant="h4" className={`${classes.col3_label1}`}>
              Available to deposit
            </Typography>
          </div>
          <div>
            <Typography variant="h3" className={`${classes.col3_label2}`}>
              {pool.balance} {pool.unit}
            </Typography>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h5"
                className={`${classes.rvxBalanceLabel1}`}
              >
                Balance: {pool.balance} rRVX
              </Typography>
              <TextField
                className={classes.textbox1}
                id={`txtDeposit_${pool.id}`}
                label=""
                variant="outlined"
                placeholder="0.00"
                onChange={onChangeTextInputDeposit}
                value={depositAmount ? depositAmount : ""}
              />
              <div className={classes.buttonPercentageContainer}>
                <Button className={classes.buttonPercentage} onClick={() => onToggleDepositPercentage(pool.id, 25)}>25%</Button>
                <Button className={classes.buttonPercentage} onClick={() => onToggleDepositPercentage(pool.id, 50)}>50%</Button>
                <Button className={classes.buttonPercentage} onClick={() => onToggleDepositPercentage(pool.id, 75)}>75%</Button>
                <Button className={classes.buttonPercentage} onClick={() => onToggleDepositPercentage(pool.id, 100)}>100%</Button>
              </div>
              <Button
                variant="contained"
                disableElevation
                className={classes.buttonDeposit}
                onClick={() => onToggleConfirmationDepositAlert(null, pool.id)}
              >
                <Typography variant="h4">Deposit</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h5"
                className={`${classes.yrxBalanceLabel1}`}
              >
                Balance: {pool.yrxBalance} YRX
              </Typography>
              <TextField
                className={classes.textbox1}
                id={`txtWithdraw_${pool.id}`}
                label=""
                variant="outlined"
                placeholder="0.00"
                onChange={onChangeTextInputWithdraw}
                value={withdrawAmount ? withdrawAmount : ""}
              />
              <div className={classes.buttonPercentageContainer}>
                <Button className={classes.buttonPercentage} onClick={() => onToggleWithdrawPercentage(pool.id, 25)}>25%</Button>
                <Button className={classes.buttonPercentage} onClick={() => onToggleWithdrawPercentage(pool.id, 50)}>50%</Button>
                <Button className={classes.buttonPercentage} onClick={() => onToggleWithdrawPercentage(pool.id, 75)}>75%</Button>
                <Button className={classes.buttonPercentage} onClick={() => onToggleWithdrawPercentage(pool.id, 100)}>100%</Button>
              </div>
              <div className={classes.buttonWithdrawContainer}>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.buttonWithdraw}
                  onClick={() =>
                    onToggleConfirmationWithdrawAlert(null, pool.id)
                  }
                >
                  <Typography variant="h4">Withdraw</Typography>
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.buttonWithdraw}
                  onClick={() =>
                    onToggleConfirmationUnstakeAndWithdrawAlert(null, pool.id)
                  }
                >
                  <Typography variant="h4">Unstake and Withdraw</Typography>
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

PoolItem.propTypes = {};

export default withStyles(styles)(PoolItem);
