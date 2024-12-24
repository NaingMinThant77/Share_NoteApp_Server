const { model, Schema } = require("mongoose");

const noteSchema = new Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 100 },
    content: { type: String, required: true, minLength: 5 },
    creater: { type: String, default: "Anonymous" }
}, { timestamps: true })

const noteModel = model("note", noteSchema)

module.exports = noteModel;