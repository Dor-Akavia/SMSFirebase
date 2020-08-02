import {GeneralTypesProto} from './ProtoManager';

const QR_TO_GTYPES_PRODUCT = Object.freeze(
    {
        "0": GeneralTypesProto.ProductType.WIFI_GATEWAY,
        "1": GeneralTypesProto.ProductType.WIFI_REPEATER,
        // "2": eneralTypesProto.ProductType.,
        // "3": eneralTypesProto.ProductType.,
        "4": GeneralTypesProto.ProductType.EVSE_SA
    }
);

const SOLAREDGE_APPS = Object.freeze(
    {
        SETAPP: "setapp",
        MYSE: "mysolaredge"
    }
);

const MOBILE_TO_WEB_LANGUAGE_CODES =
{
    /* Supported languages */
    'en_US': 'en-US',           // English, United States
    'de_DE': 'de-DE',           // German
    'es_ES': 'es-MX',           // Spanish, Mexico
    'fr_FR': 'fr-FR',           // French
    'it_IT': 'it-IT',           // Italian
    'nl_NL': 'nl-NL',           // Dutch
    'ja_JP': 'ja-JP',           // Japanese
    'ko_KR': 'ko-KR',           // Korean
    'zh_CN': 'zh-TW',           // Chinese, Traditional
    'pt_BR': 'pt-BR',           // Portuguese, Brazilian
    'pl_PL': 'pl-PL',           // Polish
    'hu_HU': 'hu-HU',           // Hungarian
    'sv_SE': 'sv-SE',           // Swedish

    /* Unsupported languages - defaults back to 'en-US' */
    'en_GB': 'en-US',           // English (GB)
    'en_AU': 'en-US',           // English (AU)
    'da_DK': 'en-US',           // Danish (Denmark)
    'cs_CZ': 'en-US',           // ÄeÅ¡tina (Czech Republic)
    'tr_TR': 'en-US',           // TÃ¼rkÃ§e (TÃ¼rk)
}

const ANDROID = "Android";
const IOS = "webkit";

class MobileApi{
    static isIos(){
        return window.webkit !== undefined;
    }

    static isAndroid(){
        return window.Android !== undefined;
    }

    static hasApi(api_function, log_error = true){
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

    static runApi(api_function, api_args){
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
    static has_webLog(){
        return this.hasApi("SETAPP_webLog", false);
    }

    static webLog(log_msg, console_log = true){
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

    static has_webIsReady(){
        return this.hasApi("SETAPP_webIsReady");
    }

    static webIsReady(){
        return this.runApi("SETAPP_webIsReady");
    }

    static has_showWeb(){
        return this.hasApi("SETAPP_showWeb");
    }

    static showWeb(){
        return this.runApi("SETAPP_showWeb");
    }

    static has_deviceInit(){
        return this.hasApi("SETAPP_deviceInit");
    }

    static deviceInit(json_args){
        return this.runApi("SETAPP_deviceInit", json_args);
    }

    /* My Solaredge APIs */
    static has_finishedCommWizard(){
        return this.hasApi("SETAPP_finishedCommWizard");
    }

    static finishedCommWizard(){
        return this.runApi("SETAPP_finishedCommWizard");
    }

    static has_backToDashboard(){
        return this.hasApi("SETAPP_backToDashboard");
    }

    static backToDashboard(){
        return this.runApi("SETAPP_backToDashboard");
    }

    /* Wireless gateway APIs */
    static has_scanHg(){
        return this.hasApi("SETAPP_scanHg");
    }

    static scanHg(json_args){
        return this.runApi("SETAPP_scanHg", json_args);
    }

    static has_scanHgRepeaters(){
        return this.hasApi("SETAPP_scanHgRepeaters");
    }

    static scanHgRepeaters(json_args){
        return this.runApi("SETAPP_scanHgRepeaters", json_args);
    }

    static has_webHgIsReady(){
        return this.hasApi("SETAPP_webHgIsReady");
    }

    static webHgIsReady(){
        return this.runApi("SETAPP_webHgIsReady");
    }

    /* Side Menu Items */ 
    static has_openSupport(){
        return this.hasApi("SETAPP_openSupport");
    }

    static openSupport(){
        return this.runApi("SETAPP_openSupport");
    }
    
    static has_sendLogs(){
        return this.hasApi("SETAPP_sendLogs");
    }

    static sendLogs(){
        return this.runApi("SETAPP_sendLogs");
    }


    static has_goToOnlineSupport(){
        return this.hasApi("SETAPP_goToOnlineSupport");
    }

    static goToOnlineSupport(){
        return this.runApi("SETAPP_goToOnlineSupport");
    }

    static has_startCentralCommScanning(){
        return this.hasApi("SETAPP_startCentralCommScanning");
    }

    static startCentralCommScanning(protoMsg){
        let ser_msg = Object.values(protoMsg.serializeBinary())
        this.webLog(`msg: ${ser_msg}`)
        return this.runApi("SETAPP_startCentralCommScanning", ser_msg);
    }
}

export {
    MobileApi,
    QR_TO_GTYPES_PRODUCT,
    SOLAREDGE_APPS,
    MOBILE_TO_WEB_LANGUAGE_CODES
}