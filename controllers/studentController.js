'use strict'

const firebase = require('../db');
const Student = require('../models/students');
const firestore = firebase.firestore();

const addStudent = async(req, res, next) => {
    try{
        const data = req.body;
        console.log(`DATA from req.body = ${data}`);
        await firestore.collection('students').doc().set(data);
        res.send('Record saved successfully');
    }catch(error){
        res.status(400).send(error.message);
    }
}

const getAllStudents = async(req, res, next) => {
    try {
        const students = await firestore.collection('students');
        const data = await students.get();
        const studentsArray = [];
        if(data.empty){
            res.status(404).send("No record found");
        }else{
            data.forEach(doc => {
                const student = new Student(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName
                );
                studentsArray.push(student);
            });
            res.send(studentsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStudent = async(req, res, next) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if(!data.exists){
            res.status(404).send("Student with given ID not found");           
        }else{
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStudent = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data =req.body;
        const student = await firestore.collection('students').doc(id);
        await student.update(data);
        res.send("Student record updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async(req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.send("Record deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
}