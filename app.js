const express = require("express");
const https = require("https");

const app = express(); // express module
var port = 3000; // localhost:3000
// app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies (generally used when getting data from HTML forms)

app.use(express.static("public")); // public folder has shared files ike

app.get("/", function(req, res){ // At localhost:{PORT}/
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){  // At localhost:{PORT}/
    
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName, lastName, email);
    // res.send();
});


app.listen(port, function(){ 
    console.log("Server started on port " + port);
    console.log("Server Running...");
})