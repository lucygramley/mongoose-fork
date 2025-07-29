"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tsd_1 = require("tsd");
var data = { username: 'val', pwd: { $ne: null } };
(0, tsd_1.expectType)((0, mongoose_1.sanitizeFilter)(data));
