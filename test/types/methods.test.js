"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TestSchema = new mongoose_1.Schema({
    foo: { type: String, required: true }
});
TestSchema.methods.getAnswer = function () {
    console.log(this.foo.trim());
    return 42;
};
var Test = mongoose_1.connection.model('Test', TestSchema);
Test.create({ foo: 'test' });
var doc = new Test({ foo: 'test' });
Math.floor(doc.getAnswer());
