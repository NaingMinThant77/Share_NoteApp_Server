const { validationResult } = require("express-validator")

// models
const Note = require("../models/note")

exports.createNote = (req, res, next) => {
    const { title, content } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ // 400 - validation fail
            message: "Validation failed.",
            errorMessages: errors.array(),
        })
    }

    Note.create({ title, content }).then(_ => {
        res.status(201).json({
            message: "Note Created"
        })
    }).catch(err => {
        console.log(err)
        res.status(404).json({
            message: "Something went wrong"
        })
    })
}

exports.getNotes = (req, res, next) => {
    Note.find().sort({ createdAt: -1 }).then(notes => {
        res.status(200).json(notes)
    }).catch(err => {
        console.log(err)
        res.status(404).json({
            message: "Something went wrong"
        })
    })
}

exports.getNote = (req, res, next) => {
    const { id } = req.params;
    Note.findById(id).then(note => {
        res.status(200).json(note);
    }).catch(err => {
        console.log(err)
        res.status(404).json({
            message: "Something went wrong"
        })
    })
}

exports.deleteNote = (req, res, next) => {
    const { id } = req.params;
    Note.findByIdAndDelete(id).then(_ => {
        res.status(204).json({ // 204 - No content
            message: "Note deleted. "
        })
    }).catch(err => {
        console.log(err)
        res.status(404).json({
            message: "Something went wrong"
        })
    })
}

exports.getOldNote = (req, res, next) => {
    const { id } = req.params;
    Note.findById(id).then(note => {
        res.status(200).json(note);
    }).catch(err => {
        console.log(err)
        res.status(404).json({
            message: "Something went wrong"
        })
    })
}

exports.updateNote = (req, res, next) => {
    const { note_id, title, content } = req.body;
    Note.findById(note_id).then(note => {
        note.title = title;
        note.content = content;
        return note.save()
    }).then(_ => {
        res.status(200).json({
            message: "Note Updated!"
        })
    }).catch(err => {
        console.log(err)
        res.status(404).json({
            message: "Something went wrong"
        })
    })
}