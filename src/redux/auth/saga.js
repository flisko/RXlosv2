import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import { createBrowserHistory } from "history";

// import {
//   getToken,
//   getAccessToken,
//   getRefreshToken,
//   clearToken,
// } from "@iso/lib/helpers/utility";

import { getToken } from '../../libraries/helpers/utility';

import actions from "./actions";

import axios from "axios";
//import { loginApi } from "../../services/api";
//import notifications from "@iso/components/Feedback/Notification";

const history = createBrowserHistory();
const fakeApiCall = true; // auth0 or express JWT

export function* loginRequest() {
  yield takeEvery("LOGIN_REQUEST", function* ({ payload }) {   
    console.log("loginRequest");
    const { token, user } = payload;

    //alert(JSON.stringify(user));

    // if (token) {
    //   alert("a");
    //   yield put({
    //     type: actions.LOGIN_SUCCESS,
    //     token: token,
    //     profile: "Profile",
    //   });
    // } else {
    //   const res = yield call(loginApi, user);

    //   //console.log("res", res);

    //   if (res === null) {
    //     notifications["error"]({
    //       message: "Login",
    //       description: "Login Error",
    //     });
    //     yield put({ type: actions.LOGIN_ERROR });
    //   } else {
    //     //console.log("res", res.accessToken);
    //     yield put({
    //       type: actions.LOGIN_SUCCESS,
    //       token: res.accessToken,
    //       accessToken: res.accessToken,
    //       refreshToken: res.refreshToken,
    //       profile: "Profile",
    //     });
    //   }
    // }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    console.log("loginSuccess");

    //yield localStorage.setItem("id_token", payload.token);
    //yield localStorage.setItem("access_token", payload.accessToken);
    //yield localStorage.setItem("refresh_token", payload.refreshToken);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {
    console.log("loginError");
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    console.log("logout");
    //yield clearToken();
    //history.push("/");
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    console.log("checkAuthorization in auth/saga.js");

    //const token = getToken().get("idToken");
    const token = '123123123';
    const address = '0x373874872873873847';
    //console.log('token',token)

    // const accessToken = getAccessToken();
    // const refreshToken = getRefreshToken();
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: token,
        address: address
        //accessToken: accessToken,
        //refreshToken: refreshToken,
        //profile: "Profile",
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
