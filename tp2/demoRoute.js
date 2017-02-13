//test
var express = require("express");
var app = express();
//app.get app.post app.put add.delete etc etc 
//app.all

var contenu ="";

app.get("/", function( req, res, next ){
    console.lod(req);
    res.send("bien recu en get"); // écrit dans la navigateur
    
});


app.get("/poussin/", function( req, res, next ){
    console.log(req);
   // res.send("1 bien recu en get"); // écrit dans la navigateur
    contenu = "1 bien recu en get";
    next();
});

app.get("/poussin/", function( req, res, next ){
    console.log(req);
    contenu +=  "2 bien recu en get"
    res.send(contenu); // écrit dans la navigateur
    
});

app.post("/poussin/", function( req, res, next ){
    console.log(req);
     res.send("bien recu en post");
});

app.put("/poussin/", function( req, res, next ){
    console.log(req);
     res.send("bien recu en put");
});

app.delete("/poussin/", function( req, res, next ){
    console.log(req);
     res.send("bien recu en delete");
});

app.all("*", function(req, res){
    res.status(400).send();
});

app.listen(8080, function(){
    console.log("weeeeeeeeeeeeee");
});