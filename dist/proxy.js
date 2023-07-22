"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const homeRoutes_1 = __importDefault(require("./routes/homeRoutes"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const allowedOrigins = ['https://yair8520.github.io', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
app.use('/', homeRoutes_1.default);
app.use('/api', apiRoutes_1.default);
app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
