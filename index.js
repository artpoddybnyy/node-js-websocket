var server = require('ws').Server;
var s = new server({port: 5001});
var history = [];


s.on('connection', function (ws) {

    if (history.length > -1){
        ws.send(JSON.stringify(history));
    }

    ws.on('message', function (message) {
       s.clients.forEach(function (client) {
           if (client !== ws){
           client.send(message)
           }
       });

        history.push(message);
        ws.send(message)
    });


    ws.on("error", function(error){
        console.log(error);
    });

    console.log('one more connected');

    // ws.on('close', function () {
    //     console.log('lost client');
    // });
});