


function protoOLD(callback, actionType) {
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
            actionType = 'response'

            DBScript.readDB(actionType,statusBuffer);  
        }
    
        if (actionType === 'writeIdentity' || actionType === 'readIdentity') {
            console.log('Returining identity buffer');
            actionType = 'response'
            console.log(identityBuffer);
            

            DBScript.readDB(actionType,identityBuffer); 
        }
        
        })
}

// exports.proto = proto







