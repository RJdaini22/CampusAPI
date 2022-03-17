'use strict';

var admin = require("firebase-admin");

const User = require("../models/user");
const firestore = admin.firestore();

const getUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection("users");
        const data = await users.get();
        const usersArray = [];
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
                usersArray.push(user);
            });
            res.send(usersArray);
        }
    } catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUsers
}