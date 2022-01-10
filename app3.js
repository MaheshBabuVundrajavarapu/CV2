const express = require("express");
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
 
const app = express();
app.use(express.static("locfile"));
app.use(bodyParser.urlencoded({ extended: true }));
 
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
 
app.post("/", function(req, res){
 
    const fname=req.body.firstName;
    const lname=req.body.lastName;
    const ename=req.body.emailName;
     
        const data ={
            members:[
                {
                    email_address:ename,
                    status:"subscribed",
                    Merge_fields: {
                        FNAME:fname,
                        LNAME:lname,
                    }
                }
            ]
        }
 
  const jsonData = JSON.stringify(data);
  const url = "https://us20.api.mailchimp.com/3.0/lists/e9cce6e615";
  const option = {
    method: "POST",
    auth: "Mahesh2:10ece3609ec3043347a4bd72ba4625ae5-us20"
  }
 
  const request = https.request(url, option, function(response){
 
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
      }   else {
            res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
 
  request.write(jsonData);
  request.end();
 
});
 
app.post("/failure", function(req, res) {
    res.redirect("/")
});
 
app.listen(process.env.PORT||3000, function() {
  console.log("Server is running on port 3000!");
});
 