import * as firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
});

export const db = firebase.database();
