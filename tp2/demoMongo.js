//installer nodemon à la maison
var express = require("express");
var basicAuth = require("basic-auth");
var cors = require("cors"); // npm install cors
var app = express();
var bodyParser = require("body-parser");
var mongo = require("mongodb"); // npm install body-parser
var mongoClient = mongo.MongoClient; // npm install body-parser

var authBasic = function(req, res, next){
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        res.status(401).send();
    };
    if (user.name === 'biero' && user.pass === 'biero') {
        return next();
    }
    else{
        res.status(401).send();
    }
}
/*
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
    }
    else {
        return unauthorized(res);
    };
};*/
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

app.route("/biere/")
    .get(function (req, res, next) {
        mongoClient.connect("mongodb://localhost:27017", function (error, db) {
            if (!error) {
                db = db.db("mesBieres"); //nom de la db
                db.collection("bieres").find().toArray(function (err, documents) {
                    if (!err) {
                        for (var i = 0; i < documents.length; i++) {
                            var total = 0;
                            var nbNotes = documents[i]["notes"].length;
                            for (var j = 0; j < nbNotes; j++) {
                                total += documents[i]["notes"][j].note;
                            }
                            var monId = documents[i]["_id"];
                            delete documents[i]["notes"];
                            delete documents[i]["commentaires"];
                            delete documents[i]["_id"];
                            var moyenne = total / nbNotes;
                            documents[i].moyenne = moyenne;
                            documents[i].nombre_note = nbNotes;
                            documents[i].id_biere = monId;
                        }
                        res.json(documents);
                    }
                    //res.status(400).send();
                })
            }
            db.close();
        });
    })
    .put(function (req, res, next) {
    
        var monId =  new mongo.ObjectId(req.params.id);
        mongoClient.connect("mongodb://localhost:27017", function (error, db) {
        if (!error) {
            db = db.db("mesBieres"); //nom de la db
            db.collection("bieres").find({_id : monId}).toArray(function (err, documents) {
                if (!err) {
                    for (var i = 0; i < documents.length; i++) {
                        var nbComm = documents[i]["commentaires"].length;
                        for (var j = 0; j < nbComm; j++) {
                            //var monComm = documents[i]["commentaires"][j].commentaire;
                            //var monCourriel = documents[i]["commentaires"][j].courriel;
                            documents[i].commentaires[j].id_biere = monId;
                        }
                    }
                    res.json(documents[0].commentaires);
                }
            })
        }
        db.close();
        });
    
    
    
    //    res.send("PUT");
    });

app.route("/biere/:id")
    .get(function (req, res, next) {
    
    
    var monId =  new mongo.ObjectId(req.params.id);
    
    
    mongoClient.connect("mongodb://localhost:27017", function (error, db) {
            if (!error) {
                db = db.db("mesBieres"); //nom de la db
                db.collection("bieres").find({_id : monId}).toArray(function (err, documents) {
                    if (!err) {
                        for (var i = 0; i < documents.length; i++) {
                            var total = 0;
                            var nbNotes = documents[i]["notes"].length;
                            for (var j = 0; j < nbNotes; j++) {
                                total += documents[i]["notes"][j].note;
                            }
                            var monId = documents[i]["_id"];
                            delete documents[i]["notes"];
                            delete documents[i]["commentaires"];
                            delete documents[i]["_id"];
                            var moyenne = total / nbNotes;
                            documents[i].moyenne = moyenne;
                            documents[i].nombre_note = nbNotes;
                            documents[i].id_biere = monId;
                        }
                        res.json(documents);
                    }
                    //res.status(400).send();
                })
            }
            db.close();
        });
    
    
    
    
    
    
    
    
    
    
    
    
     
    })
    .post(function (req, res, next) {
        res.send("POST : id = " + req.params.id);
    })
    .delete(function (req, res, next) {
    var monId =  new mongo.ObjectId(req.params.id);
    //var monId =  new mongo.ObjectId(58a5c3a7d10b6c093f08997e);
      mongoClient.connect("mongodb://localhost:27017", function (error, db) {
        if (!error) {
            db = db.db("mesBieres"); //nom de la db
            db.collection("bieres").remove({_id : monId});
            res.json("byebye");
        }
        db.close();
        });
    
    });

app.route("/biere/:id/commentaire")

    .get(function (req, res, next) {
        var monId =  new mongo.ObjectId(req.params.id);
        mongoClient.connect("mongodb://localhost:27017", function (error, db) {
        if (!error) {
            db = db.db("mesBieres"); //nom de la db
            db.collection("bieres").find({_id : monId}).toArray(function (err, documents) {
                if (!err) {
                    for (var i = 0; i < documents.length; i++) {
                        var nbComm = documents[i]["commentaires"].length;
                        for (var j = 0; j < nbComm; j++) {
                            //var monComm = documents[i]["commentaires"][j].commentaire;
                            //var monCourriel = documents[i]["commentaires"][j].courriel;
                            documents[i].commentaires[j].id_biere = monId;
                        }
                    }
                    res.json(documents[0].commentaires);
                }
            })
        }
        db.close();
        });
    })
    .put(function (req, res, next) {
        //body parser
        res.send("PUT commentaire : id = " + req.params.id);
    });
app.route("/biere/:id/note")
    .get(function (req, res, next) {
        var monId =  new mongo.ObjectId(req.params.id);
        mongoClient.connect("mongodb://localhost:27017", function (error, db) {
            if (!error) {
                db = db.db("mesBieres"); //nom de la db
                db.collection("bieres").find({_id : monId}).toArray(function (err, documents) {
                    if (!err) {
                        var total = 0;
                        var nbNotes = documents[0]["notes"].length;
                        for (var i = 0; i < nbNotes; i++) {
                            total += documents[0]["notes"][i].note;
                        }
                        delete documents[0]["notes"];
                        delete documents[0]["nom"];
                        delete documents[0]["description"];
                        delete documents[0]["brasserie"];
                        delete documents[0]["image"];
                        delete documents[0]["date_ajout"];
                        delete documents[0]["date_modif"];
                        delete documents[0]["commentaires"];
                        delete documents[0]["_id"];
                        var moyenne = total / nbNotes;
                        documents[0].moyenne = moyenne;
                        documents[0].nombre_note = nbNotes;
                        documents[0].id_biere = monId;
                        res.json(documents[0]);
                    }
                })
            }
            db.close();
        });
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