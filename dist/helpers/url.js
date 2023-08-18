"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrlMiddleware = exports.isValidUrl = void 0;
const isValidUrl = (urlString) => {
    try {
        new URL(urlString);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidUrl = isValidUrl;
function validateUrlMiddleware(req, res, next) {
    const targetUrl = req.params.url;
    if (!targetUrl || targetUrl === 'favicon.ico') {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    if (!(0, exports.isValidUrl)(targetUrl)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }
    next();
}
exports.validateUrlMiddleware = validateUrlMiddleware;
