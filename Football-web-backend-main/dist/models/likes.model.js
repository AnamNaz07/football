"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const likesSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    UserRef: {
        type: String,
        required: true
    },
    refOfPost: {
        type: mongoose.Schema.ObjectId,
        // ref : "newsFeed",
        required: true
    },
});
exports.default = mongoose.model("like", likesSchema, "likes");
//# sourceMappingURL=likes.model.js.map