var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");


var index = require("./routes/index");
var tasks = require("./routes/tasks");

var port = 3000;
var app = express();

// view Engine
app.set('views',path.join(__dirname,'dist'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);


// set static folder

app.use(express.static(path.join(__dirname,'dist')));


// body parser MS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port,function(){
    console.log("server run on port : "+port );
});