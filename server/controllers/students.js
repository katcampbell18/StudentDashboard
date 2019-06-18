const mongoose = require("mongoose");
const Student = mongoose.model("Student");

class Students {

    index(req,res){
        Student.find({}, (err, students) => {
            if (err) {
                console.log(err);
            }
            res.render("index", {students});
        });
    }

    create(req,res){
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
    }

    add(req,res,next){
        res.render("new");
    }

    show(req,res){
        Student.findById({_id: req.params._id}, (err,student) =>{
            if (err) {
                console.log(err);
            }
                res.render("display", {student});
            });
    }

    edit(req,res){
        Student.findOne({_id: req.params._id}, (err,student) => {
            if (err) {
                console.log(err);
            }
            res.render("edit", {student});
        });
    }

    update(req,res){
        let query = {_id: req.params._id};
        Student.findByIdAndUpdate(query,req.body,{ runValidators: true}, err => {
            //check for errors, and write to console
            if(err) {
                console.log(err);
            }
            else {
                res.redirect("/");
            }
        });
    }

    delete(req,res){
        Student.findByIdAndRemove({_id: req.params._id},err =>{
            if(err) {
                console.log(err);
            }
            else {
                return redirect("/");
            }
        });
    }
}
module.exports = new Students();