"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require("dotenv");
const port = process.env.port || 4001;
app_1.app.listen(port, () => {
    console.log(`server listeing on port: ${port}`);
});
//# sourceMappingURL=index.js.map