import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import StakeDialog from "../dialogs/stake";
import UnstakeDialog from "../dialogs/unstake";
import ClaimRewardsDialog from "../dialogs/claimrewards";
import UnstakeAllDialog from "../dialogs/unstakeall";
import CircularProgress from "@material-ui/core/CircularProgress";

import ConfirmationClaimAlert from "../alerts/confirmation";
import ConfirmationClaimAndUnstakeAllAlert from "../alerts/confirmation";
import ConfirmationDepositAlert from "../alerts/confirmation";
import ConfirmationWithdrawAlert from "../alerts/confirmation";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import bigDecimal from "js-big-decimal";
import { injected } from "../../stores/connectors";
import Header from "../header";
import { colors } from "../../theme";
import Store from "../../stores";
import {
  CONNECTION_CONNECTED, CONNECTION_DISCONNECTED,
  STAKE,
  STAKE_RETURNED, GET_BALANCES_PERPETUAL, GET_BALANCES_PERPETUAL_RETURNED, CONFIGURE, WITHDRAW, GET_REWARDS, EXIT
} from "../../constants";
import RXBackgroundImage2 from "../../assets/png/RX_background2_2000.png";
var ranges = [
  { divider: 1e18, suffix: "E" },
  { divider: 1e15, suffix: "P" },
  { divider: 1e12, suffix: "T" },
  { divider: 1e9, suffix: "G" },
  { divider: 1e6, suffix: "M" },
  { divider: 1e3, suffix: "K" },
];
const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const styles = (theme) => ({
  "@global": {
    body: {
      backgroundImage: `url(${RXBackgroundImage2})`,
      //backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      //backgroundPosition: "center center",
    },
  },
  root: {},
  container1: {
    //backgroundColor: "red",
    marginBottom: "2em",
  },
  container2: {
    borderRadius: 2,
    backgroundColor: colors.bgColor4,
    paddingTop: "2em",
    paddingBottom: "2em",
  },
  container2_gap_down: {
    marginBottom: "2em",
  },
  container3: {
    borderRadius: 2,
    backgroundColor: colors.bgColor1,
    paddingTop: "2em",
    paddingBottom: "2em",
    border: "1px solid rgb(6, 196, 222, 0.2)",
  },
  paper: {
    //padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 2,
    backgroundColor: colors.bgColor4,
    height: "7em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper2: {
    color: theme.palette.text.secondary,
    borderRadius: 2,
    backgroundColor: colors.bgColor4,
    height: "7em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper2_item: {
    display: "flex",
    flexDirection: "row",
    //alignContent: "center",
    alignSelf: "center",
    //alignItem: "center",
    //textAlign: "center"
  },
  paper2_item_gap_down: {
    marginBottom: "1em",
  },
  paper3: {
    //padding: theme.spacing(4),
    //textAlign: "center",
    //color: theme.palette.text.secondary,
    //borderRadius: 2,
    //backgroundColor: colors.bgColor3,
    //height: "7em",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "transparent",
    //paddingTop: "2em",
    //paddingBottom: "2em"
  },
  paper3_item: {
    //backgroundColor: 'red'
  },
  paper4: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    //textAlign: "center"
    //backgroundColor: "yellow",
    //marginLeft: "6em",
    //marginRight: "6em"
    //width: "50%",
    //alignSelf: "center"
  },
  paper4Inner: {
    width: "7em",
    //backgroundColor: 'yellow',
    textAlign: "center",
  },
  paper5: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "2em",
    marginRight: "2em",
  },
  paper6: {
    display: "flex",
    flexDirection: "column",
    //backgroundColor: "white",
    textAlign: "right",
    marginRight: "2em",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0em",
      textAlign: "center",
    },
  },
  paper7: {
    display: "flex",
    flexDirection: "column",
    //backgroundColor: "white",
    textAlign: "left",
    marginRight: "2em",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0em",
      textAlign: "center",
    },
  },
  label1: {
    marginBottom: "1em",
    color: colors.textColor1,
  },
  value1: {
    color: colors.white,
  },
  label2: {
    color: colors.textColor1,
    width: "8em",
  },
  value2: {
    color: colors.white,
  },
  label3: {
    color: colors.textColor1,
  },
  label3_gap_down: {
    marginBottom: "0.5em",
  },
  value3: {
    color: colors.white,
  },
  buttonStake: {
    color: colors.textColor1
  },
  // stakingDividerContainer: {
  //   width: "50%",
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  // },
  stakingDivider: {
    backgroundColor: "rgb(6, 196, 222, 0.2)",
  },
  buttonClaim: {
    paddingTop: "1.5em",
    paddingBottom: "1.5em",
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(6, 196, 222, 0.2)",
    color: colors.textColor1,
    textTransform: "none",
  },
  buttonExit: {
    paddingTop: "1.5em",
    paddingBottom: "1.5em",
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.lightred,
    color: colors.red,
    textTransform: "none",
  },
  rewardsText: {
    color: colors.textColor1,
    marginBottom: "1em",
  },
  rewardsValueText: {
    color: colors.white,
    marginBottom: "1em",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});



const Staking = (props) => {
  //const classes = useStyles();
  const { classes } = props;
  const location = useLocation();
  const history = useHistory();
  const [isStakeDialogOpen, setIsStakeDialogOpen] = useState(false);
  const [isUnstakeDialogOpen, setIsUnstakeDialogOpen] = useState(false);
  const [isClaimRewardsDialogOpen, setIsClaimRewardsDialogOpen] = useState(
    false
  );
  const [isUnstakeAllDialogOpen, setIsUnstakeAllDialogOpen] = useState(false);
  const [openExitClaimModal, setOpenExitClaimModal] = useState(false);
  const [pools, setPools] = useState(store.getStore("rewardPools"));
  const [farmingpool, setFarmingPool] = useState(store.getStore("poolAssets"));
  const [address, setAddress] = useState("");
  const [account, setAccount] = useState('');
  let isconfigured = false;
  const [rewardPool, setRewardPool] = useState({});
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const [
    isConfirmationClaimAlertOpen,
    setIsConfirmationClaimAlertOpen,
  ] = useState(false);
  const [
    isConfirmationClaimAndUnstakeAllAlertOpen,
    setIsConfirmationClaimAndUnstakeAllAlertOpen,
  ] = useState(false);

  const [isOpenConfirmationDepositAlert, setIsOpenConfirmationDepositAlert] = useState(false);
  const [isOpenConfirmationWithdrawAlert, setIsOpenConfirmationWithdrawAlert] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      emitter.on(CONNECTION_CONNECTED, connectionConnected);
      emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected);
      emitter.on(GET_BALANCES_PERPETUAL_RETURNED, balancesReturned);
      pools.map((pool) => {
        console.log("id", pool.id);
      });
    }

    bootstrapAsync();

    return function cleanup() {
      console.log('cleanup here in staking.js');
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected);
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected);
      emitter.removeListener(GET_BALANCES_PERPETUAL_RETURNED, connectionDisconnected);
    };
  }, []);

  const balancesReturned = () => {
    console.log("balances returned");
    let rewardPools = store.getStore("rewardPools");
    let poolAssets = store.getStore("poolAssets");
    console.log(rewardPools)
    setPools(rewardPools)
    setFarmingPool(poolAssets)

  }

  const formatNumber = (n) => {
    for (var i = 0; i < ranges.length; i++) {
      if (n >= ranges[i].divider) {
        return (n / ranges[i].divider).toString() + ranges[i].suffix;
      }
    }
    return n.toString();
  };


  const onToggleStakeDialog = () => {
    if (isStakeDialogOpen) {
      setIsStakeDialogOpen(false);
    } else {
      setIsStakeDialogOpen(true);
      setDepositAmount("");
    }
  };

  const connectionConnected = () => {
    console.log("connectionConnected");

    const account = store.getStore("account");
    console.log("account", account);
    console.log(isconfigured);
    if (!isconfigured) {
      isconfigured = true;
      dispatcher.dispatch({ type: CONFIGURE, content: {} })

    }
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
  /* const rewardPoolSet = () => {
     console.log("setting reward pool");
 
     const pool = store.getStore("rewardPools");
     
     console.log(pool[0]);
    // setRewardPool(pool[0]);
     console.log(rewardPool);
     setRvxUsd({
       usd:pool[0].tokens[0].rvxpriceusd,
       unit:"$"
     })
     setBalanceNotYetStake({
       amount:pool[0].tokens[0].balance,
       unit:"RVX"
     })
     setBalanceCurrentlyStaking({
       amount:pool[0].tokens[0].stakedBalance,
       unit:"RVX"
     })
     setRewardsAvailable({
       amount:pool[0].tokens[0].rewardsAvailable,
       unit:"RVX"
     })
     setRrvxBalance({
       amount:pool[0].tokens[0].rRvxbalance,
       unit:"rRVX"
     })
     setTVL({
       usd:pool[0].tokens[0].rvxpriceusd * pool[0].tokens[0].totalRVXstaked,
       unit:"$"
     })
    
   };*/

  const connectionDisconnected = () => {
    console.log("connectionDisconnected");
    setAccount('');
    setAddress('');
  };

  const onToggleConfirmationDepositAlert = (opt) => {
    const pool = store.getStore("rewardPools");
    console.log("onToggleDepositConfirmationAlert", opt);
    if (isOpenConfirmationDepositAlert) {
      let tokenbalance = new bigDecimal(pool[0].tokens[0].balance.toString())
      let depositamount = new bigDecimal(depositAmount.toString())
      setIsOpenConfirmationDepositAlert(false);
      if (opt === "yes") {
        if (typeof depositAmount === "undefined") {
          setMessage("There is an error amount to stake");
          setOpenMessage(true);
          return;
        }

        if (depositAmount === "") {
          setMessage("Please enter amount to stake");
          setOpenMessage(true);
          return;
        }

        if (isNaN(depositAmount)) {
          setMessage("Please enter valid amount in number");
          setOpenMessage(true);
          return;
        }

        if (depositAmount <= 0) {
          setMessage("Please enter amount greater than zero");
          setOpenMessage(true);
          return;
        }

        if (depositamount.compareTo(tokenbalance) === 1) {
          setMessage("You have entered an amount greater than your balance");
          setOpenMessage(true);
          return;
        }

        onToggleStakeDialog();
        console.log("proceed to stake");
        console.log(pool[0])
        dispatcher.dispatch({ type: STAKE, content: { asset: pool[0].tokens[0], amount: depositAmount } })
        // deposit logic here

        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setDepositAmount("");
        }, 3000);
      }
    } else {
      setIsOpenConfirmationDepositAlert(true);
    }
  };

  const onToggleConfirmationWithdrawAlert = (opt) => {
    const pool = store.getStore("rewardPools");
    console.log("onToggleConfirmationWithdrawAlert", opt);
    if (isOpenConfirmationWithdrawAlert) {
      let tokenbalance = new bigDecimal(pool[0].tokens[0].rRvxbalance.toString())
      let withdrawamount = new bigDecimal(withdrawAmount.toString())
      setIsOpenConfirmationWithdrawAlert(false);
      if (opt === "yes") {
        if (typeof withdrawAmount === "undefined") {
          setMessage("There is an error amount to unstake");
          setOpenMessage(true);
          return;
        }

        if (withdrawAmount === "") {
          setMessage("Please enter amount to unstake");
          setOpenMessage(true);
          return;
        }

        if (isNaN(withdrawAmount)) {
          setMessage("Please enter valid amount in number");
          setOpenMessage(true);
          return;
        }

        if (withdrawAmount <= 0) {
          setMessage("Please enter amount greater than zero");
          setOpenMessage(true);
          return;
        }

        if (withdrawamount.compareTo(tokenbalance) === 1) {
          setMessage("You have entered an amount greater than your balance");
          setOpenMessage(true);
          return;
        }

        onToggleUnstakeDialog();
        console.log("proceed to unstake");
        console.log(pool[0])
        dispatcher.dispatch({ type: WITHDRAW, content: { asset: pool[0].tokens[0], amount: withdrawAmount } })
        // deposit logic here


        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setWithdrawAmount("");
        }, 3000);
      }
    } else {
      setIsOpenConfirmationWithdrawAlert(true);
    }
  };

  const onExitStakeDialog = () => {
    console.log("onExitStakeDialog");
  };

  const onToggleUnstakeDialog = () => {
    if (isUnstakeDialogOpen) {
      setIsUnstakeDialogOpen(false);
    } else {
      setIsUnstakeDialogOpen(true);
      setWithdrawAmount("");
    }
  };

  const onExitUnstakeDialog = () => {
    console.log("onExitUnstakeDialog");
  };

  const onToggleConfirmationClaimAlert = (opt) => {
    const pool = store.getStore("rewardPools");
    if (isConfirmationClaimAlertOpen) {
      setIsConfirmationClaimAlertOpen(false);
      if (opt === "yes") {
        console.log("proceed to claim rewards");
        dispatcher.dispatch({ type: GET_REWARDS, content: { asset: pool[0].tokens[0] } })
        // claim rewards logic here

        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } else {
      setIsConfirmationClaimAlertOpen(true);
    }
  };

  const onToggleConfirmationClaimAndUnstakeAllAlert = (opt) => {
    const pool = store.getStore("rewardPools");
    if (isConfirmationClaimAndUnstakeAllAlertOpen) {
      setIsConfirmationClaimAndUnstakeAllAlertOpen(false);
      if (opt === "yes") {
        console.log("proceed to exit and claim all rewards");
        dispatcher.dispatch({ type: EXIT, content: { asset: pool[0].tokens[0] } })
        // claim all rewards logic here

        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } else {
      setIsConfirmationClaimAndUnstakeAllAlertOpen(true);
    }
  };

  const onToggleLoading = () => {
    if (isLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  const onChangeTextInputDeposit = (event) => {
    let val = [];
    val[event.target.id] = event.target.value;
    console.log("val", val);
    setDepositAmount(event.target.value);
  };

  const onToggleDepositPercentage = (percentage) => {
    console.log("onToggleDepositPercentage", percentage);

    let bigAmount = new bigDecimal(pools[0].tokens[0].balance);
    let bigPercentage = new bigDecimal(percentage);
    let big100 = new bigDecimal("100");
    let new_amount = bigAmount
      .multiply(bigPercentage)
      .divide(big100, 18)

    setDepositAmount(new_amount.getValue());
  };

  const onChangeTextInputWithdraw = (event) => {
    let val = [];
    val[event.target.id] = event.target.value;
    console.log("val", val);
    setWithdrawAmount(event.target.value);
  };

  const onToggleWithdrawPercentage = (percentage) => {
    console.log("onToggleWithdrawPercentage", percentage);

    let bigAmount = new bigDecimal(pools[0].tokens[0].rRvxbalance);
    let bigPercentage = new bigDecimal(percentage);
    let big100 = new bigDecimal("100");
    let new_amount = bigAmount
      .multiply(bigPercentage)
      .divide(big100, 18)

    setWithdrawAmount(new_amount.getValue());
  };

  const prettyTVL = () => {
    let num = parseFloat(pools[0].tokens[0].rvxpriceusd *  pools[0].tokens[0].totalRVXstaked);
    num = num.toString().slice(0, 12);
    num = Number(num).toFixed(2);
    var s = formatNumber(num);
    let lastchar = s.slice(-1);
    var x = s.indexOf(".");
    s = s.slice(0, x + 2);
    s = s + lastchar;
    return s;
  }

  return (
    <div className={classes.root}>
      <Header logo="staking" />
      <Container maxWidth="md" className={classes.container1}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.label1}>
                Total Value Locked (USD)
              </Typography>
              <Typography variant="h3" className={classes.value1}>
                {prettyTVL()}  $
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.label1}>
                RVX Price
              </Typography>
              <Typography variant="h3" className={classes.value1}>
                {pools[0].tokens[0].rvxpriceusd}   $
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper2}>
              { /* <div
                className={`${classes.paper2_item} ${classes.paper2_item_gap_down}`}
              >
                <Typography variant="h5" className={classes.label2}>
                  Circulating:
                </Typography>
                <Typography variant="h5" className={classes.value2}>
                xxx rvx
                </Typography>
            </div>*/}
              <div className={classes.paper2_item}>
                <Typography variant="h5" className={classes.label2}>
                  Total Supply:
                </Typography>
                <Typography variant="h5" className={classes.value2}>
                  25,000,000 RVX
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Container
        maxWidth="lg"
        className={`${classes.container2} ${classes.container2_gap_down}`}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <div className={classes.paper3}>
                  <Typography
                    variant="h3"
                    className={`${classes.label3} ${classes.label3_gap_down}`}
                  >
                    Balance not staked yet
                  </Typography>
                  <Typography variant="h3" className={classes.value3}>
                    {Math.floor(pools[0].tokens[0].balance * 100000000) / 100000000} RVX
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className={classes.paper3}>
                  <Typography
                    variant="h3"
                    className={`${classes.label3} ${classes.label3_gap_down}`}
                  >
                    Currently Staking
                  </Typography>
                  <Typography variant="h3" className={classes.value3}>
                    {Math.floor(pools[0].tokens[0].stakedBalance * 100000000) / 100000000} RVX
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className={classes.paper4}>
                  <div className={classes.paper4Inner}>
                    <Button
                      className={classes.buttonStake}
                      onClick={onToggleStakeDialog}
                    >
                      <Typography variant="h4" className={classes.buttonStake}>
                        Stake
                      </Typography>
                    </Button>
                    <Divider className={classes.stakingDivider} />
                    <Button
                      className={classes.buttonStake}
                      onClick={onToggleUnstakeDialog}
                    >
                      <Typography variant="h4" className={classes.buttonStake}>
                        Unstake
                      </Typography>
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" className={classes.container3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className={classes.paper7}>
                  <Typography variant="h4" className={classes.rewardsText}>
                    rRvx Balance
                  </Typography>
                  <Typography variant="h4" className={classes.rewardsValueText}>
                    {Math.floor(pools[0].tokens[0].rRvxbalance * 100000000) / 100000000}  rRVX (Staked in YRX pool1: {farmingpool[0].tokens[0].stakedBalance} rRVX )
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.paper6}>
                  <Typography variant="h4" className={classes.rewardsText}>
                    Rewards Available
                  </Typography>
                  <Typography variant="h4" className={classes.rewardsValueText}>
                    {pools[0].tokens[0].rewardsAvailable}  RVX
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className={classes.paper5}>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.buttonClaim}
                    onClick={onToggleConfirmationClaimAlert}
                  >
                    <Typography variant="h3">Claim Rewards</Typography>
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.paper5}>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.buttonExit}
                    onClick={onToggleConfirmationClaimAndUnstakeAllAlert}
                  >
                    <Typography variant="h3">
                      Exit: Claim and Unstake All
                    </Typography>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <StakeDialog
        open={isStakeDialogOpen}
        onToggleDialog={onToggleStakeDialog}
        onToggleConfirmationAlert={onToggleConfirmationDepositAlert}
        onExitDialog={onExitStakeDialog}
        balanceNotYetStake={pools[0].tokens[0].balance}
        depositAmount={depositAmount}
        onChangeTextInputDeposit={onChangeTextInputDeposit}
        onToggleDepositPercentage={onToggleDepositPercentage}
      />
      <UnstakeDialog
        open={isUnstakeDialogOpen}
        onToggleDialog={onToggleUnstakeDialog}
        onToggleConfirmationAlert={onToggleConfirmationWithdrawAlert}
        onExitDialog={onExitUnstakeDialog}
        balanceCurrentlyStaking={pools[0].tokens[0].stakedBalance}
        withdrawAmount={withdrawAmount}
        onChangeTextInputWithdraw={onChangeTextInputWithdraw}
        onToggleWithdrawPercentage={onToggleWithdrawPercentage}
      />
      {/* <ClaimRewardsDialog open={isClaimRewardsDialogOpen} onToggleDialog={onToggleClaimRewardsDialog} /> */}
      {/* <UnstakeAllDialog open={isUnstakeAllDialogOpen} onToggleDialog={onToggleUnstakeAllDialog} /> */}
      <ConfirmationClaimAlert
        open={isConfirmationClaimAlertOpen}
        onToggleDialog={onToggleConfirmationClaimAlert}
        description={"Are you sure to claim your rewards?"}
      />
      <ConfirmationClaimAndUnstakeAllAlert
        open={isConfirmationClaimAndUnstakeAllAlertOpen}
        onToggleDialog={onToggleConfirmationClaimAndUnstakeAllAlert}
        description={"Are you sure to exit and claim all your rewards?"}
      />
      <ConfirmationDepositAlert
        open={isOpenConfirmationDepositAlert}
        onToggleDialog={onToggleConfirmationDepositAlert}
        description={"Are you sure to confirm deposit?"}
      />
      <ConfirmationWithdrawAlert
        open={isOpenConfirmationWithdrawAlert}
        onToggleDialog={onToggleConfirmationWithdrawAlert}
        description={"Are you sure to confirm withdraw?"}
      />
      <Backdrop
        className={classes.backdrop}
        open={isLoading}
      //onClick={onToggleLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openMessage}
        autoHideDuration={5000}
        onClose={() => setOpenMessage(false)}
      >
        <Alert severity="error">{message}</Alert>
      </Snackbar>
      <br />
      <br />
    </div>

    // <div className={classes.root}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" className={classes.title}>
    //         News
    //       </Typography>
    //       <Button color="inherit">Login</Button>
    //     </Toolbar>
    //   </AppBar>
    // </div>
  );
};

Staking.propTypes = {};

export default withStyles(styles)(Staking);
