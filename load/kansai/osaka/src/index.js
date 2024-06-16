"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cams_1 = require("../constants/cams");
const app = (0, express_1.default)();
app.listen(8080, () => {
    new camfetcher_1.CamFetcher("osaka", cams_1.cams).job();
    console.log('[CamBackend] Listening at port : 8080');
});
const camfetcher_1 = require("./camfetcher");
const staticimage_1 = __importDefault(require("./routes/staticimage"));
app.use("/static", staticimage_1.default);
//# sourceMappingURL=index.js.map