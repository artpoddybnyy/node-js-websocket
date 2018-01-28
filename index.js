var server = require('ws').Server;
var s = new server({port: process.env.PORT || 1000});


var connectedUsers = [{userName: "center of the city", lat: "49.9935", lng: "36.230382999"}];

s.on('connection', function (ws) {
    if (connectedUsers.length > -1) {
        ws.send(JSON.stringify(connectedUsers));
    }
    ws.on('message', function (message) {
        s.clients.forEach(function (client) {
            // if (client !== ws){
            var parse = JSON.parse(message);
            var searchUser = connectedUsers.map(function (item) {
                return item.userName
            }).indexOf(parse.userName);
            if (searchUser === -1) {
                connectedUsers.push(parse);
                client.send(message);
            } else if (searchUser > -1) {
                connectedUsers[searchUser].lat = +parse.lat;
                connectedUsers[searchUser].lng = +parse.lng;
                client.send(message);
            }
        });
    });


    ws.on("error", function (error) {
        // console.log(error);
    });

    console.log('one more connected');

});