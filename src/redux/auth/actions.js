const loginAsync = (token = false, user) => {
  //console.log("loginAsync in actions");
  alert("loginAsync in actions");
  return {
    type: actions.LOGIN_REQUEST,
    payload: { token, user },
  };
};

const actions = {
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",

  //checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),

  checkAuthorization: () => {
    console.log('checkAuthorization in auth/actions.js')
    return {
      type: actions.CHECK_AUTHORIZATION
    }
  },

  // login: (token = false, user) => ({
  //   type: actions.LOGIN_REQUEST,
  //   payload: { token, user },
  // }),

  // loginAsync: (token = false, user) => {
  //   console.log("loginAsync in actions");
  //   return {
  //     type: actions.LOGIN_REQUEST,
  //     payload: { token, user },
  //   };
  // },

  login: (token = false, user) => {
    //console.log("login in actions");
    alert("login in actions");
    return (dispatch) => {
      setTimeout(() => {
        // this is redux thunk
        dispatch(loginAsync(token, user));
      }, 5000);
    };
  },

  logout: () => ({
    type: actions.LOGOUT,
  }),
};

export default actions;
