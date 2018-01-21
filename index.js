var server = require('ws').Server;
var s = new server({port: process.env.PORT || 3000});



s.on('connection', function (ws) {

    ws.on('message', function (message) {
       s.clients.forEach(function (client) {
           if (client !== ws){
           client.send(message)
           }
       });
        ws.send(message);
    });


    ws.on("error", function(error){
        // console.log(error);
    });

    console.log('one more connected');

});