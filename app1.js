const fs =require('fs');
const bodyParser=require('body-parser');
const express=require('express');
const https = require('https');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("locfile"));

app.get('/',function(req,res){

    res.sendFile(__dirname+'/signup.html');

});

mailchimp.setConfig({
    apiKey: "0ece3609ec3043347a4bd72ba4625ae5-us20",
    server: "us20",
  });


app.post('/',function(req,res){
  
    const fname=req.body.firstName;
    const lname=req.body.lastName;
    const ename=req.body.emailName;
     
        const data ={
                        FirstNAME:fname,
                        LastNAME:lname,
                        email:ename,
                }

    // var jsondata=JSON.stringify(data);

    // const url="https://us20.api.mailchimp.com/3.0/lists/e9cce6e615";

    // client.setConfig({apiKey: "e9cce6e615",  server: "us20",});

   


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
    const run = async () => {
        try{
        const response = await mailchimp.lists.batchListMembers('e9cce6e615',{

            email_address:data.email,
            status:"subscribed",
            merge_fields:{
                 FNAME:data.FirstNAME,
                 LNAME:data.LastNAME,
            }
        });
        console.log(response);
     res.send(__dirname + "/success.html");
    } catch (err) {
      console.log(err.status);
        res.send(__dirname + "/failure.html");  
    }
      };
      run()   
});

    app.post("/failure", function(req, res) {
        res.redirect("/");
      });
app.listen(3000,function(){
    console.log("server is running at 3000");
  });

