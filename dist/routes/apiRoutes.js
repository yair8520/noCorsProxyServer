"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = require("../helpers/axios");
const router = (0, express_1.Router)();
router.all('/:url(*)', (req, res) => {
    const { method, body, headers } = req;
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
        if (error.status && error.data) {
            res.status(error.status).json(error.data);
        }
        else {
            res.status(500).json({ error: 'Proxy Error' });
        }
    });
});
exports.default = router;
