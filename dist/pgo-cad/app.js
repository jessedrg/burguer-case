"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = require("express");
const upload_1 = require("./routes/upload");
const get_vol_1 = require("./routes/get-vol");
const get_stp_1 = require("./routes/get-stp");
const get_stl_1 = require("./routes/get-stl");
const get_process_1 = require("./routes/get-process");
const get_image_1 = require("./routes/get-image");
const get_bb_1 = require("./routes/get-bb");
const createDocuments_1 = require("./routes/createDocuments");
const check_part_1 = require("./routes/check-part");
const express_fileupload_1 = require("express-fileupload");
const error_handler_1 = require("./middlewares/error-handler");
const not_found_error_1 = require("./common/errors/not-found-error");
const app = (0, express_1.default)();
exports.app = app;
const bodyParser = require('body-parser');
const apiKey = process.env.apikey;
const baseUrl = process.env.baseUrl;
app.use((0, express_fileupload_1.default)({
    createParentPath: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(createDocuments_1.router);
app.use(upload_1.router);
app.use(get_vol_1.router);
app.use(get_stl_1.router);
app.use(get_stp_1.router);
app.use(get_process_1.router);
app.use(get_image_1.router);
app.use(get_bb_1.router);
app.use(check_part_1.router);
app.use(get_vol_1.router);
app.use(upload_1.router);
app.all('*', (req, res) => {
    throw new not_found_error_1.NotFoundError();
});
app.use(error_handler_1.errorHandler);
//# sourceMappingURL=app.js.map