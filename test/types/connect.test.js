"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tsd_1 = require("tsd");
// Promise
(0, tsd_1.expectType)((0, mongoose_1.connect)('mongodb://127.0.0.1:27017/test'));
(0, tsd_1.expectType)((0, mongoose_1.connect)('mongodb://127.0.0.1:27017/test', {}));
(0, tsd_1.expectType)((0, mongoose_1.connect)('mongodb://127.0.0.1:27017/test', { bufferCommands: true }));
