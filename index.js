require("dotenv").config()

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
let port = process.env.PORT || 3000;
const campusRoutes = require("./routes/campus-routes")
const usersRoutes = require("./routes/users-routes")

const User = require("./models/user");

const jwt = require("jsonwebtoken")

var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use("/api", authenticateToken, campusRoutes.routes, usersRoutes.routes);

app.post("/login", async (req, res) => {

    const data = await db.collection('users').get();
    const users_firebase = [];
    if(data.empty) {
        res.status(404).send("No user found");
    }
    else {
        data.forEach(doc => {
            const user = new User(
                doc.id,
                doc.data().email,
                doc.data().password
            );
            users_firebase.push(user);
        });
    }

    const login = { 
        email: req.body.email, 
        password: req.body.password 
    }
    
    const valid_login = users_firebase.find(user_firebase =>(user_firebase.email === login.email && user_firebase.password === login.password))

    if(valid_login == null) {
        res.status(401).send("Invalid credentials")
    }
    else {
        const accessToken = jwt.sign(login.email, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken })
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) {
        return res.sendStatus(401)
    } 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

app.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
});


























/*
app.get("/", (req, res) => {
    res.send("Hello world !");
})

app.get("/students", (req, res) => {
    res.send(importData);
})

app.listen(port, () => {
    console.log(`This app is running on port http://localhost:${port}`);
})


app.get("/insert/:name/:city/:zip_code",(req,res) => {
    if(!req.params || req.params.name.trim() ==="" || req.params.city.trim() ==="" || req.params.zip_code.trim() ===""){
        res.status(400).send({
            "ERREUR": "Toutes les informations sont requises"
        })
    }
    else {
        db.collection("campus").add({
            "name": req.params.name,
            "city": req.params.city,
            "zip_code": parseInt(req.params.zip_code)
        }).then(function(docRef){
            console.log("Campus added with success " + docRef.id)
            res.send("Campus added with success " + docRef.id);
        });
    }
});

const test = db.collection('events').get();

app.get("/campus", (req, res) => {
    res.send(test.data());
})


const Campus = db.collection("campus");

app.get("/campus", async(req, res) => {
    //res.send(getMarker());
    res.send(Campus);
})


app.post("/create", async (req, res) => {
    console.log("Données du campus ", req.body);
    await Campus.add(req.body);
    res.send({ msg: "Campus créé"});
})


/*
async function getMarker() {
    const snapshot = await db.collection('campus').get()
    return snapshot.docs.map(doc => doc.data());
}
*/