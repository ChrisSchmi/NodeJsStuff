net = require('net');
var port = 8080;
var s;
var cancelled = false;

var sampledata = function(socket) {
  if(cancelled) return;
  s.write("StringStringString");
  setTimeout(sampledata,1000);
};

// server
var server = net.createServer(function (socket) {

    // connected
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    
    // received
    socket.on('data', function (data) {
        if(data == "q")
        {
          cancelled = true;
          socket.write("\r\n\r\nbye bye");
          socket.unref();
          socket.destroy();
          server.close();
        }
        console.log(socket.name + "> " + data);
    });

    // close
    socket.on('end', function () {
      console.log(socket.name + " left.\n");
    });
    
    //error
    socket.on('error', function () {
      console.log(socket.name + " error -> closing connection.\n");
      process.exit(1);
    });
    
    s = socket;
    sampledata(s);
    
}).listen(port);

console.log("running at local port \n");