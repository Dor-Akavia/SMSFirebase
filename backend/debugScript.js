var window = global

function hasApi(api_function, log_error = true){
    if (window.Android !== undefined && window.Android[api_function] !== undefined){
        return ANDROID;
    }
    else if (window.webkit !== undefined && window.webkit.messageHandlers[api_function] !== undefined){
        return IOS;
    }

    let log_msg = `Error in MobileApi: Missing Api->${api_function}`
    return false;
}


function runApi(api_function, api_args){
        let mobile_platform = 'ANDROID'

        // log print
        let api_print = `Platform->${mobile_platform ? mobile_platform : "NONE"}, Api->${api_function}`
        let args_print = `${api_args !== undefined ? ", Args->" + JSON.stringify(api_args) : ""}`
        let log_msg = `MobileApi: ${api_print}${args_print}`
        // console.log(log_msg);
        // if (mobile_platform !== false) this.webLog(log_msg);
        
        console.log(api_function);
        console.log(api_print);
      
        console.log('**********************');
        // console.log(window.Android[api_function](api_args));
        
        
        
        

        // Calling Api
        // switch (mobile_platform){
        //     case 'ANDROID':
        //         if (api_args !== undefined){
        //             window.Android[api_function](api_args);
        //         }
        //         else{
        //             window.Android[api_function]();
        //         }
        //         return true;
        //     case IOS:
        //         if (api_args !== undefined){
                    // window.webkit.messageHandlers[SETAPP_showWeb].postMessage(api_args);
        //         }
        //         else{
        //             window.webkit.messageHandlers[api_function].postMessage("");
        //         }
        //         return true;
        //     default:
        //         return false;
        // }
    }

    function has_showWeb(){
        hasApi("SETAPP_showWeb");
        showWeb();
    }

    function showWeb(params) {
        return runApi("SETAPP_showWeb");
    }

    has_showWeb();
    