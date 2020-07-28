var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function manualSend(controllersURLQuery,fileStateQueryString) {
    console.log('Manual send started!');
    var url = 'http://' + '10.4.20.21' + ':8080/mobile/commissioning/v1/manual' + '?' + controllersURLQuery + fileStateQueryString
    console.log(url);
      
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.send();
    
    console.log('Manual send finished!');
}

exports.manualSend = manualSend