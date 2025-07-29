"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsd_1 = require("tsd");
function gh14839() {
    var schemaDefinition = {
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        }
    };
    (0, tsd_1.expectType)({});
}
