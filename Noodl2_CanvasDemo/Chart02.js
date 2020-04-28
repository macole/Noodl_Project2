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
        var chart = new Chart(canvas, {
            // 作成したいチャートのタイプ
            type: 'line',

            // データセットのデータ
            data: {
                labels: ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul."],
                datasets: [{
                    label: "first data set",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }]
            },

            // 設定オプション
            options: {}
        });

    },

    // This function will be called when any of the inputs have changed
    change: function (inputs, outputs) {
        // ...
    }
})