define({
    // The input ports of the Javascript node, name of input and type
    inputs: {
        // ExampleInput:'number',
        // Available types are 'number', 'string', 'boolean', 'color' and 'signal',
        mySignal: 'signal',
        DOM: 'domelement',
        scriptLoaded: "string",
    },

    // The output ports of the Javascript node, name of output and type
    outputs: {
        // ExampleOutput:'string',
    },

    // All signal inputs need their own function with the corresponding name that
    // will be run when a signal is received on the input.
    mySignal: function (inputs, outputs) {
        // ...
        //if (!inputs.scriptLoaded) {
        //        return;
        //}
        var canvas = inputs.DOM;
        var myLineChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['8月1日', '8月2日', '8月3日', '8月4日', '8月5日', '8月6日', '8月7日'],
                datasets: [
                    {
                        label: '最高気温(度）',
                        data: [35, 34, 37, 35, 34, 35, 34, 25],
                        borderColor: "rgba(255,0,0,1)",
                        backgroundColor: "rgba(0,0,0,0)"
                    },
                    {
                        label: '最低気温(度）',
                        data: [25, 27, 27, 25, 26, 27, 25, 21],
                        borderColor: "rgba(0,0,255,1)",
                        backgroundColor: "rgba(0,0,0,0)"
                    }
                ],
            },
            options: {
                title: {
                    display: true,
                    text: '気温（8月1日~8月7日）'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMax: 40,
                            suggestedMin: 0,
                            stepSize: 10,
                            callback: function (value, index, values) {
                                return value + '度'
                            }
                        }
                    }]
                },
            }
        });

    },

    // This function will be called when any of the inputs have changed
    change: function (inputs, outputs) {
        // ...
    }
})