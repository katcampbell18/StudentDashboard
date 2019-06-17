const express = require("express"),
     mongoose = require("mongoose"),
           bp = require("body-parser"),
          app = express(), 
         port = 8000;

app.use(express.static(__dirname + "/static"));
app.use(bp.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//leave as localhost but change db name at end
mongoose.connect("mongodb://localhost/my_first_db");

//create schema
const StudentSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Why no name?"], minlength: [2,"Name must be at least 2 characters long"] },
    home_state: {type: String, required: [true,"Where are you from?"]},
    lucky_number: {type: Number, required: [true, "Pick a number between 1 and 150"], min:1, max: 150},
    birthday: {type: Date , required:[true,"Are you alive?"]}
}, {timestamps: true});

//create a table named Student in the schema
mongoose.model("Student", StudentSchema);
const Student = mongoose.model("Student");


app.get("/",(req, res) => {
    Student.find({}, (err, students) => {
        if (err) {
            console.log(err);
        }
        res.render("index", {students});
    });
}); 

app.get("/add", (req,res, next) => {
    res.render("new");
});

app.post("/create",(req,res) => {
    //create an instance of student
    let s = new Student(req.body);
    //check for errors, and write to console
    s.save(err => {
        if(err) {
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    });
});

app.get("/display/:_id", (req,res) => {
    Student.findById({_id: req.params._id}, (err,student) =>{
        if (err) {
            console.log(err);
        }
            res.render("display", {student});
        });
    });

app.get("/edit/:_id", (req,res) => {
    Student.findOne({_id: req.params._id}, (err,student) => {
        if (err) {
            console.log(err);
        }
        res.render("edit", {student});
    });
});

app.post("/update/:id",(req,res) => {
    let query = {_id: req.params._id};
    Student.findByIdAndUpdate(query,req.body,(err, student) => {
        //check for errors, and write to console
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/");
        }
    });
});

app.post("/delete/:id", (req,res) => {
    Student.findByIdAndRemove({_id: req.params._id},err =>{
        if(err) {
            console.log(err);
        }
        else {
            return redirect("/");
        }
    });
});

app.listen(port, () => {
    console.log("Listening on port ${port}")
});