"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var tsd_1 = require("tsd");
var bson = require("bson");
function gh12537() {
    var schema = new mongoose.Schema({ test: String });
    var model = mongoose.model('Test', schema);
    var doc = new model({});
    var v = new bson.ObjectId('somehex');
    (0, tsd_1.expectType)(v._id.toHexString());
    doc._id = new bson.ObjectId('somehex');
}
gh12537();
