const sendResponse = require('../helpers/sendRespose.js');
const Note = require("../models/note");

// create a new note
const createNote = async (req, res) => {
    console.log('create note')
    try {
        const note = new Note({
            title: req.body.title,
            text: req.body.text,
            color: req.body.color,
            user: req.body.user,
        });
        note.save().then(data => {
            sendResponse(res, 200, data);
        }).catch(err => {
            sendResponse(res, 500, err);
        });
    } catch (err) {
        sendResponse(res, 500, err);
    }
}

//get all notes
const getNotes = async (req, res) => {
    try{
        Note.find().then(data => {
            sendResponse(res, 200, data);
        }).catch(err => {
            sendResponse(res, 500, err);
        });
    }
    catch(err){
        sendResponse(res, 500, err);
    }
}

// get a note by id
const getNote = async (req, res) => {
    try{
        Note.findById(req.params.id).then(data => {
            sendResponse(res, 200, data);
        }).catch(err => {
            sendResponse(res, 500, err);
        });
    }
    catch(err){
        sendResponse(res, 500, err);
    }
}

// update a note by id
const updateNote = async (req, res) => {
    try{
        Note.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            text: req.body.text,
            color: req.body.color,
            user: req.body.user,
        }, {new: true}).then(data => {
            sendResponse(res, 200, data);
        }).catch(err => {
            sendResponse(res, 500, err);
        });
    }
    catch(err){
        sendResponse(res, 500, err);
    }
}

// delete a note by id
const deleteNote = async (req, res) => {
    console.log('delete note')
    try{
        Note.findByIdAndDelete(req.params.id).then(data => {
            sendResponse(res, 200, data);
        }).catch(err => {
            sendResponse(res, 500, err);
        });
    }
    catch(err){
        sendResponse(res, 500, err);
    }
}

module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
}