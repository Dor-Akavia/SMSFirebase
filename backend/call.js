var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function manualSend(params) {
    console.log('Manual send started!');
    var url = 'http://' + 'localhost' + ':8080/mobile/commissioning/v1/manual'
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.send();
    console.log('Manual send finished!');

}


