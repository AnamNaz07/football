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
const post_model_1 = __importDefault(require("../models/post.model"));
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const eventValidationSchema = Joi.object({
    post: Joi.object().required(),
    from: Joi.string().required(),
});
const postController = {
    posts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = eventValidationSchema.validate(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
            }
            else {
                let postData = req.body;
                let post = new post_model_1.default(postData);
                post.save((error, post) => {
                    if (error) {
                        res.send(error.message);
                    }
                    else {
                        const token = jwt.sign({ _id: post._id }, process.env.TOKEN_SECRET);
                        res.status(200).send({
                            post: post.post,
                            from: post.from
                        });
                    }
                });
            }
        });
    },
    // get all posts
    getpost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query.data;
            console.log(user);
            let data = yield post_model_1.default.find({
                from: user.from,
            });
            console.log(data);
            //.populate("{likes : likes}");
            res.status(200).send({
                data: data,
            });
        });
    },
    getrecentposts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            console.log("recent post", user);
            let recent = [];
            const today = new Date();
            // const datetoday = today.toString()
            // const date = datetoday.slice(0,10)
            let date;
            if (today.getMonth() + 1 < 10) {
                if (today.getDate() < 10) {
                    date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
                }
                else {
                    date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
                }
            }
            else if (today.getDate() < 10) {
                date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate();
            }
            else {
                date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            }
            let data = yield post_model_1.default.find({
                from: "newsfeed",
            });
            const recentposts = data.map((val, ind) => {
                console.log(val.post.date.slice(0, 10).toString(), date.toString());
                if (val.post.date.slice(0, 10).toString() === date.toString() && user.data.email.toString() !== val.post.email.toString()) {
                    recent.push(val);
                }
            });
            res.status(200).send({
                data: recent,
            });
        });
    },
};
exports.default = postController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=post.controller.js.map