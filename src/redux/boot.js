import { reduxStore } from './store';
import authActions from './auth/actions';

export default () =>
  new Promise(() => {
    reduxStore.dispatch(authActions.checkAuthorization());
  });
