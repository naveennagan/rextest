var express = require('express');

var path = require('path');

var app = express();

var notifications=[];

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/set', function(req, res) {
    var user = req.query.user; 
	if(notifications.length<10){
      notifications.push(user);
	}
	else{
	 notifications=0;	
	}
	res.json({"users": notifications});
});

app.get('/get', function(req, res) {
   res.json({"nots": notifications.length});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});