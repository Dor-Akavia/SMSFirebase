var dataScript = require('./data')
var server = require('./server')

var status = dataScript.status;
var identity = dataScript.identity;
var actionType = dataScript.actionType;

// DB CONFIG ************************************************
var firebase = require('firebase')  
var firebaseConfig = {
    apiKey: 'AIzaSyDG6kBb46zyCxINzQVJHna_gsXsX3wxF_U',
    authDomain: 'setapp-mock-server.firebaseapp.com',
    databaseURL: 'https://setapp-mock-server.firebaseio.com',
    projectId: 'setapp-mock-server',
    storageBucket: 'setapp-mock-server.appspot.com',
    messagingSenderId: '172226042491',
    appId: '1:172226042491:web:057a64892a85397f1ca0de'
    }      
firebase.initializeApp(firebaseConfig)    
var database = firebase.database()
var statusPath = firebase.database().ref('statusTable')
var identityPath = firebase.database().ref('identityTable')
    
// *********************************************************     
function writeDB (actionType,status,identity ) { 

    if (actionType === 'launch') {
    console.log('Enter write launch');
    var statusSetPromise = firebase.database().ref(statusPath).set({status});
    var identitySetPromise = firebase.database().ref(identityPath).set({identity});
    console.log('Finished DB launch');
  }

  if (actionType === 'writeStatus') {    
    console.log('Enter write status');
    var statusSetPromise = firebase.database().ref(statusPath).set({status});
  };
  
  if (actionType === 'writeIdentity') {
    console.log('Enter write identity');
    var identitySetPromise = firebase.database().ref(identityPath).set({identity});
  };
};

// *********************************************************  
var statusDBCallBack = [];
var identityDBCallBack = [];

function readDB (actionType,statusBuffer,identityBuffer) {

  if (actionType === 'readStatus') {    
      var statusPromise = firebase.database().ref(statusPath).once('value')
      statusPromise.then(function (snapshot) {
      statusDBCallBack = snapshot.val().status || 'Null'
      status = statusDBCallBack
      
        proto(statusDBCallBack,actionType);
      
      });
  };

  if (actionType === 'readIdentity') {
      var identityPromise = firebase.database().ref(identityPath).once('value')
      identityPromise.then(function (snapshot) {
      identityDBCallBack = snapshot.val().identity || 'Null'
      identity = identityDBCallBack
      // console.log(identityDBCallBack)
      
      proto(identityDBCallBack,actionType);
      
      });
  };

  
  if (actionType === 'statusResponse') {
    setTimeout(() => {
      server.responseAssert(actionType,statusBuffer);
    }, 2000);
  }

  if (actionType === 'identityResponse') {
    setTimeout(() => {
      server.responseAssert(actionType,identityBuffer);
    }, 2000);
  }
};

 // *********************************************************       

 exports.readDB = readDB
 exports.writeDB = writeDB

 //Proto///////////////////////////////////////////////////



 function proto(callback, actionType) {
  var protobuf = require('protobufjs')
  var dataScript = require('./data')
  var DBScript = require('./DB')
  var statusBuffer = []
  var identityBuffer = []

  var myDoc = protobuf.load('commissioning.proto', function (err, root) {
      if (err) throw err

      if (actionType === 'writeStatus' || actionType === 'readStatus') {
          console.log('st');
          protoStatus(callback);            
      }
  
      if (actionType === 'writeIdentity' || actionType === 'readIdentity') {
          console.log('ID');
          protoIdentity(callback);           
      }
  
      if (actionType === 'launch') {
          console.log('shit');
      }

      function protoStatus(callback) {
          statusRoot = root.lookupType('commissioning.Status')
          var statusMessage = statusRoot 
          statusMessage = []
          statusMessage = callback
          var readyStatusMessage = statusRoot.create(statusMessage)
          statusBuffer = statusRoot.encode(readyStatusMessage).finish()
          
          console.log('Debug: ');
          var statusObject = statusRoot.toObject(readyStatusMessage, {
              enums: String,
              longs: String,
              bytes: String,
              defaults: true,
              arrays: true,
              objects: true,
              oneofs: true
          })
          console.log(statusObject)
      }

      function protoIdentity(callback) {
          identityRoot = root.lookupType('commissioning.DeviceIdentity')
          var identityMessage = identityRoot
          identityMessage = []
          identityMessage = callback
          
          var readyIdentityMessage = identityRoot.create(identityMessage)

          identityBuffer = identityRoot.encode(readyIdentityMessage).finish() 

          console.log('Debug: ');
          
          var identityObject = identityRoot.toObject(readyIdentityMessage, {
              enums: String,
              longs: String,
              bytes: String,
              defaults: true,
              arrays: true,
              objects: true,
              oneofs: true
          })
          console.log(identityObject)            
      } 
      
      if (actionType === 'writeStatus' || actionType === 'readStatus') {
          console.log('Returining status buffer');
          actionType = 'statusResponse'
          DBScript.readDB(actionType,statusBuffer,identityBuffer);  
      }
  
      if (actionType === 'writeIdentity' || actionType === 'readIdentity') {
          console.log('Returining identity buffer');
          actionType = 'identityResponse'
          DBScript.readDB(actionType,statusBuffer,identityBuffer);
      }
      
      })
}

exports.proto = proto
exports.writeDB = writeDB







