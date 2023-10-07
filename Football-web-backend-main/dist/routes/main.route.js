"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_route_1 = __importDefault(require("./admin.route"));
const coach_route_1 = __importDefault(require("./coach.route"));
const player_route_1 = __importDefault(require("./player.route"));
const calender_route_1 = __importDefault(require("./calender.route"));
const groups_route_1 = __importDefault(require("./groups.route"));
const clubhub_route_1 = __importDefault(require("./clubhub.route"));
const post_route_1 = __importDefault(require("./post.route"));
const shop_route_1 = __importDefault(require("./shop.route"));
const chat_route_1 = __importDefault(require("./chat.route"));
const likes_route_1 = __importDefault(require("./likes.route"));
const comment_route_1 = __importDefault(require("./comment.route"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("hello from server");
});
router.use("/admin", admin_route_1.default);
router.use("/player", player_route_1.default);
router.use("/event", calender_route_1.default);
router.use("/groups", groups_route_1.default);
router.use("/clubhub", clubhub_route_1.default);
router.use("/post", post_route_1.default);
router.use("/shop", shop_route_1.default);
router.use("/coach", coach_route_1.default);
router.use("/chat", chat_route_1.default);
router.use("/likes", likes_route_1.default);
router.use("/comment", comment_route_1.default);
exports.default = router;
//# sourceMappingURL=main.route.js.map