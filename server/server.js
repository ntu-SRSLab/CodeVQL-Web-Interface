var app = require('express')()
var http = require('http').Server(app)
var path = require('path');
const shell = require("shelljs");
const fs = require("fs");
var io = require('socket.io')(http)
var SocketIOFileUpload = require('socketio-file-upload');
app.use(SocketIOFileUpload.router);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.get('/clients', (req, res) => {
  res.send(Object.keys(io.sockets.clients().connected))
})
shell.mkdir("-p","./uploads")
shell.mkdir("-p","./logs")

const ServerResponse = "ServerResponse";

io.on('connection', socket => {
   
  function server(testedfile){
    // (invoke your command line tool and return the output)
    // output = shell.exec(...cmd)
    output = "This is the result of executing command line tool on file " +testedfile;
    socket.emit(ServerResponse, output);
  }



  console.log(`A user connected with socket id ${socket.id}`)
  socket.on('pingServer', data => {
    console.log(`pingServer A user connected with socket id`, socket.id, data);
    // socket.emit('customEmit', "hello world");
  })

  // Make an instance of SocketIOFileUpload and listen on this socket:
  var uploader = new SocketIOFileUpload();
  shell.mkdir("-p", "./uploads");
  uploader.dir = "./uploads";
  uploader.listen(socket);
  console.log(uploader.mode);

  // Do something when a file is saved:
  uploader.on("saved", function (event) {
    console.log(event.file.name);
    console.log("saved");
    // server logic
    server(event.file.name);
  });

  // Error handler:
  uploader.on("error", function (event) {
    console.log("Error from uploader", event);
  });

  //  Do remove old file when same name file exists
  uploader.on("start", function (event) {
    console.log(path.join(uploader.dir, event.file.name));
    if (fs.existsSync(path.join(uploader.dir, event.file.name))) {
      console.log("overwrite existing file:", path.join(uploader.dir, event.file.name));
      shell.rm("-f", path.join(uploader.dir, event.file.name));
    }
  });
})
http.listen(3000, () => {
  console.log('Listening on *:3000')
})