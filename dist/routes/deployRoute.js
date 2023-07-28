"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const router = express_1.default.Router();
router.post('/webhook', (req, res, next) => {
    (0, child_process_1.exec)('sh ../../deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing update script: ${error.message}`);
            res.status(500).send('Update failed');
            return;
        }
        console.log(`Update script output: ${stdout}`);
        res.status(200).send('Webhook received successfully');
    });
});
exports.default = router;