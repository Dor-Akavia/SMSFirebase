<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body class="myB" style="background-color:#001446;;">

    <div class="myImage">
        <img src="https://www.solaredge.com/themes/solaredge_2018/img/SolarEdge_logo_footer.svg" height="80" width="140" style="margin-top: 20px; margin-left: 5px;">
    </div>

    <div class="page"> 
    <p style="color: white; display: block;">Setapp Simulator 1.0</p>

    <style>
    button {
    height: 25px;
    width: 50%;
    border-radius: 5px;
    border-color: red;
    background-color: #001446;
    color: ghostwhite;
    font-weight: 200;
    }
    </style>

    </div>


    <script>

    var window = navigator.userAgent || navigator.vendor || window.opera;
    
    var functions = [
        {name:'SETAPP_openSupport'},
        {name:'SETAPP_goToOnlineSupport'},
        {name:'SETAPP_sendLogs'},
        {name:'SETAPP_deviceInit'},
        // {name:'SETAPP_startCentralCommScanning'},
        {name:'SETAPP_apIpChange'}
]

    var page = document.querySelector('.page');
    
    for (let index = 0; index < functions.length; index++) {
        var optionButton = document.createElement('button')
        var br1 = document.createElement('br')
        var br2 = document.createElement('br')
        optionButton.textContent = functions[index].name
        optionButton.setAttribute("onclick", 'assertClick(' + JSON.stringify(functions[index].name) + ')')
        page.appendChild(optionButton);
        page.appendChild(br1);
        page.appendChild(br2);
    }

    var platform = null

   
    function showWeb() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            platform = 'Android'
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        platform = 'iOS'    
        }
        if (platform === 'Android') {
            window.Android.SETAPP_showWeb();
        }
        if (platform === 'iOS') {
            window.webkit.messageHandlers.SETAPP_showWeb();
        }
    }

        // ->  Commissioning_CentralCommissioning() 
    showWeb();

    function assertClick(selection) {      
        var userAgent = navigator.userAgent || navigator.vendor || window.opera
        if (/android/i.test(userAgent)) {
            console.log('Android view');    
            platform = 'Android'
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            console.log('iOS view');
            platform = 'iOS'
        }

        if (platform === 'Android') {
            if (selection === functions[0].name) {              
                window.Android.SETAPP_openSupport();
            }
            if (selection === functions[1].name) {
                window.Android.SETAPP_goToOnlineSupport();
            }
            if (selection === functions[2].name) {
                window.Android.SETAPP_sendLogs();
            }
            if (selection === functions[3].name) {
                window.Android.SETAPP_deviceInit();
            }
            if (selection === functions[4].name) {
                window.Android.SETAPP_startCentralCommScanning();
            }
            if (selection === functions[5].name) {
                window.Android.SETAPP_apIpChange();
            }
        }

        if (platform === 'iOS') {
            if (selection === functions[0].name) {
                console.log('inside function support');               
                window.webkit.messageHandlers.SETAPP_openSupport();
            }
            if (selection === functions[1].name) {
                window.webkit.messageHandlers.SETAPP_goToOnlineSupport();
            }
            if (selection === functions[2].name) {
                window.webkit.messageHandlers.SETAPP_sendLogs();
            }
            if (selection === functions[3].name) {
                window.webkit.messageHandlers.SETAPP_deviceInit();
            }
            if (selection === functions[4].name) {
                window.webkit.messageHandlers.SETAPP_startCentralCommScanning();
            }
            if (selection === functions[5].name) {
                window.webkit.messageHandlers.SETAPP_apIpChange();
            }
        }       
    }
    </script>
</body>
</html>

