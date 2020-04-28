define({
    // The input ports of the Javascript node, name of input and type
    inputs: {
        // ExampleInput:'number',
        // Available types are 'number', 'string', 'boolean', 'color' and 'signal',
        mySignal: 'signal',
        DOM: 'domelement',
        scriptLoaded: "string",
        text:'string',
    },

    // The output ports of the Javascript node, name of output and type
    outputs: {
        // ExampleOutput:'string',
    },

    // All signal inputs need their own function with the corresponding name that
    // will be run when a signal is received on the input.
    mySignal: function (inputs, outputs) {
        // ...
        var canvas = inputs.DOM;
        var context = canvas.getContext("2d");
        
        function readQr(video) {
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: {
                        exact: "environment"
                    }
                }
            })
                .then((stream) => {
                    video.srcObject = stream;
                    const canvas = document.createElement("canvas");
                    canvas.width = 240;
                    canvas.height = 320;

                    return new Promise((res) => {
                        const loop = setInterval(() => {
                            canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
                            const img = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
                            const result = jsQR(img.data, img.width, img.height);
                            if (result) {
                                clearInterval(loop);
                                video.srcObject.getTracks()[0].stop();
                                video.srcObject = null;
                                res(result);
                            }
                        }, 100);
                    });
                });
        }

        function writeQr(canvas, data) {
            return new Promise((res, rej) => {
                QRCode.toCanvas(canvas, data, {
                    margin: 2,
                    scale: 2
                }, (err, tg) => !err ? res(tg) : rej(err));
            });
        }
        
         writeQr(canvas, inputs.text)

        //document.getElementById("req").addEventListener("change", ({ target }) => writeQr(canvas, target.value));
        //readQr(document.getElementById("cap")).then(({ data }) => document.getElementById("res").value = data);

    },

    // This function will be called when any of the inputs have changed
    change: function (inputs, outputs) {
        // ...
    }
})