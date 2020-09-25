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

const UnstakeDialog = (props) => {
  const {
    open,
    onToggleDialog,
    onToggleConfirmationAlert,
    onExitDialog,
    balanceCurrentlyStaking,
    withdrawAmount,
    classes,
    onChangeTextInputWithdraw,
    onToggleWithdrawPercentage
  } = props;
  const [isOpenConfirmationAlert, setIsOpenConfirmationAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const onToggleConfirmationAlert = (opt) => {
  //   if (isOpenConfirmationAlert) {
  //     setIsOpenConfirmationAlert(false);
  //     if (opt === "yes") {
  //       onToggleDialog();
  //       console.log("proceed to unstake");
  //       // withdrawal logic here

  //       setIsLoading(true);
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 3000);
  //     }
  //   } else {
  //     setIsOpenConfirmationAlert(true);
  //   }
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
        <DialogTitle id="form-dialog-title">Unstake RVX Token</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h4">
            Available to Withdraw: {balanceCurrentlyStaking.amount} {balanceCurrentlyStaking.unit}
          </Typography>
          <br />
          <TextField
            className={classes.textbox1}
            id="txtWithdraw"
            variant="outlined"
            placeholder="0.00"
            autoComplete="off"
            onChange={onChangeTextInputWithdraw}
            value={withdrawAmount ? withdrawAmount : ""}
          />
          <div className={classes.buttonPercentageContainer}>
            <Button className={classes.buttonPercentage}>
              <Typography variant="h4" onClick={() => onToggleWithdrawPercentage(25)}>25%</Typography>
            </Button>
            <Button className={classes.buttonPercentage}>
              <Typography variant="h4" onClick={() => onToggleWithdrawPercentage(50)}>50%</Typography>
            </Button>
            <Button className={classes.buttonPercentage}>
              <Typography variant="h4" onClick={() => onToggleWithdrawPercentage(75)}>75%</Typography>
            </Button>
            <Button className={classes.buttonPercentage}>
              <Typography variant="h4" onClick={() => onToggleWithdrawPercentage(100)}>100%</Typography>
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
    </>
  );
};

UnstakeDialog.propTypes = {};

export default withStyles(styles)(UnstakeDialog);
