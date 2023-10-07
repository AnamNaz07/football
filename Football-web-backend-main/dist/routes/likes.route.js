"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likes_controller_1 = __importDefault(require("../controller/likes.controller"));
const likesRouter = express_1.default.Router();
likesRouter.post("/addLikes", likes_controller_1.default.addLikes);
likesRouter.delete("/removeLikes", likes_controller_1.default.removeLikes);
likesRouter.get("/getLikes", likes_controller_1.default.getLikes);
likesRouter.get("/personComment", likes_controller_1.default.personComment);
exports.default = likesRouter;
//# sourceMappingURL=likes.route.js.map