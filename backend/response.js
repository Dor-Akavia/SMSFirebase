var protoScript = require('./proto')


function response(actionType,buffer) {
    console.log('Generating response');
    
    if (actionType === 'writeStatus' || actionType === 'readStatus') {
        console.log('status buffer creation');
        console.log(buffer);
        actionType = 'response'
        protoScript.proto(buffer,actionType)

        return buffer
    }

    if (actionType === 'writeIdentity' || actionType === 'readIdentity') {
        console.log('identity buffer creation');
        console.log(buffer);
        actionType = 'response'
        protoScript.proto(buffer,actionType)




        return buffer         
    }    
}

exports.response = response;
