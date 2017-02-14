//installer nodemon à la maison

var express = require("express");
var auth = require("basic-auth");
var app = express();

/*var authBasic = function(req, res, next){
    
    var reponse = true; //bout
    if(reponse){
        next();
    }
    else{
        res.status(401).send();
    }
}*/


var authBasic = function (req, res, next) {
    return next();
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'biero' && user.pass === 'biero') {
    return next();
  } else {
    return unauthorized(res);
  };
};

app.put("*", authBasic);
app.post("*", authBasic);
app.delete("*", authBasic);


app.route("/biere/")
    .get(function(req, res, next){
        res.send("GET");
    })
    .put(function(req, res, next){
        res.send("PUT");
    });

app.route("/biere/:id")
    .get(function(req, res, next){
        res.send("GET : id = " + req.params.id);
    })
    .put(function(req, res, next){
    //body parser
        res.send("PUT : id = " + req.params.id);
    })
     .post(function(req, res, next){
       
        res.send("POST : id = " + req.params.id);
    })
    .delete(function(req, res, next){
        res.send("DELETE : id = " + req.params.id);
    });

app.route("/biere/:id/commentaire")
    .get(function(req, res, next){
        res.send("GET commentaire : id = " + req.params.id);
    })
    .put(function(req, res, next){
    //body parser
        res.send("PUT commentaire : id = " + req.params.id);
    });

app.route("/biere/:id/note")
    .get(function(req, res, next){
        res.send("GET note : id = " + req.params.id);
    })
    .put(function(req, res, next){
        res.send("PUT note : id = " + req.params.id);
    });



app.all("*", function(req, res){
    res.status(400).send();
});

app.listen(8080, function(){
    console.log("weeeeeeeeeeeeee");
});