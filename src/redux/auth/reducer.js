import actions from "./actions";

const initState = { 
  idToken: null,
  address: null 
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token,
        address: action.address
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
