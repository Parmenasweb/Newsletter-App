const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

// render a static page in the serve end 
app.use(express.static("public"))

app.get("/", (req,res)=> {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res)=> {
    let firstName = req.body.FirstName;
    let lastName = req.body.LastName;
    let email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/08347ae9f4"

    const options = {
        method: "POST",
        auth: "parma:e80d1463e31897b45d27c1379f92cc96-us6"
    }
    
    const request = https.request(url, options, function(response) {
        let statusCode = response.statusCode;
        console.log(statusCode);
        statusCode === 200 ? res.sendFile(__dirname + "/success.html") : res.sendFile(__dirname + "/failure.html");


        // response.on("data", function(data) {
        //     // console.log(JSON.parse(data));
            })

            request.write(jsonData);
    request.end();
    })

    app.post("/failure", function(req, res) {
        res.redirect("/")
    });


    // console.log(firstName , lastName , email) 

app.listen(process.env.PORT || 3000, ()=> {
    console.log('server is active on port 3000');
}) 

//  mailchimp api key e80d1463e31897b45d27c1379f92cc96-us6

//  another list id for mailchimp  08347ae9f4