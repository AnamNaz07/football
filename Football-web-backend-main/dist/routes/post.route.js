"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importDefault(require("../controller/post.controller"));
const postRouter = express_1.default.Router();
postRouter.post("/posts", post_controller_1.default.posts);
postRouter.get("/getpost", post_controller_1.default.getpost);
postRouter.get("/getrecentposts", post_controller_1.default.getrecentposts);
exports.default = postRouter;
//# sourceMappingURL=post.route.js.map