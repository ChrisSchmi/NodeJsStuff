net = require('net');
var port = 8080;

// echo server
net.createServer(function (socket)
{
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    socket.write("Hey hey!\r\n");
    
    // data received
    socket.on('data', function (data)
    {
      socket.write("\r\nechoing: " + data);
      console.log(socket.name + "> " + data);
    });

    // socket closed 
    socket.on('end', function ()
    {
        console.log(socket.name + " left\n");
    });
    
}).listen(port);

console.log("echo running at local port \n");