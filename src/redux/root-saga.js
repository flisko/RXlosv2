import { all } from "redux-saga/effects";
import authSagas from "../redux/auth/saga";

// import authSagas from '../redux/auth/saga';
// import contactSagas from '../redux/contacts/saga';
// import invoicesSagas from '../redux/invoice/saga';
// import mailSagas from '../redux/mail/saga';
// import notesSagas from '../redux/notes/saga';
// import todosSagas from '../redux/todos/saga';
// import ecommerceSaga from '../redux/ecommerce/saga';
// import cardsSagas from '../redux/card/saga';
// import chatSagas from '../redux/chat/sagas';
// import youtubeSearchSagas from '../redux/youtubeSearch/sagas';
// import githubSagas from '../redux/githubSearch/sagas';
// import articles from '../redux/articles/sagas';
// import investors from '../redux/investors/sagas';
// import scrumBoardSaga from '../redux/scrumBoard/saga';
// import profileSaga from '../redux/profile/saga';
// import quizSaga from '../redux/quiz/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    //   contactSagas(),
    //   mailSagas(),
    //   notesSagas(),
    //   ecommerceSaga(),
    //   cardsSagas(),
    //   invoicesSagas(),
    //   chatSagas(),
    //   youtubeSearchSagas(),
    //   githubSagas(),
    //   articles(),
    //   investors(),
    //   scrumBoardSaga(),
    //   profileSaga(),
    //   quizSaga(),
  ]);
}
