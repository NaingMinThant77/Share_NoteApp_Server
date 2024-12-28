const { validationResult } = require("express-validator")
const { unlink } = require("../utils/unlink")

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

    const cover_image = req.file;

    Note.create({ title, content, cover_image: cover_image ? cover_image.path : "" }).then(_ => {
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
    const currentPage = req.query.page || 1;
    const parPage = 6;
    let totalNotes;
    let totalPages

    Note.find().countDocuments().then(counts => {
        totalNotes = counts;
        totalPages = Math.ceil(totalNotes / parPage)
        return Note.find().sort({ createdAt: -1 })
            .skip((currentPage - 1) * parPage).limit(parPage)
    }).then(notes => {
        res.status(200).json({ notes, totalNotes, totalPages })
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
    Note.findById(id).then((note) => {
        if (note.cover_image) {
            unlink(note.cover_image);
        }
        Note.findByIdAndDelete(id).then(_ => {
            res.status(204).json({ // 204 - No content
                message: "Note deleted. "
            })
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

    const cover_image = req.file;

    Note.findById(note_id).then(note => {
        note.title = title;
        note.content = content;
        if (cover_image) {
            if (note.cover_image) {
                unlink(note.cover_image);
            }
            note.cover_image = cover_image.path;
        }
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