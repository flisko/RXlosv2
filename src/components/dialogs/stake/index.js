import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
//import DialogActions from "@material-ui/core/DialogActions";
//import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
//import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ConfirmationAlert from "../../alerts/confirmation";
import { colors } from "../../../theme";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import bigDecimal from "js-big-decimal";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const styles = (theme) => ({
  "@global": {
    ".MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    ".MuiInputBase-input": {
      textAlign: "center",
    },
    ".MuiDialogTitle-root": {
      //backgroundColor: colors.bgColor4
    },
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {},
  textbox1: {
    width: "50%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#1E2935",
    borderRadius: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h3">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

const StakeDialog = (props) => {
  const {
    open,
    onToggleDialog,
    onToggleConfirmationAlert,
    onExitDialog,
    balanceNotYetStake,
    classes,
    depositAmount,
    onChangeTextInputDeposit,
    onToggleDepositPercentage
  } = props;
  const [isOpenConfirmationAlert, setIsOpenConfirmationAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const [depositAmount, setDepositAmount] = useState();
  //const [openMessage, setOpenMessage] = useState(false);
  //const [message, setMessage] = useState(false);

  // const onToggleConfirmationAlert = (opt) => {
  //   if (isOpenConfirmationAlert) {
  //     setIsOpenConfirmationAlert(false);
  //     if (opt === "yes") {
        
  //       if (typeof depositAmount === "undefined") {
  //         setMessage("There is an error amount to stake");
  //         setOpenMessage(true);
  //         return;
  //       }

  //       if (depositAmount === "") {
  //         setMessage("Please enter amount to stake");
  //         setOpenMessage(true);
  //         return;
  //       }

  //       if (isNaN(depositAmount)) {
  //         setMessage("Please enter valid amount in number");
  //         setOpenMessage(true);
  //         return;
  //       }
    
  //       if (balanceNotYetStake.amount < depositAmount) {
  //         setMessage("You have entered an amount greater than your balance");
  //         setOpenMessage(true);
  //         return;
  //       }

  //       onToggleDialog();
  //       console.log("proceed to stake");
  //       // deposit logic here

  //       setIsLoading(true);
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 3000);
  //     }
  //   } else {
  //     setIsOpenConfirmationAlert(true);
  //   }
  // };

  // const onChangeTextInputDeposit = (event) => {
  //   //let val = []
  //   //val[event.target.id] = event.target.value
  //   //console.log('val',val)
  //   setDepositAmount(event.target.value);
  // };

  return (
    <>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"sm"}
        onExit={onExitDialog}
      >
        <DialogTitle id="form-dialog-title">Stake RVX Token</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h4">
            Available to Deposit: {balanceNotYetStake.amount}{" "}
            {balanceNotYetStake.unit}
          </Typography>
          <br />
          <TextField
            className={classes.textbox1}
            id="txtDeposit"
            variant="outlined"
            placeholder="0.00"
            autoComplete="off"
            onChange={onChangeTextInputDeposit}
            value={depositAmount ? depositAmount : ""}
          />
          <div className={classes.buttonPercentageContainer}>
            <Button className={classes.buttonPercentage}>
              <Typography variant="h4" onClick={() => onToggleDepositPercentage(25)}>25%</Typography>
            </Button>
            <Button className={classes.buttonPercentage}>
              <Typography variant="h4" onClick={() => onToggleDepositPercentage(50)}>50%</Typography>
            </Button>
            <Button className={classes.buttonPercentage}>
              <Typography variant="h4" onClick={() => onToggleDepositPercentage(75)}>75%</Typography>
            </Button>
            <Button className={classes.buttonPercentage}>
              <Typography variant="h4" onClick={() => onToggleDepositPercentage(100)}>100%</Typography>
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onToggleDialog} color="primary">
            <Typography variant="h5">Cancel</Typography>
          </Button>
          <Button onClick={onToggleConfirmationAlert} color="primary">
            <Typography variant="h5">Confirm</Typography>
          </Button>
        </DialogActions>
      </Dialog>
      {/* <ConfirmationAlert
        open={isOpenConfirmationAlert}
        onToggleDialog={onToggleConfirmationAlert}
        description={"Are you sure to confirm?"}
      /> */}
      <Backdrop
        className={classes.backdrop}
        open={isLoading}
        //onClick={onToggleLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openMessage}
        autoHideDuration={5000}
        onClose={() => setOpenMessage(false)}
      >
        <Alert severity="error">{message}</Alert>
      </Snackbar> */}
    </>
  );
};

StakeDialog.propTypes = {};

export default withStyles(styles)(StakeDialog);
