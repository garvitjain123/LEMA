var mongoose = require("mongoose");

var locationschema = new mongoose.Schema({
    fir : Number,
    created_at: Date
    
});

module.exports = mongoose.model("location", locationschema);