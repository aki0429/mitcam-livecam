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
exports.CamFetcher = void 0;
const fs_1 = __importDefault(require("fs"));
class CamFetcher {
    constructor(place, camIds) {
        this.camId = camIds;
        this.place = place;
        this.intervalProcess = setTimeout(() => { });
        this.JobEnd = true;
    }
    /**
     * The cron job start.
     *
     * fetch the image about 10 min.
     */
    job() {
        console.log(`[CamFetcher] \u001b[32m✔\u001b[37m CamId${this.camId.join(',')}のJobは正常に開始されました。`);
        this.fetchPicture();
        this.intervalProcess = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            console.log("Is job ended : " + this.JobEnd);
            new Date().getMinutes() % 10 === 0 ? (!this.JobEnd && (yield this.fetchPicture())) : this.JobEnd = false;
        }), 1010 * 10);
    }
    fetchPicture() {
        return __awaiter(this, void 0, void 0, function* () {
            this.camId.map((id) => __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(`https://www.ktr.mlit.go.jp/${this.place}/cctv/cameraimage/cam${id}_640.jpg`);
                if (!response.ok)
                    throw new Error(`CameraHTTPError : Fetch failed. ${response.status} ${response.statusText} - ${response.url}`);
                const ImageBuff = yield response.arrayBuffer();
                this.savePicture(ImageBuff, id);
                return Buffer.from(ImageBuff);
            }));
            this.JobEnd = true;
            console.log(`[CamFetcher] \u001b[32m✔\u001b[37m 十分おきの画像取得に成功しました。 合計枚数 : ${this.camId.length}`);
        });
    }
    savePicture(imageBuff, id) {
        const Image = Buffer.from(imageBuff);
        const stream = fs_1.default.createWriteStream(`${__dirname}/cache/${this.place}.${id}.jpg`);
        stream.write(Image, "binary");
        stream.end();
        stream.on('finish', () => __awaiter(this, void 0, void 0, function* () {
            // await this.saveLabelDatabase(`${this.place}.${id}.jpg`)
        }));
    }
}
exports.CamFetcher = CamFetcher;
//# sourceMappingURL=index.js.map