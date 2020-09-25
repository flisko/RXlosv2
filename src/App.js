import React, { Component, useState, useEffect } from "react";

import { reduxStore } from "./redux/store";
import Boot from "./redux/boot";

// material-ui
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { Provider, useSelector } from "react-redux";

import { Switch, Route } from "react-router-dom";
import IpfsRouter from "ipfs-react-router";

import "./i18n";
import interestTheme from "./theme";
import { colors as colorsTheme } from "./theme";

import Header from "./components/header";
import Footer from "./components/footer";

import APR from "./components/apr";
import InvestSimple from "./components/investSimple";
import Manage from "./components/manage";
import Performance from "./components/performance";
import Zap from "./components/zap";
import IDai from "./components/idai";
import Home from "./components/home";
import Vaults from "./components/vault";
import Staking from "./components/staking";
import Stake from "./components/stake";
import Farming from "./components/farming";

import { injected } from "./stores/connectors";

import { CONNECTION_CONNECTED } from "./constants";

import Routes from './router';

import Store from "./stores";
import { colors } from "@material-ui/core";
const emitter = Store.emitter;
const store = Store.store;



const App = () => {

  //const isLoggedIn = useSelector(state => state.Auth.idToken);
  //console.log('isLoggedIn',isLoggedIn)

  useEffect(() => {
  //   injected.isAuthorized().then((isAuthorized) => {
  //     console.log("isAuthorized", isAuthorized);
  //     if (isAuthorized) {
  //       injected
  //         .activate()
  //         .then((a) => {
  //           store.setStore({
  //             account: { address: a.account },
  //             web3context: { library: { provider: a.provider } },
  //           });
  //           emitter.emit(CONNECTION_CONNECTED);
  //           console.log(a);
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     } else {
  //     }
  //   });
  }, []);

  return (
    <Provider store={reduxStore}>
      <ThemeProvider theme={createMuiTheme(interestTheme)}>
        <CssBaseline />
        <Routes />
        {/* <IpfsRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/staking" component={Staking} />
            <Route exact path="/farming" component={Farming} />
            <Route exact path="/vaults" component={Vaults} />
          </Switch>
        </IpfsRouter> */}
      </ThemeProvider>
    </Provider>
  );
};

Boot()
  .then(() => App())
  .catch(error => console.error(error));

export default App;
