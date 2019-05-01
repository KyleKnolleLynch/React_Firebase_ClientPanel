import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase/app';
import  'firebase/auth';
import  'firebase/database';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//  REDUCERS
// @todo

const firebaseConfig = {
  apiKey: 'AIzaSyDmnQX4ORRh0tI4eCmi3BmFFu5f_zR62dw',
  authDomain: 'reactclientpanel-ac2a6.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-ac2a6.firebaseio.com',
  projectId: 'reactclientpanel-ac2a6',
  storageBucket: 'reactclientpanel-ac2a6.appspot.com',
  messagingSenderId: '393682573645'
};

//  react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
//  Init firestore
//  const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

//  Create initial state
const initialState = {};

//  Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


export default store;
