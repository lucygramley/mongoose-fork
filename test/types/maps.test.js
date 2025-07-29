"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tsd_1 = require("tsd");
var schema = new mongoose_1.Schema({
    map1: {
        type: Map,
        of: Number
    },
    map2: {
        type: Map,
        of: { type: String, enum: ['hello, world'] }
    },
    map3: {
        type: Map,
        of: {
            type: Number,
            max: 44
        }
    }
});
var Test = (0, mongoose_1.model)('Test', schema);
var doc = new Test({});
doc.map1.set('answer', 42);
doc.map1.get('answer');
function gh10575() {
    var BaseSchema = new mongoose_1.Schema({ prop1: String, prop2: String });
    var Model1Schema = BaseSchema.clone();
    Model1Schema.add({ property1: Number, property2: Number });
    var Model2Schema = BaseSchema.clone();
    Model2Schema.add({ property3: String });
    var Model1 = (0, mongoose_1.model)('m1', Model1Schema);
    var Model2 = (0, mongoose_1.model)('m2', Model2Schema);
    var someMap = new Map();
    // Add `as any` to work around errors in strict mode
    someMap.set('A', Model1);
    someMap.set('B', Model2);
}
function gh10872() {
    var doc = new Test({});
    doc.toJSON().map1.foo;
}
function gh13755() {
    var testSchema = new mongoose_1.Schema({
        instance: {
            type: 'Map',
            of: String
        }
    });
    var TestModel = (0, mongoose_1.model)('Test', testSchema);
    var doc = new TestModel();
    (0, tsd_1.expectType)(doc.instance);
}
