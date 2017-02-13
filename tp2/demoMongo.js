//installer nodemon à la maison

var express = require("express");
var auth = require("basic-auth");
var app = express();
/*
var baseAuth = function(req, res, next){
    
    var reponse = true; //bout
    if(reponse){
        next();
    }
    else{
        res.status(401).send();
    }
}*/
/* à remplir correctement
var authBasic = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'foo' && user.pass === 'bar') {
    return next();
  } else {
    return unauthorized(res);
  };
};*/

app.put.("*", baseAuth);
app.post.("*", baseAuth);
app.delete.("*", baseAuth);


app.route("/poussin")
    .get(function(req, res, next){
        res.send("GET");
    })
    .put(function(req, res, next){
    
    //body parser
        res.send("PUT");
    });


app.route("/poussin/:id")
    .get(function(req, res, next){
        res.send("GET : id = " + req.params.id);
    })
    .put(function(req, res, next){
    
    //body parser
        res.send("PUT");
    });



app.all("*", function(req, res){
    res.status(400).send();
});

app.listen(8080, function(){
    console.log("weeeeeeeeeeeeee");
});