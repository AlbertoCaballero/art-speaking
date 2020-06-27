// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fireconf: {
    apiKey: "AIzaSyDwVNABo9Kem6qSSolucVfNwsD_dFASvFU",
    authDomain: "artspeaking-8dc29.firebaseapp.com",
    databaseURL: "https://artspeaking-8dc29.firebaseio.com",
    projectId: "artspeaking-8dc29",
    storageBucket: "artspeaking-8dc29.appspot.com",
    messagingSenderId: "429565406876",
    appId: "1:429565406876:web:56a06fc8f856b89de14759"
  },
  collections: {
    users: "users",
    museums: "museums",
    questions: "questions",
    pieces: "pieces"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
