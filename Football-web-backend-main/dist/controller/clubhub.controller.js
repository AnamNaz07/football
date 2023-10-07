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
const clubhub_model_1 = __importDefault(require("../models/clubhub.model"));
const mongoose = require('mongoose');
//let User = require('../models/User');
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const registerValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    isFolder: Joi.boolean()
});
const clubhubController = {
    createFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = registerValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let clubhubData = req.body;
                let clubhubb = new clubhub_model_1.default(clubhubData);
                const nameExists = yield clubhub_model_1.default.findOne({
                    name: clubhubb.name,
                    email: clubhubb.email
                });
                if (nameExists) {
                    console.log("already exisits");
                    res.status(400).send("Folder already exists");
                }
                else {
                    clubhubb.save((error, folder) => {
                        if (error) {
                            res.send(error.message);
                        }
                        else {
                            const token = jwt.sign({ _id: folder._id }, process.env.TOKEN_SECRET);
                            res.status(200).send({
                                authToken: token,
                                name: folder.name,
                                email: folder.email,
                                isFolder: folder.isFolder,
                                _id: folder._id,
                            });
                        }
                    });
                }
            }
        });
    },
    // upload file
    //router.post('/user-profile', upload.single('profileImg'), 
    uploadFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const file = req.file.filename;
            let size = req.file.size;
            let fileSiseInMb;
            const date = new Date();
            console.log("file uploaded", id, file, size);
            if (id.toString() === "false") {
                res.status(400).send("Please Select the Folder");
            }
            else if (!file) {
                res.status(400).send("File not selected");
            }
            else {
                if (size < 1048576) {
                    fileSiseInMb = (Math.floor(size / 1024)) + "Kb";
                }
                else {
                    fileSiseInMb = (Math.floor(size / (1024 * 1024))) + "Mb";
                }
                const nameExists = yield clubhub_model_1.default.find({
                    _id: id,
                    files: {
                        $elemMatch: {
                            name: file
                        }
                    }
                });
                //if (!nameExists)
                {
                    const newFile = {
                        name: file,
                        date: date,
                        size: fileSiseInMb
                    };
                    const upload = yield clubhub_model_1.default.findOneAndUpdate({ _id: id }, { $push: {
                            files: newFile
                        } });
                    res.status(200).send({
                        data: upload.files,
                    });
                }
                //else{
                //     res.status(400).send("File with same name Already Exists");
                //   }
            }
        });
    },
    getFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let data = yield clubhub_model_1.default.find({
                _id: id,
            });
            res.status(200).send({
                data: data[0].files,
            });
        });
    },
    getFolders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.params.email;
            let data = yield clubhub_model_1.default.find({
                email: email,
            });
            res.status(200).send({
                data: data,
            });
        });
    },
};
exports.default = clubhubController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=clubhub.controller.js.map