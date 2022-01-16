const express = require("express");
const https = require("https");
require('dotenv').config();

const app = express(); // express module
var port = 3000; // localhost:3000
// app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies (generally used when getting data from HTML forms)

app.use(express.static("public")); // public folder has shared files

app.get("/", function(req, res){ 
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){ 
    
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
 
    const url = "https://us" + process.env.REGION + ".api.mailchimp.com/3.0/lists/" + process.env.LIST_ID; 
    // console.log(url);
    
    const options = {
        method: "POST",
        auth: "chimp:" + process.env.API_KEY
    }
    // console.log(options.auth);
    
    const request = https.request(url, options, function(response){
        
        if(response.statusCode === 200)
            res.sendFile(__dirname + "/success.html")
        else
            res.sendFile(__dirname + "/failure.html")

        // response.on("data", function(data){
        //     // console.log(JSON.parse(data));
        // })
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || port, function(){ 
    console.log("Server started on port " + port);
    console.log("Server Running...");
})
