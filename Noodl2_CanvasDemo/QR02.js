define({
    // The input ports of the Javascript node, name of input and type
    inputs: {
        // ExampleInput:'number',
        // Available types are 'number', 'string', 'boolean', 'color' and 'signal',
        mySignal: 'signal',
        DOM: 'domelement',
        scriptLoaded: "string",
        text: "string",
    },

    // The output ports of the Javascript node, name of output and type
    outputs: {
        // ExampleOutput:'string',
    },

    // All signal inputs need their own function with the corresponding name that
    // will be run when a signal is received on the input.
    mySignal: function (inputs, outputs) {
        var canvas = inputs.DOM;
        //var context = canvas.getContext("2d");

        function writeQr(canvas, data) {
            return new Promise((res, rej) => {
                QRCode.toCanvas(canvas, data, {
                    margin: 2,
                    scale: 2
                }, (err, tg) => !err ? res(tg) : rej(err));
            });
        }

        writeQr(canvas, inputs.text);

    },

    // This function will be called when any of the inputs have changed
    change: function (inputs, outputs) {
        // ...
    }
})