import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
//import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import MuiDialogActions from "@material-ui/core/DialogActions";

const styles = (theme) => ({

})

const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      justifyContent: "center"
    },
  }))(MuiDialogActions);

const ConfirmationAlert = (props) => {
  const { open, description, onToggleDialog } = props;

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={false}
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <Typography variant="h4">{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onToggleDialog("no")} color="primary">
          No
        </Button>
        <Button onClick={() => onToggleDialog("yes")} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationAlert.propTypes = {};

export default withStyles(styles)(ConfirmationAlert);
