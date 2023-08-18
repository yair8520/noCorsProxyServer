"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const homeRoutes_1 = __importDefault(require("./routes/homeRoutes"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const deployRoute_1 = __importDefault(require("./routes/deployRoute"));
const body_parser_1 = require("body-parser");
const cors_2 = require("./helpers/cors");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)(cors_2.corsOptions));
app.use((0, body_parser_1.json)());
app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
        const formattedError = {
            statusText: 'Bad Request',
            headers: {},
            data: {
                message: 'Invalid JSON data'
            }
        };
        return res.status(400).json(formattedError);
    }
    next();
});
app.use('/', homeRoutes_1.default);
app.use('/api', apiRoutes_1.default);
app.use('/webhook', deployRoute_1.default);
app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
