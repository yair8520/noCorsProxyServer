"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAxiosCall = exports.convertHeadersToAxiosConfig = void 0;
const axios_1 = __importDefault(require("axios"));
function convertHeadersToAxiosConfig(headers) {
    console.log("before", headers);
    const convertedHeaders = {};
    const commonHeaders = [
        "accept",
        "content-type",
        "authorization",
        "user-agent",
        "cookie",
        "cache-control",
        "origin",
        "referer",
        "content-length",
        "host",
    ];
    for (const key of Object.keys(headers)) {
        if (commonHeaders.includes(key.toLowerCase())) {
            convertedHeaders[key] = headers[key];
        }
    }
    console.log("after", convertedHeaders);
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
