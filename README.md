Client Site (Send Data)
var http = require('http');
var logger = require('mylogger');
var io = require('socket.io-client');
var fs = require('fs');
var socket = io.connect('ws://000.000.000.00:22');
dl = require('delivery');
var glob = require('glob');
socket.on( 'connect', function() 
{
  delivery = dl.listen( socket );
  delivery.connect();
  delivery.on('delivery.connect',function(delivery)
  {
    function sendata(GetFolderPath,RemoteFoldePath) {
      
      // console.log('hi test'+GetFolderPath);
      glob(GetFolderPath+'**', function(err, files) {
        if(files!='')
        {
          for (var F =1;F< 2; F++) 
          {
            if(files[F]!=undefined)
            {
              
              var filesRes = files[F].split(GetFolderPath);
              if (filesRes!=undefined && filesRes[1]!=undefined)
              {
                var filePath=files[F];
                var remotepath=RemoteFoldePath+filesRes[1];
                var localpath=filePath;
                if(localpath!=undefined && localpath!='' && remotepath!=undefined && remotepath!='')
                {
                  
                    delivery.send({
                      name: {'path':remotepath},
                      path :localpath 
                    });

                    delivery.on('send.success',function(file){
                      // return localpath
                      fs.unlink(localpath, function(err) {
                        if(err==null)
                        {
                          console.log('File Send');
                          logger.log('File Send'+localpath);
                          sendata(GetFolderPath,RemoteFoldePath);
                        }
                        else
                        {
                          logger.log('file not send'+err);
                          console.log('file not send'+err);
                        }
                        
                      });
                      
                    });
                }
                else
                {
                  logger.log('remote path Not Found');
                  console.log('remote path Not Found');
                }
              }
              else
              {
                logger.log('File Path Not Found');
                console.log('File Path Not Found');
              }
            }
            
          }

        }

      });
    }
    GetFolderPath='your local path';
    RemoteFoldePath='your remote path';
    sendata(GetFolderPath,RemoteFoldePath);
    setInterval(function () { 
    GetFolderPath='/usr/local/lib/python2.7/site-packages/yowsup2-2.5.7-py2.7.egg/yowsup/EleMedia/Images/'+dailymont+'/';
    RemoteFoldePath='/home/mobdata/msgstore/+'+login_num+'/Images/'+dailymont+'/';
    sendata(GetFolderPath,RemoteFoldePath);
  }, 5000); 

    

  });
  
});
