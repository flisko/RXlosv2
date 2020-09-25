import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Switch,
  Route
} from "react-router-dom";
import IpfsRouter from 'ipfs-react-router'

import './i18n';
import interestTheme from './theme';
import { colors as colorsTheme } from './theme';

import Header from './components/header';
import Footer from './components/footer';

import APR from './components/apr';
import InvestSimple from './components/investSimple';
import Manage from './components/manage';
import Performance from './components/performance';
import Zap from './components/zap';
import IDai from './components/idai';
import Home from './components/home';
import Vaults from './components/vault';
import Staking from './components/staking';
import Stake from './components/stake';
import Farming from './components/farming';

import { injected } from "./stores/connectors";

import {
  CONNECTION_CONNECTED,
} from './constants'

import Store from "./stores";
import { colors } from '@material-ui/core';
const emitter = Store.emitter
const store = Store.store

class App extends Component {
  state = {};

  UNSAFE_componentWillMount() {
    console.log('UNSAFE_componentWillMount')
    injected.isAuthorized().then(isAuthorized => {
      console.log('isAuthorized',isAuthorized)
      // if (isAuthorized) {
      //   injected.activate()
      //   .then((a) => {
      //     store.setStore({ account: { address: a.account }, web3context: { library: { provider: a.provider } } })
      //     emitter.emit(CONNECTION_CONNECTED)
      //     console.log(a)
      //   })
      //   .catch((e) => {
      //     console.log(e)
      //   })
      // } else {

      // }
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={ createMuiTheme(interestTheme) }>
        <CssBaseline />
        <IpfsRouter>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            background: colorsTheme.customDark1
          }}>            
            <Switch>
              <Route path="/apr">
                <Header />
                <APR />
              </Route>
              <Route path="/earn">
                <Header />
                <InvestSimple />
              </Route>
              <Route path="/zap">
                <Header />
                <Zap />
              </Route>
              <Route path="/idai">
                <IDai />
              </Route>
              <Route path="/performance">
                <Header />
                <Performance />
              </Route>
              <Route path="/manage">
                <Header />
                <Manage />
              </Route>
              <Route path="/vaults">
                <Header />
                <Vaults />
              </Route>  
              <Route path="/staking">
                <Header />
                <Staking />
              </Route>  
              <Route path="/stake">
                <Header />
                <Stake />
              </Route>  
              <Route path="/farming">
                <Header />
                <Farming />
              </Route>                                    
              <Route path="/">
                <Home />
              </Route>
            </Switch>
            {/* <Footer /> */}
          </div>
        </IpfsRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
