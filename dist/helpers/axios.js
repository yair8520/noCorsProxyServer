"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAxiosCall = exports.convertHeadersToAxiosConfig = void 0;
const axios_1 = __importDefault(require("axios"));
function convertHeadersToAxiosConfig(headers) {
    console.log(headers);
    const convertedHeaders = {};
    const commonHeaders = [
        "Accept",
        "Content-Type",
        "authorization",
        "User-Agent",
        "Cookie",
        "Cache-Control",
        "Origin",
        "Referer",
        "Content-Length",
        "Host",
    ];
    for (const key of Object.keys(headers)) {
        if (commonHeaders.includes(key.toLowerCase())) {
            convertedHeaders[key] = headers[key];
        }
    }
    console.log(headers);
    return convertedHeaders;
}
exports.convertHeadersToAxiosConfig = convertHeadersToAxiosConfig;
const makeAxiosCall = (axiosConfig) => {
    return new Promise((resolve, reject) => {
        (0, axios_1.default)(axiosConfig)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};
exports.makeAxiosCall = makeAxiosCall;
