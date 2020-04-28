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
  var myPieChart = new Chart(canvas, {
    type: 'pie',
    data: {
      labels: ["A型", "O型", "B型", "AB型"],
      datasets: [{
          backgroundColor: [
              "#BB5179",
              "#FAFF67",
              "#58A27C",
              "#3C00FF"
          ],
          data: [38, 31, 21, 10]
      }]
    },
    options: {
      title: {
        display: true,
        text: '血液型 割合'
      }
    }
  });
	},
	
	// This function will be called when any of the inputs have changed
	change:function(inputs,outputs) {
		// ...
	}
})