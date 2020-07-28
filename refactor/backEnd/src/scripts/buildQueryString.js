function buildQueryString(controllers,fileState) {
    var controllersQueryString = []
    var controllersObject = [];
    var fileStateQueryString = []
    var fileStateObject = [];

    for (let index = 0; index < fileState.length; index++) {
          var fileStateString = 'fileState' + index;
          var fileStateValue = fileState[index]
          fileStateObject[index] = {url:('&' + fileStateString + '=' + fileStateValue)}
          fileStateObject[index] = fileStateObject[index].url 
    }

    for (let index = 0; index < fileState.length; index++) {
            
        if (fileState.length === 1) {
            fileStateQueryString = fileStateObject[index]
        }

        if (fileState.length > 1) {
            fileStateQueryString = fileStateQueryString + fileStateObject[index]
        }

    }

    for (let index = 0; index < controllers.length; index++) {
        var controllerName = "controller" + index
        var paramName = '&' + controllerName + '=';
        var paramValue = controllers[index]
        controllersObject[index] = {paramName:paramName,paramValue:paramValue};
    }

    for (let index = 0; index < controllers.length; index++) {
        var controllersConnectedString = (controllersObject[index].paramName + controllersObject[index].paramValue )
        controllersQueryString[index] = controllersConnectedString 
    }

    for (let index = 0; index < controllersQueryString.length; index++) {

        if (index === 0) {
            var controllersURLQuery = controllersQueryString[index]  
        };

        if (index > 0) {
            controllersURLQuery = controllersURLQuery + controllersQueryString[index]  
        };
    }

    manualSend(controllersURLQuery,fileStateQueryString);
}

exports.buildQueryString = buildQueryString;