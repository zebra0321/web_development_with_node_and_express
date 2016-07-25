//Import http module
var http = require("http");

//Set up server
http.createServer(function(req,res){
	res.writeHead(200,{"Content-type" : "text/html"});	//Response detail
	res.end("Hello World!");							//Text to be displayed if successfully connected
}).listen("3000");										//Listening port

console.log("Server started on localhost:3000\nPress Ctrl-C to terminate....");