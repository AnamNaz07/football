"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_model_1 = __importDefault(require("../models/comment.model"));
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const eventValidationSchema = Joi.object({
    post: Joi.object().required(),
});
const commentController = {
    addComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let commentData = req.body;
                console.log("add comment", commentData);
                let comment = new comment_model_1.default(commentData);
                comment.save((error, comment) => {
                    if (error) {
                        res.send(error.message);
                    }
                    else {
                        const token = jwt.sign({ _id: comment._id }, process.env.TOKEN_SECRET);
                        res.status(200).send({
                            type: comment.type,
                            refOfPost: comment.refOfPost,
                            UserRef: comment.UserRef,
                            Comment: comment.Comment
                        });
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    getComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let commentData = req.query;
                const foundlikes = yield comment_model_1.default.find({
                    type: commentData.data.type,
                    refOfPost: commentData.data.refOfPost,
                });
                const result = foundlikes.length;
                //console.log(req.query, result);
                res.status(200).send({
                    data: result
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
};
exports.default = commentController;
//# sourceMappingURL=comment.controller.js.map