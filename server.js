const express = require("express"),
    //  mongoose = require("mongoose"),
           bp = require("body-parser"),
      DB_NAME = "my_first_db";
          app = express(), 
         port = 8000;

app.use(express.static(__dirname + "/static"));
app.use(bp.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//used to call schema in student model
//can be moved to mongoose.js
// require('./server/models/student');

//call database name from mongoose.js
require('./server/utils/mongoose')(DB_NAME);
//call routes
require('./server/utils/routes')(app);





app.listen(port, () => {
    console.log("Listening on port ${port}")
});