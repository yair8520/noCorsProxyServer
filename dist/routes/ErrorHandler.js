"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use((0, body_parser_1.json)());
const errorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && 'status' in res && 'body' in res) {
        res.status(400).json({ error: 'Invalid JSON data' });
    }
    else {
        next(err);
    }
};
router.use(errorHandler);
exports.default = router;
