"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    stars: { type: Number, required: true }
});
schema.query.byName = function (name) {
    return this.find({ name: name });
};
// 2nd param to `model()` is the Model class to return.
var ProjectModel = (0, mongoose_1.model)('Project', schema);
ProjectModel.find().where('stars').gt(1000).byName('mongoose').exec();
