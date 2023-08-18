"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../helpers/constants");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send(constants_1.description);
});
exports.default = router;
