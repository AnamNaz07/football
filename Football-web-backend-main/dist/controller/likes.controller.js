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
const likes_model_1 = __importDefault(require("../models/likes.model"));
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const eventValidationSchema = Joi.object({
    post: Joi.object().required(),
});
const likesController = {
    addLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let likeData = req.body;
                let like = new likes_model_1.default(likeData);
                like.save((error, like) => {
                    if (error) {
                        res.send(error.message);
                    }
                    else {
                        const token = jwt.sign({ _id: like._id }, process.env.TOKEN_SECRET);
                        res.status(200).send({
                            type: like.type,
                            refOfPost: like.refOfPost,
                            UserRef: like.UserRef
                        });
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    removeLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let likeData = req.query.data;
                const result = yield likes_model_1.default.deleteOne({ type: likeData.type,
                    refOfPost: likeData.refOfPost,
                    UserRef: likeData.UserRef });
                res.status(200).send({
                    data: result
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    getLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let likeData = req.query;
                const foundlikes = yield likes_model_1.default.find({
                    type: likeData.data.type,
                    refOfPost: likeData.data.refOfPost,
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
    personComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let likeData = req.query;
                const found = yield likes_model_1.default.findOne({
                    type: likeData.data.type,
                    UserRef: likeData.data.UserRef,
                    refOfPost: likeData.data.refOfPost,
                });
                if (found) {
                    let data = true;
                    res.status(200).send({
                        data: data
                    });
                }
                else {
                    let data = false;
                    res.status(200).send({
                        data: data
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
exports.default = likesController;
//# sourceMappingURL=likes.controller.js.map