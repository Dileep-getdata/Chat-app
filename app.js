const express=require('express');

const fs=require('fs');

const { urlencoded } = require('body-parser');

const app=express();

app.use(urlencoded({extended:false}));

app.get('/login',(req,res,next)=>{
    res.send(`<form action="/" 
    onsubmit="localStorage.setItem('Username',document.getElementById('Username').value)" 
    method="POST"><label for="user">Username: </label>
    <input type="text" id="Username" name="Username"><br><button type="submit">Log In</button></form>`);
    
})

app.get('/',(req,res,next)=>{
   res.send(`<form action="/" 
   onsubmit="document.getElementById('Username').value=localStorage.getItem('Username')" 
   method="post">
   <p>${fs.readFileSync('./username.txt',
   {encoding:'utf8', flag:'r'})}</p>
   <input type="text" id="message" name="message">
   <input type="hidden" id="Username" name="Username">
   <button type="submit">Send</button></form>`);
    
})

app.post('/',(req,res,next)=>{
    // console.log(req.body);
    const data = fs.readFileSync('./username.txt',
{encoding:'utf8', flag:'r'});
    fs.writeFile('username.txt',` ${data} ${req.body.Username}:${req.body.message} `,(err)=>{
        if(err){
            console.log(err);
        }
    });
    res.redirect('/'); 
})
app.listen(3000);