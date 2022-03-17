'use strict';

var admin = require("firebase-admin");

const Campus = require("../models/campus");
const firestore = admin.firestore();

const addCampus = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection("campus").doc().set(data);
        res.send("Campus ajouté");
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const getAllCampus = async (req, res, next) => {
    try {
        const campus = await firestore.collection("campus");
        const data = await campus.get();
        const campusArray = [];
        if(data.empty) {
            res.status(404).send("No campus found");
        }
        else {
            data.forEach(doc => {
                const campus = new Campus(
                    doc.id,
                    doc.data().name,
                    doc.data().city,
                    doc.data().zip_code
                );
                campusArray.push(campus);
            });
            res.send(campusArray);
        }
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const getCampus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const campus = await firestore.collection("campus").doc(id);
        const data = await campus.get();
        if(!data.exists) {
            res.status(404).send("No campus found for the given id");
        } 
        else {
            res.send(data.data());
        }
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const getCampusName = async (req, res, next) => {
    try {
        const id = req.params.id;
        const campus = await firestore.collection("campus").doc(id);
        const data = await campus.get();
        if(!data.exists) {
            res.status(404).send("No campus found for the given id");
        } 
        else {
            res.send(data.data().name);
        }
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const updateCampus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const campus = await firestore.collection("campus").doc(id);
        const data = req.body;
        await campus.update(data);
        res.send("Campus modified");
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const deleteCampus = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection("campus").doc(id).delete();
        res.send("Campus deleted");
    } catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addCampus,
    getAllCampus,
    getCampus,
    updateCampus,
    deleteCampus,
    getCampusName
}