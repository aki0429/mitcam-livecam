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
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.Router)();
const cams_1 = require("../../constants/cams");
app.get('/hitachi/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id.toString();
    const finder = cams_1.cams.find((v) => v === +id);
    if (typeof finder === "undefined")
        return res.status(404).json({ "status": "notfound" });
    try {
        const file = fs_1.default.readFileSync(`${__dirname}/../camfetcher/cache/hitachi${id}.jpg`);
        return res.status(200).type("jpg").send(file);
    }
    catch (err) {
        return res.status(404);
    }
}));
exports.default = app;
//# sourceMappingURL=staticimage.js.map