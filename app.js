const fs =require('fs');
const bodyParser=require('body-parser');
const express=require('express');
const https = require('https');
const async = require("async");
const mailchimp = require('@mailchimp/mailchimp_marketing');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("locfile"));

app.get('/',function(req,res){

    res.sendFile(__dirname+'/signup.html');

});
app.post('/',function(req,res){
  
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
    // var jsondata=JSON.stringify(data);

    // const url="https://us20.api.mailchimp.com/3.0/lists/e9cce6e615";

    // client.setConfig({apiKey: "e9cce6e615",  server: "us20",});

    mailchimp.setConfig({
        apiKey: "0ece3609ec3043347a4bd72ba4625ae5-us20",
        server: "us20",
      });


    // const options={
    //     method:"POST",
    //     auth:"Mahesh1: 0ece3609ec3043347a4bd72ba4625ae5-us20",
    // }

    // const request=https.request(url,options,function(response){
    //     response.on("data",function(data){
    //        console.log(JSON.parse(data));
    //     })
      
    // })
    // request.write(jsondata);
    // request.end();
    async function run() {
        const response = await mailchimp.lists.batchListMembers('e9cce6e615', data);
        
        
         if(response.errorcount>0)
        {
            res.sendFile(__dirname+"/failure.html");
        }
        else
        {
            res.sendFile(__dirname+"/success.html");
        }
        console.log(response.errorcount);
        console.log(response);
      };
      run();
    });
app.post("/failure", function(req, res) {
    res.redirect("/");
  });
app.listen(3000,function(){
    console.log("server is running at 3000");
  });

