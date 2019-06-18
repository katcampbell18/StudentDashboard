const mongoose = require("mongoose");

module.exports = function(DB_NAME){

    mongoose.connect(`mongodb://localhost/${DB_NAME}`);
    //can use for loop if need to go through large number of files in models folder
    require('../models/student');
}
