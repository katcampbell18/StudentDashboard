const Students = require('../controllers/students');

module.exports = function(app) {
    app.get("/", Students.index);
    app.post("/create", Students.create);
    app.get("/add", Students.add); 
    app.get("/display/:_id", Students.show);
    app.get("/edit/:_id", Students.edit);
    app.post("/update/:id", Students.update);    
    app.post("/delete/:id", Students.delete);
}