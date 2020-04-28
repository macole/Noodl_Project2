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
  var myBarChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['8月1日', '8月2日', '8月3日', '8月4日', '8月5日', '8月6日', '8月7日'],
      datasets: [
        {
          label: 'A店',
          data: [62, 65, 93, 85, 51, 66, 47],
          backgroundColor: "rgba(219,39,91,0.5)"
        },{
          label: 'B店',
          data: [55, 45, 73, 75, 41, 45, 58],
          backgroundColor: "rgba(130,201,169,0.5)"
        },{
          label: 'C店',
          data: [33, 45, 62, 55, 31, 45, 38],
          backgroundColor: "rgba(255,183,76,0.5)"
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: '支店別 来客数'
      },
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: 100,
            suggestedMin: 0,
            stepSize: 10,
            callback: function(value, index, values){
              return  value +  '人'
            }
          }
        }]
      },
    }
  });
	},
	
	// This function will be called when any of the inputs have changed
	change:function(inputs,outputs) {
		// ...
	}
})