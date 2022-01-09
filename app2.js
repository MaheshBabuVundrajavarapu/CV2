const fs=require('fs');

const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const request = require("request");

const async = require("async");

const mailchimp = require("@mailchimp/mailchimp_marketing");



const app = express();



app.use(express.static("locfile"));



app.use(bodyParser.urlencoded({ extended: true}));



app.get("/", function(req, res){

  res.sendFile(__dirname + "/signup.html");

});



app.post("/", function(req, res){

    const fname = req.body.firstName;

    const lname = req.body.lastName;

    const ename = req.body.emailName;

    var data = {

        members: [

            {

                email_address: ename,

                status: "subscribed",

                merge_fields: {

                    FNAME: fname,

                    LNAME: lname,

                }

            }

        ]

    }

    mailchimp.setConfig({

        apiKey: "0ece3609ec3043347a4bd72ba4625ae5-us20",

        server: "us20",

    });

    async function run() {

        const response = await mailchimp.lists.batchListMembers("e9cce6e615", data);

        if (response.error_count > 0){

            res.sendFile(__dirname + "/failure.html");

        } else {

            res.sendFile(__dirname + "/success.html");

        }

        console.log(response.error_count);

        console.log(response);

    };



    run();

});



app.post("/failure", function(req, res){

  res.redirect("/");

});



app.listen(3000, function() {

   console.log("Server is running on port 3000");

});

