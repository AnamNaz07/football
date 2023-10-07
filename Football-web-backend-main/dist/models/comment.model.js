"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    UserRef: {
        type: String,
        required: true
    },
    Comment: {
        type: String,
        required: true
    },
    refOfPost: {
        type: mongoose.Schema.ObjectId,
        // ref : "newsFeed",
        required: true
    },
});
exports.default = mongoose.model("comment", CommentSchema, "comments");
//# sourceMappingURL=comment.model.js.map