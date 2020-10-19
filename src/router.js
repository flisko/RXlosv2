import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import IpfsRouter from "ipfs-react-router";
import { useSelector } from "react-redux";

import Home from "./components/home";
import Staking from "./components/staking";
import Farming from "./components/farming";

const Routes = (props) => {
//   const idToken = useSelector((state) => state.Auth.idToken);
//   const address = useSelector((state) => state.Auth.address);
//   console.log("idToken", idToken);
//   console.log("address", address);

  return (
    <IpfsRouter basename="/">
      <Switch>
        <Route exact path="/" component={Home} />
        {<Route exact path="/staking" component={Staking} />}
        <Route exact path="/farming" component={Farming} />
      </Switch>
    </IpfsRouter>
  );
};

Routes.propTypes = {};

export default Routes;
