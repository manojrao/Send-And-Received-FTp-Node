var fs = require('fs');
var async = require('async');
var logger = require('mylogger');
var listenPort = 22;
var io = require('socket.io')(listenPort);
dl = require('delivery');

// console.log("hi manoj rao");
io.sockets.on('connection', function (sock) {
var delivery = dl.listen(sock);
delivery.on('receive.success',function(file){
  
        fs.writeFile(file.name.path,file.buffer, function(err){
          if(err){
            logger.log('File could not be saved.');
          }else{
            //console.log('File saved.');
           
          };
        });
    
  });
});
