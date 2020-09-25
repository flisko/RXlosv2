import React from "react";
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

const styles = (theme) => ({
  "@global": {
    ".MuiOutlinedInput-notchedOutline": {
      border: "none"
    },
    ".MuiInputBase-input ": {
      textAlign: "center"
    }
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
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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
    textAlign: "center"
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const StakeDialog = (props) => {
  const { open, onToggleDialog, classes } = props;

  return (
    // <Dialog open={open} aria-labelledby="form-dialog-title">
    //   <DialogTitle id="form-dialog-title">Stake</DialogTitle>
    //   <DialogContent>
    //     <DialogContentText>
    //       Please enter your amount to stake.
    //     </DialogContentText>
    //     <TextField autoFocus margin="dense" id="stakeAmount" label="Amount" type="text" fullWidth />
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={onToggleDialog} color="primary">
    //       Cancel
    //     </Button>
    //     <Button onClick={onToggleDialog} color="primary">
    //       Confirm
    //     </Button>
    //   </DialogActions>
    // </Dialog>
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle id="customized-dialog-title">
        <Typography variant="h3" className={classes.title}>
          Deposit RVX Token
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom variant="h4">
          Available to Deposit: 0.0000 RVX
        </Typography>
        {/* <Typography gutterBottom variant="h4">Please enter your amount to stake.</Typography> */}
        {/* <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
        </Typography> */}
        <TextField
          gutterBottom
          className={classes.textbox1}
          id="outlined-basic"       
          variant="outlined"
          placeholder="0.00"
        /> 
        {/* <TextField required id="standard-required" label="Required" defaultValue="" /> */}
        {/* <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Typography>RVX</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              className={classes.textbox1}
              label="Enter Amount"
              variant="outlined"
            />
          </Grid>
        </Grid> */}
        <div className={classes.buttonPercentageContainer}>
          <Button className={classes.buttonPercentage}>25%</Button>
          <Button className={classes.buttonPercentage}>50%</Button>
          <Button className={classes.buttonPercentage}>75%</Button>
          <Button className={classes.buttonPercentage}>100%</Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onToggleDialog} color="primary">
          Cancel
        </Button>
        <Button autoFocus onClick={onToggleDialog} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

StakeDialog.propTypes = {};

export default withStyles(styles)(StakeDialog);
