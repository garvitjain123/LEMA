var mongoose = require("mongoose");

var locationschema = new mongoose.Schema({
    receivedData : String
    
});

module.exports = mongoose.model("location", locationschema);