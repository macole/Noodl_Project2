define({
	// The input ports of the Javascript node, name of input and type
	inputs:{
	    // ExampleInput:'number',
	    // Available types are 'number', 'string', 'boolean', 'color' and 'signal',
	    mySignal:'signal',
	    DOM:'domelement',
	    scriptLoaded: "string",
	},
	
	// The output ports of the Javascript node, name of output and type
	outputs:{
	    // ExampleOutput:'string',
	},
	
	// All signal inputs need their own function with the corresponding name that
	// will be run when a signal is received on the input.
	mySignal:function(inputs,outputs) {
		// ...
		//        if (!inputs.scriptLoaded) {
        //        return;
        //}
        var canvas = inputs.DOM;
        var context = canvas.getContext("2d");
    var myRadarChart = new Chart(context, {
        type: 'radar', 
        data: { 
            labels: ["英語", "数学", "国語", "理科", "社会"],
            datasets: [{
                label: 'Aさん',
                data: [92, 72, 86, 74, 86],
                backgroundColor: 'RGBA(225,95,150, 0.5)',
                borderColor: 'RGBA(225,95,150, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'RGB(46,106,177)'
            }, {
                label: 'Bさん',
                data: [73, 95, 80, 87, 79],
                backgroundColor: 'RGBA(115,255,25, 0.5)',
                borderColor: 'RGBA(115,255,25, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'RGB(46,106,177)'
            }]
        },
        options: {
            title: {
                display: true,
                text: '試験成績'
            },
            scale:{
                ticks:{
                    suggestedMin: 0,
                    suggestedMax: 100,
                    stepSize: 10,
                    callback: function(value, index, values){
                        return  value +  '点'
                    }
                }
            }
        }
    });
	},
	
	// This function will be called when any of the inputs have changed
	change:function(inputs,outputs) {
		// ...
	}
})