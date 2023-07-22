"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../helpers/axios");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.all('/:url(*)', (req, res, next) => {
    const { method, body, headers } = req;
    console.log("aoll", body);
    const targetUrl = req.url.slice(1);
    if (targetUrl === 'favicon.ico') {
        res.sendStatus(204);
        return;
    }
    const axiosConfig = {
        method,
        url: targetUrl,
        data: body,
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
