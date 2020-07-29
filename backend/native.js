
var window = global;
const ANDROID = "Android";
const IOS = "webkit";





    function hasApi(api_function, log_error = true){
        if (window.Android !== undefined && window.Android[api_function] !== undefined){
            return ANDROID;
        }
        else if (window.webkit !== undefined && window.webkit.messageHandlers[api_function] !== undefined){
            return IOS;
        }

        let log_msg = `Error in MobileApi: Missing Api->${api_function}`
        if (log_error) this.webLog(log_msg, false);
        return false;
    }

    function runApi(api_function, api_args){
        let mobile_platform = this.hasApi(api_function);

        // log print
        let api_print = `Platform->${mobile_platform ? mobile_platform : "NONE"}, Api->${api_function}`
        let args_print = `${api_args !== undefined ? ", Args->" + JSON.stringify(api_args) : ""}`
        let log_msg = `MobileApi: ${api_print}${args_print}`
        // console.log(log_msg);
        // if (mobile_platform !== false) this.webLog(log_msg);
        this.webLog(log_msg);

        // Calling Api
        switch (mobile_platform){
            case ANDROID:
                if (api_args !== undefined){
                    window.Android[api_function](api_args);
                }
                else{
                    window.Android[api_function]();
                }
                return true;
            case IOS:
                if (api_args !== undefined){
                    window.webkit.messageHandlers[api_function].postMessage(api_args);
                }
                else{
                    window.webkit.messageHandlers[api_function].postMessage("");
                }
                return true;
            default:
                return false;
        }
    }

    /* General APIs */
    function has_webLog(){
        return this.hasApi("SETAPP_webLog", false);
    }

    function webLog(log_msg, console_log = true){
        let mobile_platform = this.has_webLog();
        if (console_log) console.log(log_msg);

        // Calling Api
        switch (mobile_platform){
            case ANDROID:
                window.Android.SETAPP_webLog(log_msg);          
                return true;
            case IOS:
                window.webkit.messageHandlers.SETAPP_webLog.postMessage(log_msg);
                return true;
            default:
                return false;
        }
    }

    function has_webIsReady(){
        return this.hasApi("SETAPP_webIsReady");
    }

    function webIsReady(){
        return this.runApi("SETAPP_webIsReady");
    }

    function has_showWeb(){
        return this.hasApi("SETAPP_showWeb");
    }

    function showWeb(){
        return this.runApi("SETAPP_showWeb");
    }

    function has_deviceInit(){
        return this.hasApi("SETAPP_deviceInit");
    }

    function deviceInit(json_args){
        return this.runApi("SETAPP_deviceInit", json_args);
    }

    /* My Solaredge APIs */
    function has_finishedCommWizard(){
        return this.hasApi("SETAPP_finishedCommWizard");
    }

    function finishedCommWizard(){
        return this.runApi("SETAPP_finishedCommWizard");
    }

    function has_backToDashboard(){
        return this.hasApi("SETAPP_backToDashboard");
    }

    function backToDashboard(){
        return this.runApi("SETAPP_backToDashboard");
    }

    /* Wireless gateway APIs */
    function has_scanHg(){
        return this.hasApi("SETAPP_scanHg");
    }

    function scanHg(json_args){
        return this.runApi("SETAPP_scanHg", json_args);
    }

    function has_scanHgRepeaters(){
        return this.hasApi("SETAPP_scanHgRepeaters");
    }

    function scanHgRepeaters(json_args){
        return this.runApi("SETAPP_scanHgRepeaters", json_args);
    }

    function has_webHgIsReady(){
        return this.hasApi("SETAPP_webHgIsReady");
    }

    function webHgIsReady(){
        return this.runApi("SETAPP_webHgIsReady");
    }

    /* Side Menu Items */ 
    function has_openSupport(){
        return this.hasApi("SETAPP_openSupport");
    }

    function openSupport(){
        return this.runApi("SETAPP_openSupport");
    }
    
    function has_sendLogs(){
        return this.hasApi("SETAPP_sendLogs");
    }

    function sendLogs(){
        return this.runApi("SETAPP_sendLogs");
    }


    function has_goToOnlineSupport(){
        return this.hasApi("SETAPP_goToOnlineSupport");
    }

    function goToOnlineSupport(){
        return this.runApi("SETAPP_goToOnlineSupport");
    }

    function has_startCentralCommScanning(){
        return this.hasApi("SETAPP_startCentralCommScanning");
    }

    function startCentralCommScanning(protoMsg){
        let ser_msg = Object.values(protoMsg.serializeBinary())
        this.webLog(`msg: ${ser_msg}`)
        return this.runApi("SETAPP_startCentralCommScanning", ser_msg);
    }


exports.isIos = isIos;
exports.isAndroid = isAndroid;