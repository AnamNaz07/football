"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
    post: {
        type: Object,
        required: true
    },
    from: {
        type: String,
        required: true
    }
    // comments : {
    //     type : Array,
    //   },
    // likes : {
    //     type : Array
    // }
});
//Virtual populate
// postSchema.virtual("likes", {
//     ref: "likes", // Name of the collection
//     foreignField: "refOfPost", //review ma productid ko kis field sa represent kiya ha
//     localField: "_id", //or product ma product id ka kasa represent kiya ha
//   });
exports.default = mongoose.model("post", postSchema, "posts");
//# sourceMappingURL=post.model.js.map