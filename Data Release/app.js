var express         = require('express');
var app             = express();
var mongoose        = require("mongoose");
var bodyParser      = require("body-parser");

var ldata;
var lastdata = 50;
var lt;

mongoose.connect("mongodb://localhost:27017/demoAPI", { useNewUrlParser: true });

var location = require("./models/lat.js");

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended : true}));

//API GET request

app.get("/",function(req,res){
    res.render("demo");    
});

//API Calling

app.post("/",function(req,res){
    
    console.log("Working API REQUEST");
    //Header data gathering
    // console.log(req.params.t);
    // ldata = req.params.t;
    ldata = parseInt(req.body.tap, 10);
    console.log(ldata);
    var intt = { fir : ldata };
    console.log(intt);
    
    location.create(intt, function(err, newtt){
        if(err)
        {
            console.log(err);  
        }
        else{
            console.log("*************");
            console.log(newtt);
        }
    });
    
    console.log("Working till now");
    // //Latest Data Gathering
    location.find({}).sort([['created_at', -1]]).exec(function(err, lastformat){
        if(err){
            console.log(err);
        }
        else{
            console.log(lastformat);
            ldata = lastformat.fir;
        }
      
    });

    // //Doing Corrections and calculations
    // // ccalcandcorr();
    
    // //Example COrrections;
    lt = lastdata + ldata;
    
    // //Sending back the result
    res.render("lit", { lt : lt });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The API is Functioning");
});