"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../helpers/axios");
const express_1 = require("express");
const url_1 = require("../helpers/url");
const router = (0, express_1.Router)();
router.all('/:url(*)', url_1.validateUrlMiddleware, (req, res) => {
    const { method, body, headers } = req;
    const targetUrl = req.url.slice(1);
    const axiosConfig = {
        method,
        url: targetUrl,
        data: body,
        timeout: 12000,
        headers: (0, axios_1.convertHeadersToAxiosConfig)(headers),
    };
    (0, axios_1.makeAxiosCall)(axiosConfig)
        .then((response) => {
        res.status(response.status).json(response.data);
    })
        .catch((error) => {
        return res.send(error);
    });
});
exports.default = router;
