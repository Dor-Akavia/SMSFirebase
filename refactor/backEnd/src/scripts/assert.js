

function assertManualController(runType) {
    console.log('Enter');
    
    var trueCounter = 0

    if (runType === 'normal') {
        choosenFlows = [
            {name:Activation.id, selected:Activation.checked, value:Activation.value},
            {name:FW_Upgrade.id, selected:FW_Upgrade.checked, value:FW_Upgrade.value}
        ];
        console.log(choosenFlows);
        
       

        for (let index = 0; index < avilableControllers.length; index++) {
        var name = avilableControllers[index].name
        var element = document.getElementById(name);
        var test = element.checked
        choosenControllers[index] = {value:test,id:avilableControllers[index].id, name:avilableControllers[index].name}  

        if (test === true) {
            trueCounter ++ 
        }
        };   
        validation(trueCounter);               
    };

    if (runType === 'counterError') {
        for (let index = 0; index < avilableControllers.length; index++) {
            var name = avilableControllers[index].name
            var element = document.getElementById(name);
            var test = element.checked
            element.checked = false;
        }

        for (let index = 0; index < choosenFlows.length; index++) {
            var flowName = choosenFlows[index].name;
            var flowElement = document.getElementById(flowName);
            flowElement.checked = false;
        }
    };

    
};  

function validation(trueCounter) {

    for (let index = 0; index < avilableControllers.length; index++) {
        if (choosenControllers[index].value === true && trueCounter <= 3) {
                controllers[innerCounter] = choosenControllers[index].id;
                innerCounter ++                        
        }        

        if (trueCounter > 3) {
            alert("Please choose only 3 controllers.")
            runType = 'counterError'
            assertManualController(runType);
            runType = 'normal'
            trueCounter = 0;
            return;
        }

    }

    innerCounter = 0

    for (let index = 0; index < choosenFlows.length; index++) {  
        if (choosenFlows[index].selected === false) {
            trueFlowCounter ++                           
        }  

        if (choosenFlows[index].selected === true) {                        
            fileState[innerCounter] = choosenFlows[index].value;  
            trueFlowCounter = 0
            innerCounter ++                           
        }  
    }

    innerCounter = 0
    
    if (trueFlowCounter < 2) {
        console.log('ok');
    }   

    if (trueFlowCounter === 2) {
        alert("Please choose at least 1 flow.")
        runType = 'counterError'
        trueFlowCounter = 1;
        assertManualController(runType);
        runType = 'normal'
        return; 
    };  
   
    buildQueryString(controllers,fileState);              
};

export { assertManualController, validation};