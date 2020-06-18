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

var manulFilestate = {};
manulFilestate.fileType = 3;
manulFilestate.retry = 0;
manulFilestate.fileStatus = 1;
manulFilestate.errorType = 0;
manulFilestate.controllerType = 0;
manulFilestate.batteries = null;

var software =  { major: 4, minor: 7, build: 1408 };
var controllers = [];


buildControllers(software);
function buildControllers(software) {
    for (let index = 0; index < 3; index++) {
    
        controllers[index] = {
            controllerType:index,
            swType:3584,
            version:software,
            serialNumber: status.serialNumber + '53',
            connected: false
        };
    };
}



identity.controllers = controllers

var actionType = 'launch';
var manualInput = false;


var fileStateDebug = {
    fileType: 3,
    retry: 0,
    fileStatus: 2,
    executionProgress: 0,
    errorType: 0,
    controllerType: 0
  }




console.log('Data file loaded successfully');


exports.status = status;
exports.identity = identity;
exports.actionType = actionType;
exports.manualInput = manualInput;
exports.buildControllers = buildControllers;
exports.fileStateDebug = fileStateDebug;






