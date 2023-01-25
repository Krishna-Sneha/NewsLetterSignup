const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res)=>
{
    res.sendFile(__dirname+"/signup.html")
})

app.post('/', (req, res)=>{
    var fn = req.body.fname;
    var ln = req.body.lname;
    var m = req.body.mail;

    const url = "https://us17.api.mailchimp.com/3.0/lists/e27a1ce1d3"

    const data = {
        members: [
            {
                email_address: m,
                status: "subscribed",
                merge_fields: {
                    FNAME: fn,
                    LNAME: ln
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    console.log(jsonData);

    const options = {
        method: "POST",
        auth: "krishna:14e8b57c64af8a6d4fb087aa2bd17a11-us17"
    }
    const request = https.request(url, options, (response)=>{

        if(response.statusCode === 200)
            res.sendFile(__dirname+"/success.html")
        else    
            res.sendFile(__dirname+"/failure.html")
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })



    request.write(jsonData);
    request.end();

    // console.log(fn);
    // console.log(ln);
    // console.log(m);


})

app.post('/failure', (req, res)=>{
    res.redirect('/');
})

app.listen(3000, ()=>{
    console.log("App is listening to port 3000");
})

// api key = 14e8b57c64af8a6d4fb087aa2bd17a11-us17
// audience id= e27a1ce1d3
