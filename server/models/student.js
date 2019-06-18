const mongoose = require("mongoose");

//create schema
const StudentSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Why no name?"], minlength: [2,"Name must be at least 2 characters long"] },
    home_state: {type: String, required: [true,"Where are you from?"]},
    lucky_number: {type: Number, required: [true, "Pick a number between 1 and 150"], min:1, max: 150},
    birthday: {type: Date , required:[true,"Are you alive?"]}
}, {timestamps: true});

//create a table named Student in the schema
mongoose.model("Student", StudentSchema);