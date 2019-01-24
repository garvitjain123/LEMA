var express     = require("express");
var app         = express();
var mongoose    = require("mongoose");
var bodyParser  = require("body-parser");
var request     = require("request");


var fetchURL; 

mongoose.connect("mongodb://localhost:27017/main", { useNewUrlParser: true });

var location = require("./models/lat.js");



app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
   res.render("first.ejs"); 
});


app.post("/", function(req,res){
    fetchURL = req.body.URLfetch;
    request(fetchURL, function(error,response,body){
        if(!error && response.statusCode == 200){
                  var db = body;
                  var bodyJSON = { receivedData: db };
                  console.log("************************************");
                  console.log(bodyJSON);
                  location.create(bodyJSON, function(err, storedlocation){
                       if(err)
                       {
                           console.log(err);
                       }
                       else{
                           console.log("Data Saved Successfully");
                           console.log(storedlocation);
                       }
                    });
        }
    });
    res.render("accepted");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The application has been started");
});