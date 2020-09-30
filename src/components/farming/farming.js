import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Accordion from "@material-ui/core/Accordion";
//import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import PoolItem from "../poolitem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import bigDecimal from "js-big-decimal";

//import ConfirmDepositAlert from "../alerts/confirmdeposit";
//import ConfirmWithdrawAlert from "../alerts/confirmwithdraw";
//import ConfirmUnstakeAlert from "../alerts/confirmunstake";

import ConfirmationDepositAlert from "../alerts/confirmation";
import ConfirmationWithdrawAlert from "../alerts/confirmation";
import ConfirmationUnstakeAndWithdrawAlert from "../alerts/confirmation";
import ConfirmationClaimRewardAlert from "../alerts/confirmation";

import Header from "../header";
import { colors } from "../../theme";
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED,
  STAKE,
  STAKE_RETURNED,WITHDRAWFARM,CONFIGURE_RETURNED,GET_BALANCES_FARMING, GET_BALANCES_PERPETUAL,GET_BALANCES_FARMING_RETURNED, GET_BALANCES_PERPETUAL_RETURNED,CONFIGURE, WITHDRAW,GET_REWARDS,EXIT } from "../../constants";
import YBackgroundImage2 from "../../assets/png/Y_background2_2000.png";

import Store from "../../stores";
const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;
var isconfigured = false;

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const styles = (theme) => ({
  "@global": {
    body: {
      backgroundImage: `url(${YBackgroundImage2})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    },
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
  root: {},
  container1: {
    //backgroundColor: "red",
    marginBottom: "2em",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionSummary: {
    // display: "flex",
    // flex: 1,
    // flexDirection: "row",
    // alignContent: "space-around",
    // backgroundColor: 'red'
    // [theme.breakpoints.down("sm")]: {
    //   flexDirection: "column",
    // }
  },
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

const Farming = (props) => {
  //const classes = useStyles();
  const { classes } = props;
  const [rewardPool, setRewardPool] = useState({});
  const location = useLocation();
  const history = useHistory();
  const [defaultPoolId, setDefaultPoolId] = useState(1);
  const [expanded, setExpanded] = useState(defaultPoolId);
  const [account, setAccount] = useState('');
  const [address, setAddress] = useState("");

  const [pools, setPools] = useState(store.getStore("poolAssets"));

  const [selectedPoolId, setSelectedPoolId] = useState(defaultPoolId);
  const [isLoading, setIsLoading] = useState(false);

  const [depositAmountList, setDepositAmountList] = useState({});
  const [withdrawAmountList, setWithdrawAmountList] = useState({});
  const [unstakeAmountList, setUnstakeAmountList] = useState({});

  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const [
    isConfirmationDepositAlertOpen,
    setIsConfirmationDepositAlertOpen,
  ] = useState(false);

  const [
    isConfirmationWithdrawAlertOpen,
    setIsConfirmationWithdrawAlertOpen,
  ] = useState(false);

  const [
    isConfirmationUnstakeAndWithdrawAlertOpen,
    setIsConfirmationUnstakeAndWithdrawAlertOpen,
  ] = useState(false);
  const [
    isConfirmationClaimRewardAlertOpen,
    setIsConfirmationClaimRewardAlertOpen,
  ] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      //console.log('selectedPoolId',selectedPoolId)
      emitter.on(CONNECTION_CONNECTED, connectionConnected);
      emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected);
      emitter.on(CONFIGURE_RETURNED, configureReturned);
      emitter.on(GET_BALANCES_FARMING_RETURNED,farmingBalancesReturned);

      pools.map((pool) => {
        console.log("id", pool.id);
      });
    };

    bootstrapAsync();
    return function cleanup() {
      console.log('cleanup here in staking.js');
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected);
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected);
      emitter.removeListener(GET_BALANCES_FARMING_RETURNED, connectionDisconnected);
    };
  }, []);

  /*const poolAssetsSet = () => {
    console.log("setting reward pool");

    const pool = store.getStore("poolAssets");
    
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

  const configureReturned = () => {
    console.log(isconfigured);
    if(!isconfigured){
      console.log("SETTING ISCONFIGURED TO TRUE");
     isconfigured = true;
     dispatcher.dispatch({ type: GET_BALANCES_FARMING, content: {} })
     
    }
     
   }

   const farmingBalancesReturned = () => {
  console.log("farming balances returned");
  let farmingbalances = store.getStore("poolAssets");
  console.log(farmingbalances)
  setPools(farmingbalances)
     
   }

  const connectionConnected = () => {
    console.log("connectionConnected");

    const account = store.getStore("account");
    console.log("account", account);
    console.log(isconfigured);
    if(!isconfigured){
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
  const connectionDisconnected = () => {
    console.log("connectionDisconnected");
    setAccount('');
    setAddress('');
  };

  const handleChange = (poolId) => (event, isExpanded) => {
    console.log("poolId", poolId);
    setExpanded(isExpanded ? poolId : false);
    setDepositAmountList({});
    setWithdrawAmountList({});
    setUnstakeAmountList({});
  };

  const onToggleConfirmationDepositAlert = (opt, poolId) => {
    console.log("opt", opt);
    console.log("poolId", poolId);

    if (poolId !== null) {
      setSelectedPoolId(poolId);
    }

    if (isConfirmationDepositAlertOpen) {
      setIsConfirmationDepositAlertOpen(false);
      if (opt === "yes") {
        console.log("depositAmountList", depositAmountList);

        const poolItem = pools.filter((pool) => {
          return pool.id === selectedPoolId;
        });
        console.log(poolItem);
        if (poolItem.length === 0) {
          setMessage("Pool Id not found");
          setOpenMessage(true);
          return;
        }

        const currentBalance = poolItem[0].tokens[0].balance;

        const arrayDepositAmountList = Object.entries(depositAmountList);

        if (arrayDepositAmountList.length === 0) {
          setMessage("Please enter amount to deposit");
          setOpenMessage(true);
          return;
        }

        const amountKey = arrayDepositAmountList[0][0];
        const amountValue = arrayDepositAmountList[0][1];

        if (amountKey !== "txtDeposit_" + selectedPoolId) {
          setMessage("There is an error amount to deposit");
          setOpenMessage(true);
          return;
        }

        if (amountValue === "") {
          setMessage("Please enter amount to deposit");
          setOpenMessage(true);
          return;
        }

        if (isNaN(amountValue)) {
          setMessage("Please enter valid amount in number");
          setOpenMessage(true);
          return;
        }

        if (currentBalance < amountValue) {
          setMessage("You have entered an amount greater than your balance");
          setOpenMessage(true);
          return;
        }

        // deposit logic here
        dispatcher.dispatch({ type: STAKE, content: { asset: poolItem[0].tokens[0], amount: amountValue } })
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } else {
      setIsConfirmationDepositAlertOpen(true);
    }
  };

  const onToggleConfirmationWithdrawAlert = (opt, poolId) => {
    console.log("opt", opt);
    console.log("poolId", poolId);

    if (poolId !== null) {
      setSelectedPoolId(poolId);
    }

    if (isConfirmationWithdrawAlertOpen) {
      setIsConfirmationWithdrawAlertOpen(false);
      if (opt === "yes") {
        console.log("withdrawAmountList", withdrawAmountList);

        const poolItem = pools.filter((pool) => {
          return pool.id === selectedPoolId;
        });

        if (poolItem.length === 0) {
          setMessage("Pool Id not found");
          setOpenMessage(true);
          return;
        }

      //  const currentBalance = poolItem[0].yrxBalance;
        const stakedBalance = poolItem[0].tokens[0].stakedBalance;
       

        const arrayWithdrawAmountList = Object.entries(withdrawAmountList);

        if (arrayWithdrawAmountList.length === 0) {
          setMessage("Please enter amount to withdraw");
          setOpenMessage(true);
          return;
        }

        const amountKey = arrayWithdrawAmountList[0][0];
        const amountValue = arrayWithdrawAmountList[0][1];
        if (amountKey !== "txtWithdraw_" + selectedPoolId) {
          setMessage("There is an error amount to withdraw");
          setOpenMessage(true);
          return;
        }

        if (amountValue === "") {
          setMessage("Please enter amount to withdraw");
          setOpenMessage(true);
          return;
        }

        if (isNaN(amountValue)) {
          setMessage("Please enter valid amount in number");
          setOpenMessage(true);
          return;
        }

        if (stakedBalance < amountValue) {
          setMessage("You have entered an amount greater than your staked balance");
          setOpenMessage(true);
          return;
        }
        dispatcher.dispatch({ type: WITHDRAWFARM, content: { asset: poolItem[0].tokens[0], amount: amountValue } })
        // withdraw logic here

        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } else {
      setIsConfirmationWithdrawAlertOpen(true);
    }
  };

  const onToggleConfirmationUnstakeAndWithdrawAlert = (opt, poolId) => {
    console.log("opt", opt);
    console.log("poolId", poolId);

    if (poolId !== null) {
      setSelectedPoolId(poolId);
    }

    if (isConfirmationUnstakeAndWithdrawAlertOpen) {
      setIsConfirmationUnstakeAndWithdrawAlertOpen(false);
      if (opt === "yes") {
        console.log("withdrawAmountList", withdrawAmountList);

        const poolItem = pools.filter((pool) => {
          return pool.id === selectedPoolId;
        });

        if (poolItem.length === 0) {
          setMessage("Pool Id not found");
          setOpenMessage(true);
          return;
        }

        const currentBalance = poolItem[0].yrxBalance;

        const arrayWithdrawAmountList = Object.entries(withdrawAmountList);

        if (arrayWithdrawAmountList.length === 0) {
          setMessage("Please enter amount to unstake");
          setOpenMessage(true);
          return;
        }

        const amountKey = arrayWithdrawAmountList[0][0];
        const amountValue = arrayWithdrawAmountList[0][1];

        if (amountKey !== "txtWithdraw_" + selectedPoolId) {
          setMessage("There is an error amount to unstake");
          setOpenMessage(true);
          return;
        }

        if (amountValue === "") {
          setMessage("Please enter amount to unstake");
          setOpenMessage(true);
          return;
        }

        if (isNaN(amountValue)) {
          setMessage("Please enter valid amount in number");
          setOpenMessage(true);
          return;
        }

        if (currentBalance < amountValue) {
          setMessage("You have entered an amount greater than your balance");
          setOpenMessage(true);
          return;
        }

        // unstake logic here
        dispatcher.dispatch({ type: EXIT, content: { asset: poolItem[0].tokens[0] } })
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } else {
      setIsConfirmationUnstakeAndWithdrawAlertOpen(true);
    }
  };

  const onToggleConfirmationClaimRewarAlert = (opt, poolId) => {
    console.log("opt", opt);
    console.log("poolId", poolId);

    if (poolId !== null) {
      setSelectedPoolId(poolId);
    }

    if (isConfirmationClaimRewardAlertOpen) {
      setIsConfirmationClaimRewardAlertOpen(false);
      if (opt === "yes") {
        console.log("withdrawAmountList", withdrawAmountList);

        const poolItem = pools.filter((pool) => {
          return pool.id === selectedPoolId;
        });

        if (poolItem.length === 0) {
          setMessage("Pool Id not found");
          setOpenMessage(true);
          return;
        }
       // console.log(poolItem);
        const rewardBalance = poolItem[0].tokens[0].yrxBalance;

        if (Number(rewardBalance) === 0) {
          setMessage("You have no rewards to claim");
          setOpenMessage(true);
          return;
        }

        // claim reward logic here
        dispatcher.dispatch({ type: GET_REWARDS, content: { asset: poolItem[0].tokens[0] } })
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } else {
      setIsConfirmationClaimRewardAlertOpen(true);
    }
  };

  const onChangeTextInputDeposit = (event) => {
    //let val = []
    //val[event.target.id] = event.target.value
    //console.log('val',val)

    let key = event.target.id;
    let value = event.target.value;

    if (depositAmountList[key]) {
      console.log("a");
      setDepositAmountList({
        ...depositAmountList,
        [key]: value,
      });
    } else {
      console.log("b");
      setDepositAmountList({
        ...depositAmountList,
        [key]: value,
      });
    }
  };

  const onChangeTextInputWithdraw = (event) => {
    //let val = []
    //val[event.target.id] = event.target.value
    //console.log('val',val)

    let key = event.target.id;
    let value = event.target.value;

    if (withdrawAmountList[key]) {
      console.log("a");
      setWithdrawAmountList({
        ...withdrawAmountList,
        [key]: value,
      });
    } else {
      console.log("b");
      setWithdrawAmountList({
        ...withdrawAmountList,
        [key]: value,
      });
    }
  };

  const onToggleDepositPercentage = (poolid, percentage) => {
    const poolItem = pools.filter((pool) => {
      return pool.id === poolid;
    });

    let bigAmount = new bigDecimal(poolItem[0].tokens[0].balance);
    let bigPercentage = new bigDecimal(percentage);
    let big100 = new bigDecimal("100");
    let new_amount = bigAmount
      .multiply(bigPercentage)
      .divide(big100)
      .round(5, bigDecimal.RoundingModes.DOWN);

    setDepositAmountList({
      ...depositAmountList,
      ["txtDeposit_" + poolid]: new_amount.getValue(),
    });
  };

  const onToggleWithdrawPercentage = (poolid, percentage) => {
    const poolItem = pools.filter((pool) => {
      return pool.id === poolid;
    });

    let bigAmount = new bigDecimal(poolItem[0].tokens[0].yrxBalance);
    let bigPercentage = new bigDecimal(percentage);
    let big100 = new bigDecimal("100");
    let new_amount = bigAmount
      .multiply(bigPercentage)
      .divide(big100)
      .round(5, bigDecimal.RoundingModes.DOWN);

    setWithdrawAmountList({
      ...withdrawAmountList,
      ["txtWithdraw_" + poolid]: new_amount.getValue(),
    });
  };

  const renderPoolsBlocks = () => {
    return pools.map((pool) => {
      //const [depositAmount, setDepositAmount] = useState([]);

      return (
        <PoolItem
          key={pool.id}
          pool={pool}
          expanded={expanded}
          depositAmount={depositAmountList["txtDeposit_" + pool.id]}
          withdrawAmount={withdrawAmountList["txtWithdraw_" + pool.id]}
          onChange={handleChange(pool.id)}
          onChangeTextInputDeposit={onChangeTextInputDeposit}
          onChangeTextInputWithdraw={onChangeTextInputWithdraw}
          onToggleConfirmationDepositAlert={onToggleConfirmationDepositAlert}
          onToggleConfirmationWithdrawAlert={onToggleConfirmationWithdrawAlert}
          onToggleConformationClaimRewardAlert={onToggleConfirmationClaimRewarAlert}
          onToggleConfirmationUnstakeAndWithdrawAlert={
            onToggleConfirmationUnstakeAndWithdrawAlert
          }
          onToggleDepositPercentage={onToggleDepositPercentage}
          onToggleWithdrawPercentage={onToggleWithdrawPercentage}
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      <Header logo="farming" />
      <Container maxWidth="md" className={classes.container1}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            {renderPoolsBlocks()}
          </Grid>
        </Grid>
      </Container>
      <ConfirmationDepositAlert
        open={isConfirmationDepositAlertOpen}
        onToggleDialog={onToggleConfirmationDepositAlert}
        description={"Are you sure to proceed to deposit?"}
      />
      <ConfirmationWithdrawAlert
        open={isConfirmationWithdrawAlertOpen}
        onToggleDialog={onToggleConfirmationWithdrawAlert}
        description={"Are you sure to proceed to withdraw?"}
      />
      <ConfirmationUnstakeAndWithdrawAlert
        open={isConfirmationUnstakeAndWithdrawAlertOpen}
        onToggleDialog={onToggleConfirmationUnstakeAndWithdrawAlert}
        description={"Are you sure to proceed to unstake and withdraw?"}
      />
      <ConfirmationClaimRewardAlert
        open={isConfirmationClaimRewardAlertOpen}
        onToggleDialog={onToggleConfirmationClaimRewarAlert}
        description={"Are you sure to claim rewards?"}
      />
      <Backdrop className={classes.backdrop} open={isLoading}>
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
    </div>
  );
};

Farming.propTypes = {};

export default withStyles(styles)(Farming);
