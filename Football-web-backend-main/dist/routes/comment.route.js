"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = __importDefault(require("../controller/comment.controller"));
const commentRouter = express_1.default.Router();
commentRouter.post("/addcomment", comment_controller_1.default.addComment);
// commentRouter.delete("/removecomment", commentController.removecomment);
commentRouter.get("/getcomment", comment_controller_1.default.getComment);
// commentRouter.get("/personComment", commentController.personComment);
exports.default = commentRouter;
//# sourceMappingURL=comment.route.js.map