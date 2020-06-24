var DBScript = require('./DB')


var status = []
status.fileState = {};
status.serialNumber= '500FF004';
status.upgradeStatus=0;
status.totalTime=0;
status.totalProgress=0;

var identity = []
identity.controllers ={};
identity.batteries= {};
identity.isActivated= false;
identity.isReady=false;
identity.myseBaseUrl = '/';
identity.myseStatusSubUrl = '/#/commissioning/status';
identity.viewOnlyUrl =  '/mode/view_only';



var software =  { major: 4, minor: 7, build: 1408 };
var controller_type = [0,1,2]
var controllers = [];


buildControllers(software,controller_type);
function buildControllers(software, controller_type) {
    for (let index = 0; index < controller_type.length; index++) {
    
        controllers[index] = {
            controllerType:controller_type[index],
            swType:3584,
            version:software,
            serialNumber: status.serialNumber + '53',
            connected: false
        };
    };

    identity.controllers = controllers
}




var actionType = 'launch';
var manualInput = false;


var fileState = {0:{
    fileType: 3,
    retry: 0,
    fileStatus: 2,
    executionProgress: 0,
    errorType: 0,
    controllerType: 0
    }
};





console.log('Data file loaded successfully');


exports.status = status;
exports.identity = identity;
exports.actionType = actionType;
exports.manualInput = manualInput;
exports.buildControllers = buildControllers;
exports.fileState = fileState;
exports.controller_type = controller_type;
exports.software = software;






