//installer nodemon à la maison
var express = require("express");
var auth = require("basic-auth");
var cors = require("cors"); // npm install cors
var app = express();
var bodyParser = require("body-parser");
var mongo = require("mongodb"); // npm install body-parser
var mongoClient = mongo.MongoClient; // npm install body-parser
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
    //return next();

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
    }
    else {
        return unauthorized(res);
    };
};
//{nom:"", brasserie:"", notes:[{courriel: "", note:int}, {courriel: "", note:int}], commenataire:[{courriel: "", note:int}, {courriel: "", note:int}]}

app.use(cors());
app.use(bodyParser.json());
app.put("*", authBasic);
app.post("*", authBasic);
app.delete("*", authBasic);
/*
db.collection.find()
db.collection.insert()
db.collection.update()
db.collection.remove()
*/

app.route("/biere/").get(function (req, res, next) {
    mongoClient.connect("mongodb://localhost:27017", function (error, db) {
        if (!error) {
            db = db.db("mesBieres"); //nom de la db
            db.collection("bieres").find().toArray(function (err, documents) {
                if (!err) {
                    for (var i = 0; i < documents.length; i++) {
                       // documents[i].allo = "allo" + i;
                    }
                    res.json(documents);
                }
            })
        }
        db.close();
    });
    //    res.send("GET");
    })
    .put(function (req, res, next) {
        res.send("PUT");
    });

app.route("/biere/:id")
    .get(function (req, res, next) {
        var monId =  new mongo.ObjectId(req.params.id);
       // var maBiere = new Array();
       // var monId =  req.params.id;
        mongoClient.connect("mongodb://localhost:27017", function (error, db) {
            if (!error) {
                db = db.db("mesBieres"); //nom de la db
                db.collection("bieres").find({_id : monId}).toArray(function (err, documents) {
               // db.collection("bieres").find({brasserie:"Castor"}).toArray(function (err, documents) {
                    if (!err) {
                        var total = 0;
                        var nbNotes = documents[0]["notes"].length;
                        for (var i = 0; i < nbNotes; i++) {
                            total += documents[0]["notes"][i].note;
                        }
                        var moyenne = total / nbNotes;
                        documents[0].moyenne = moyenne;
                        documents[0].nombre_note = nbNotes;
                        documents[0].id_biere = monId;
                       
                       res.json(documents);
                       // res.json(documents[0]["notes"][0]);
                    }
                })
            }
            db.close();
        });
        //res.send("GET : id = " + req.params.id);
    })
    .post(function (req, res, next) {
        res.send("POST : id = " + req.params.id);
    })
    .delete(function (req, res, next) {
    
        res.send("DELETE : id = " + req.params.id);
    });

app.route("/biere/:id/commentaire")
    .get(function (req, res, next) {
        res.send("GET commentaire : id = " + req.params.id);
    })
    .put(function (req, res, next) {
        //body parser
        res.send("PUT commentaire : id = " + req.params.id);
    });
app.route("/biere/:id/note")
    .get(function (req, res, next) {
        res.send("GET note : id = " + req.params.id);
    })
    .put(function (req, res, next) {
        res.send("PUT note : id = " + req.params.id);
    });

app.all("*", function (req, res) {
    res.status(400).send();
});

app.listen(8080, function () {
    console.log("weeeeeeeeeeeeee");
});