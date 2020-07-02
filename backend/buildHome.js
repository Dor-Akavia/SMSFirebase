var avilableControllers = [
    {name:"PORTIA", id: 0}, 
    {name:"VENUS_DSP1", id: 1},
    {name:"VENUS_DSP2", id: 2},
    {name:"JUPITER_DSP1", id:3},
    {name:"JUPITER_DSP2", id:4},
    {name:"VENUS3_DSP1", id:8},
    {name:"VENUS3_DSP2", id:9},
    {name:"VENUS_LITE_DSP1", id:10},
    {name:"VENUS_LITE_DSP2", id:11}, 
    {name:"EVSE", id:13},
    {name:"SE_DCDC", id: 14},
    {name:"METER", id: 15},
    {name:"JUPITER_SE_DSP1", id: 19},  
    {name:"JUPITER_SE_DSP2", id: 20},
    {name:"BUI", id:21},
    {name:"FOUR_BOX", id:22}
   ];

var flows = [
    {name:"Activation", id:3, value:3, text:"Activate the device"},
    {name:"FW_Upgrade", id:5,value:5, text: "Upgrade the device"}
]


function buildHome(params) {  
    var half = Math.round(avilableControllers.length / 2)
    var controllersGrid = document.querySelector('.controllers');
    var flowsGrid = document.querySelector('.avilableFlows');
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");

    div1.className = "avilableControllers"
    div2.className = "avilableControllers"

    for (let index = 0; index <= 1; index++) {
        var flowsCheckbox = document.createElement("INPUT");
        flowsCheckbox.setAttribute("type", "checkbox")
        flowsCheckbox.value = flows[index].id
        flowsCheckbox.id = flows[index].name
        flowsCheckbox.name = flows[index].name

        var flowsLabel = document.createElement("label"); 
        flowsLabel.setAttribute("for", flows[index].name)
        flowsLabel.textContent = flows[index].text

        flowsGrid.appendChild(flowsCheckbox);
        flowsGrid.appendChild(flowsLabel);
        
        var flowsbar = document.createElement("br");
        flowsGrid.appendChild(flowsbar);     
            
        
    }

    for (let index = 0; index < avilableControllers.length; index++) {
        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox")
        checkbox.id = avilableControllers[index].name      
        checkbox.name = avilableControllers[index].name      
        checkbox.value = avilableControllers[index].id 

        var label = document.createElement("label");  
        label.setAttribute("for", avilableControllers[index].name)
        label.textContent = avilableControllers[index].name

        var bar = document.createElement("br");

        if (index <= half) {
            div1.appendChild(checkbox);
            div1.appendChild(label);
            div1.appendChild(bar); 
        }

        if (index >= half) {
            div2.appendChild(checkbox);
            div2.appendChild(label);
            div2.appendChild(bar); 
        }

        controllersGrid.appendChild(div1)
        controllersGrid.appendChild(div2)
		
    }  

}

 

buildHome();


