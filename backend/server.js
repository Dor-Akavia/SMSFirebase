var http = require('http')
var protobuf = require('protobufjs')
var url = require('url')
var DBScript = require('./DB')

var urlObj = []
urlObj[0] = '/mobile/commissioning/v1/status' 
urlObj[1]= '/mobile/commissioning/v1/identity' 
urlObj[2] = '/mobile/commissioning/v1/prepare' 
urlObj[3] = '/mobile/commissioning/v1/execute' 
urlObj[4] = '/mobile/commissioning/v1/manual' 
urlObj[5] = false // upload
urlObj[6] = false // 404
urlObj[7] = '/favicon.ico' // favicon

var pathData = String;
var value = null;
var manualInput = false;

var dataScript = require('./data')
var actionType = dataScript.actionType
var status = dataScript.status;
var identity = dataScript.identity;





// *************************

// status & Identity are working! - implement execute and manual input file state :)

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
      
      if (pathData !== urlObj[0] && pathData !== urlObj[1] &&
          pathData !== urlObj[2] && pathData !== urlObj[3] &&
          pathData !== urlObj[4] && pathData !== urlObj[7]){ // 404
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.write('404 Not Found\n')
          console.log('404');   
          return
      }; 
      

      if (pathData === urlObj[0]) { // status
        console.log('Status URL'); 
        actionType = 'readStatus'
        DBScript.readDB(actionType)

        var callBackpromise = new Promise(function(resolve, reject) { 
            setTimeout(() => {
            var value = statusCallBack
            console.log('*********************');
            resolve(value);            
            }, 6000);

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
  
      if (pathData === urlObj[1]) { // identity
      console.log('Identity URL');
      actionType = 'readIdentity'
      DBScript.readDB(actionType)

      var callBackpromise = new Promise(function(resolve, reject) { 
          setTimeout(() => {
          var value = identityCallBack
          console.log('*********************');
          resolve(value);            
          }, 6000);

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
      console.log('prepare URL');   
      res.end()

      };
  
      if (pathData === urlObj[3]) { // execute
      // getStatus('execute')
      console.log('execute URL'); 
      res.end()

     };
  
      if (pathData === urlObj[4]) {// manual
      manualInput = true;
      console.log('manual URL');   
      res.end()
     };
  
     if (urlObj[5] === true) {// upload
      console.log('upload URL');
      res.end()
     };


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