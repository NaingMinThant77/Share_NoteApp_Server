const { model, Schema } = require("mongoose");

const noteSchema = new Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 100 },
    content: { type: String, required: true, minLength: 5 },
    cover_image: { type: String },
    creater: { type: Schema.Types.ObjectId, ref: "user", required: true }
}, { timestamps: true })

const noteModel = model("note", noteSchema)

module.exports = noteModel;