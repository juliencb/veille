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

//{nom:"", brasserie:"", notes:[{courriel: "", note:int}, {courriel: "", note:int}], commenataire:[{courriel: "", note:int}, {courriel: "", note:int}]}

app.use(cors());
app.use(bodyParser.json());
app.put("*", authBasic);
app.post("*", authBasic);
app.delete("*", authBasic);


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
        mongoClient.connect("mongodb://localhost:27017", function (error, db) {
            if (!error) {
               var maBiere= req.body;
                var d = new Date();
                var n = d.getTime();
                db = db.db("mesBieres"); //nom de la db
                maBiere.date_ajout = n;
                maBiere.date_modif = n;
                maBiere.commentaires =[];
                maBiere.notes =[];
                db.collection("bieres").insert(maBiere);
                 /*db.collection("bieres").insert(maBiere, function(err, res){
                    res.json("yep");
                })*/
            }
            db.close();
        });
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
                })
            }
            db.close();
        });
    })
    .post(function (req, res, next) {
    
        var monId =  new mongo.ObjectId(req.params.id);
        var maBiere = req.body;
    
    
    
    
    })
    .delete(function (req, res, next) {
        var monId =  new mongo.ObjectId(req.params.id);
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
                    
                        var nbComm = documents[0]["commentaires"].length;
                        for (var j = 0; j < nbComm; j++) {
                            documents[0].commentaires[j].id_biere = monId;
                        }
                   
                    res.json(documents[0].commentaires);
                }
            })
        }
        db.close();
        });
    })
    .put(function (req, res, next) {
        var monId =  new mongo.ObjectId(req.params.id);
        var monCommentaire= req.body;
        var d = new Date();
        var n = d.getTime();
        monCommentaire.date_ajout = n;
        mongoClient.connect("mongodb://localhost:27017", function (error, db) {
            if (!error) {
                db = db.db("mesBieres"); //nom de la db
                db.collection("bieres").updateOne({_id:monId}, {$addToSet:{commentaires: monCommentaire}});           
            }
            db.close();
        });
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
    
        var maNote= req.body;
        var monCourriel = maNote.courriel;
        
    
     /*
        mongoClient.connect("mongodb://localhost:27017", function (error, db) {
            if (!error) {
                db = db.db("mesBieres"); //nom de la db
                db.collection("bieres").find({_id : maNote.id_biere}).toArray(function (err, documents) {
                    if (!err) {
                        var nbComm = documents[0]["notes"].length;
                        for (var i = 0; i < nbComm; i++) {
                            if(documents[0].notes[i].courriel === monCourriel){
                                documents[0].notes[i].note = maNote.note;
                            }
                        }
                       
                        db.collection("bieres").updateOne({_id:monId}, {$addToSet:{notes: documents[0].notes}}); 
                        
                    }
                })
            }
        });*/
    
    /*
        mongoClient.connect("mongodb://localhost:27017", function (error, db) {
            if (!error) {
                db = db.db("mesBieres"); //nom de la db
                db.collection("bieres").updateOne({_id:monId}, {$addToSet:{note: maNote}});           
            }
            db.close();
        });*/
    });

app.route("/test/")

    .get(function (req, res, next) {
        var monId =  new mongo.ObjectId(req.params.id);
        mongoClient.connect("mongodb://localhost:27017", function (error, db) {
        if (!error) {
            db = db.db("mesBieres"); //nom de la db
            db.collection("bieres").find().toArray(function (err, documents) {
             
                    res.json(documents);
            })
        }
        db.close();
        });
    })
  

app.all("*", function (req, res) {
    res.status(400).send();
});

app.listen(8080, function () {
    console.log("weeeeeeeeeeeeee");
});







/*
[{"_id":"58a6fdc482be0305ff59aed7","nom":"IPA du diable","brasserie":"Ma brasserie","description":"Une bière de grande qualité avec beaucoup d'amertume","image":"","date_ajout":1487338948821,"date_modif":1487338948821,"commentaires":[],"notes":[]},{"_id":"58a6fe3c82be0305ff59aed9","nom":"IPA du diable","brasserie":"Ma brasserie","description":"Une bière de grande qualité avec beaucoup d'amertume","image":"","date_ajout":1487339068919,"date_modif":1487339068919,"commentaires":[],"notes":[]},{"_id":"58a70135eea7ba0698510798","nom":"IPA du diable","brasserie":"Ma brasserie","description":"Une bière de grande qualité avec beaucoup d'amertume","image":"","date_ajout":1487339829230,"date_modif":1487339829230,"commentaires":[],"notes":[]},{"_id":"58a7016a08d49906a3ceffac","nom":"IPA du diable","brasserie":"Ma brasserie","description":"Une bière de grande qualité avec beaucoup d'amertume","image":"","date_ajout":1487339882746,"date_modif":1487339882746,"commentaires":[],"notes":[]},{"_id":"58a6fd83034cca60d1a64d09","nom":"blue ribbon","brasserie":"pabst","description":"boere de hipster","image":"eurk.jpg","date_ajout":"today","date_modif":"today","notes":{"courriel":"string","commentaire":"string","date_ajout":1487339677167},"commentaires":[{"courriel":"juliencb@hotmail.com","commentaire":"eurk","date_ajout":"today"},{"courriel":"simon@gmail.com","commentaire":"degueux","date_ajout":"today"},{"courriel":"string","commentaire":"string","date_ajout":1487340873130},{"courriel":"string","commentaire":"string","date_ajout":1487340993208}]}]
*/