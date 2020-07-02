var http = require('http')
var protobuf = require('protobufjs')
var url = require('url')
var DBScript = require('./DB')
var dataScript = require('./data')
const { read } = require('fs')
const { log } = require('console')
const { connected } = require('process')
var proto = DBScript.proto;


var urlObj = [] // refactor this into an object
urlObj[0] = '/mobile/commissioning/v1/status' 
urlObj[1]= '/mobile/commissioning/v1/identity' 
urlObj[2] = '/mobile/commissioning/v1/prepare' 
urlObj[3] = '/mobile/commissioning/v1/execute' 
urlObj[4] = '/mobile/commissioning/v1/manual' 
urlObj[5] = false // upload
urlObj[6] = false // 404
urlObj[7] = '/favicon.ico' // favicon
urlObj[8] = '/mobile/commissioning/v1/keep_alive'
urlObj[9] = '/mobile/commissioning/v1/device_identity_status'

var pathData;
var value = null;
var manualInput = false;
var actionType = dataScript.actionType
var status = dataScript.status;
var identity = dataScript.identity;
var progressCounter = 0
var isExecuting = false;
var software = dataScript.software;
var fileState = dataScript.fileState;
var controller_type = dataScript.controller_type;
var ControllerConnected = dataScript.ControllerConnected;
var keepAliveResponse = dataScript.keepAliveResponse;
var identityStatusResponse = dataScript.identityStatusResponse;


// *************************

  //file state is ready to be set
  // find a way to change the relevant controllers and set them
  // enter execute as before

// *****************************************************************

function launchServer (data) {
  http.createServer(function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Request-Method', '*')
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
      res.setHeader('Access-Control-Allow-Headers', '*')

      DBScript.writeDB(actionType,status,identity)

      var myURL = url.parse(req.url)
      uploadURL = myURL.pathname.includes('file')
      pathData = myURL.pathname

      var uploadTest = myURL.pathname.includes('file')

     


      console.log(myURL.pathname);
      
      
      if (pathData !== urlObj[0] && pathData !== urlObj[1] && // create an array of strings
          pathData !== urlObj[2] && pathData !== urlObj[3] &&
          pathData !== urlObj[4] && pathData !== urlObj[7] && uploadTest === false
          && pathData !== urlObj[8] && pathData !== urlObj[9]){ // 404
          res.writeHead(404, { 'Content-Type': 'application/json' })
          // console.log('404');
          res.end();   
          return
      }; 
      

      if (pathData === urlObj[0]) { // status
        // console.log('Status URL'); 

        if (isExecuting === false) {
          actionType = 'readStatus'
          DBScript.readDB(actionType)
          var callBackpromise = new Promise(function(resolve, reject) { 
              setTimeout(() => {
              var value = statusCallBack
              console.log('*********************');
              resolve(value);            
              }, 2000);
  
              if (value === undefined) {
                  reject("callback is not defined");
              }
           });
          callBackpromise.then(function (snapshot){
            res.writeHead(200, { 'Content-Type': 'application/json' }) 
            res.write(snapshot);  
            
            res.end()
          })
        }

        if (isExecuting === true) {
          progress();
          actionType = 'readStatus'
          DBScript.readDB(actionType)
          var callBackpromise = new Promise(function(resolve, reject) { 
            setTimeout(() => {
            var value = statusCallBack
            console.log('*********************');
            resolve(value);            
            }, 2000);

            if (value === undefined) {
                reject("callback is not defined");
            }
          });
        callBackpromise.then(function (snapshot){
          res.writeHead(200, { 'Content-Type': 'application/json' }) 
          res.write(snapshot);  
          
          res.end()
        })
        }



      };
  
      if (pathData === urlObj[1]) { // identity
      // console.log('Identity URL');
      actionType = 'readIdentity'
      DBScript.readDB(actionType)

      var callBackpromise = new Promise(function(resolve, reject) { 
          setTimeout(() => {
          var value = identityCallBack
          console.log('*********************');
          resolve(value);            
          }, 2000);

          if (value === undefined) {
              reject("callback is not defined");
          }
          
      });

      callBackpromise.then(function (snapshot){
        res.writeHead(200, { 'Content-Type': 'application/json' }) 
        res.write(snapshot);  
        
        res.end()
      })           
      };
  
      if (pathData === urlObj[2]) { // prepare
      // console.log('prepare URL');  
      res.writeHead(200, { 'Content-Type': 'application/json' }) 
      res.end()

      };
      

      if (pathData === urlObj[3]) { // execute
      console.log('------- Execute URL has been initiated -----------');
      isExecuting = true;
      res.end()
     };
  
      if (pathData === urlObj[4]) {// manual
        const queryString = require('query-string');
        var search = queryString.extract(req.url)        
        var extractedQueryString = queryString.parse(search);

        prepareExecute(extractedQueryString);
        
        function prepareExecute(extractedQueryString) {
            console.log('Enter prepare execute function');
            
          queryCounter = [
            {Id:0, name: "fileState0", value: extractedQueryString.fileState0},
            {Id:1, name: "fileState1", value: extractedQueryString.fileState1},
            {Id:2, name: "controller0", value: extractedQueryString.controller0},
            {Id:3, name: "controller1", value: extractedQueryString.controller1},
            {Id:4, name: "controller2", value: extractedQueryString.controller2}
          ]

          for (let index = 0; index < queryCounter.length; index++) {
            if (queryCounter[index].value === undefined) {
                delete queryCounter[index]
            }
          }

          var filtered = queryCounter.filter(function (el) {
            return el != null;
          });



          var both = false;
          controller_type.splice(0,3)

          for (let index = 0; index < filtered.length; index++) {
            
                if (filtered[index].Id === 0) {
                    fileState[0].fileType = filtered[index].value
                    both = true;
                    // dataScript.identity.isActivated = true;
                    // actionType = 'writeIdentity'
                    // DBScript.writeDB(actionType,status,identity)
                    
                }

                if (filtered[index].Id === 1) {

                  if (both === false) {
                    fileState[0].fileType = filtered[index].value
                    
                  }

                  if (both === true) {
                       
                      var tempFileState = {
                        fileType:filtered[index].value ,
                        retry: 0,
                        fileStatus: 2,
                        executionProgress: 0,
                        errorType: 0,
                        controllerType: 0
                      }
                      
                    fileState[1] = tempFileState
                    fileState[0].fileStatus = 1

                  }   
                } 


                if (filtered[index].Id === 2) {
                  controller_type.splice(0,0,filtered[index].value) 
                  
                }
                if (filtered[index].Id === 3) {
                  controller_type.splice(1,0,filtered[index].value) 

                }
                if (filtered[index].Id === 4) {
                  controller_type.splice(2,0,filtered[index].value) 

                }

              
          }
          fileState[0].controllerType = controller_type[0]
          status.fileState = fileState
          dataScript.buildControllers(software,controller_type,ControllerConnected);
          actionType = 'launch'
          DBScript.writeDB(actionType,status,identity)    
          
        }
      manualInput = true;
      console.log('------- Manual input has been set -----------');   
      res.end()
     };
  
     if (uploadTest === true) {// upload
      console.log('----------- upload Successfull -----------');
      res.writeHead(200, { 'Content-Type': 'application/json' }) 
      res.end()
     };

     if (pathData === urlObj[8]) {
        console.log('Keep-Alive');
        actionType = 'keep-alive'
        DBScript.readDB(actionType)

        var callBackpromise = new Promise(function(resolve, reject) { 
          setTimeout(() => {
          var value = dataScript.keepAliveResponse
          console.log('*********************');
          console.log(value);
          
          resolve(value);            
          }, 2000);

          if (value === undefined) {
              reject("callback is not defined");
          }
       });
      callBackpromise.then(function (snapshot){
        res.writeHead(200, { 'Content-Type': 'application/json' }) 
        res.write(snapshot);  
        
        res.end()
      })      
     }

     if (pathData === urlObj[9] && isExecuting === true) {
      res.writeHead(404, { 'Content-Type': 'application/json' }) 
      res.end()
     }

     if (pathData === urlObj[9] && isExecuting === false) {
        console.log('identity-Status');
        actionType = 'identity-Status'
        DBScript.readDB(actionType)

        var callBackpromise = new Promise(function(resolve, reject) { 
          setTimeout(() => {
          var value = dataScript.identityStatusResponse
          console.log('*********************');
          console.log(value);
          
          resolve(value);            
          }, 2000);

          if (value === undefined) {
              reject("callback is not defined");
          }
       });
      callBackpromise.then(function (snapshot){
        res.writeHead(200, { 'Content-Type': 'application/json' }) 
        res.write(snapshot);  
        
        res.end()
      })      
     }


    })
    .listen(8080)
}

launchServer();

var statusCallBack = Buffer;
var identityCallBack = Buffer;
function responseAssert(actionType,buffer) {
    if (buffer === undefined) {
      console.log('buffer is not denifned on response'); 
    }

    if (buffer !== undefined) {
      if (actionType === 'statusResponse') {
        statusCallBack = buffer;
      }

      if (actionType === 'identityResponse') {
        identityCallBack = buffer;        
      }
    }
    console.log('end response');
}

exports.responseAssert = responseAssert;

// 16-06-20 Starting execute function***********
// *********************************************
var fullFlow = false;
function progress(params) {

  var fileStateProgressCounter = Object.keys(fileState).length;
  
  if (fileStateProgressCounter === 1 && fullFlow === false) {
  
    if (progressCounter > 0 && progressCounter <= 5) {
      status.totalTime = status.totalTime - 20;
      status.totalProgress = status.totalProgress + 20;
      progressCounter ++
    };
    
    if (progressCounter === 0) {
        fileState[0].controllerType = controller_type[0]
        status.fileState = fileState;
        status.totalTime = 100;
        status.totalProgress = 0;
        status.upgradeStatus = 1;
        progressCounter ++
    };

    if (progressCounter === 6) {
        status.fileState = {}
        status.totalTime = 0;
        status.totalProgress = 100;
        status.upgradeStatus = 0;
        isExecuting = false;
        identity.isActivated = true;
        progressCounter = 0;
        software = { major: 4, minor: 12, build: 1412};
        ControllerConnected = true;
        dataScript.buildControllers(software, controller_type, ControllerConnected);
    };
  };

  if (fullFlow === true) {    
    status.totalTime = status.totalTime - 20;
    status.totalProgress = status.totalProgress + 20;
    fileState[0].executionProgress += 20
    fileState[0].fileStatus = 2;
    progressCounter ++

    if (progressCounter === 6) {
      status.fileState = {}
      status.totalTime = 0;
      status.totalProgress = 100;
      status.upgradeStatus = 0;
      isExecuting = false;
      fullFlow = false;
      progressCounter = 0;
      software = { major: 4, minor: 12, build: 1412};
      ControllerConnected = true;
      dataScript.buildControllers(software, controller_type, ControllerConnected);
      identity.isActivated = true;

  };
    
  };

  if (fileStateProgressCounter === 2) {
    // fileState[0]  activation
    // fileState[1]  FWupgrade
  
    if (progressCounter === 3) {
      status.totalTime = status.totalTime - 20;
      status.totalProgress = status.totalProgress + 20;
      delete fileState[1]
      fullFlow = true;
      progressCounter ++
    };

    if (progressCounter > 0 && progressCounter <= 2) {
      status.totalTime = status.totalTime - 20;
      status.totalProgress = status.totalProgress + 20;
      fileState[1].executionProgress += 20
      progressCounter ++
    };
    
    if (progressCounter === 0) {
        fileState[1].executionProgress = 20
        status.fileState = fileState;
        status.totalTime = 100;
        status.totalProgress = 0;
        status.upgradeStatus = 1;
        progressCounter ++
    };


  };
  
  actionType = 'launch'
  DBScript.writeDB(actionType,status,identity)      
};

exports.progress = progress;

// *********************************************
// *********************************************