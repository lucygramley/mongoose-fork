"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var tsd_1 = require("tsd");
Object.values(mongoose.models).forEach(function (model) {
    model.modelName;
    model.findOne();
});
mongoose.pluralize(null);
mongoose.overwriteMiddlewareResult('foo');
var schema = new mongoose.Schema({ name: String });
schema.pre('save', function () {
    return mongoose.skipMiddlewareFunction('foobar');
});
schema.post('save', function () {
    return mongoose.overwriteMiddlewareResult('foobar');
});
function gh10746() {
    var testVar;
    testVar = 'A string';
    testVar = 'B string';
    (0, tsd_1.expectType)(testVar);
}
function gh10957() {
    var obj = { name: 'foo' };
    (0, tsd_1.expectType)(mongoose.trusted(obj));
}
function connectionStates() {
    var m = new mongoose.Mongoose();
    m.STATES.connected;
    m.ConnectionStates.connected;
    m.connect('mongodb://127.0.0.1:27017/test').then(function () {
        console.log('Connected!');
    });
    m.syncIndexes().then(function () { return console.log('Synced indexes!'); });
    m.Promise = Promise;
}
function gh11478() {
    mongoose.set('allowDiskUse', false);
    mongoose.set('allowDiskUse', true);
}
function gh10139() {
    mongoose.set('timestamps.createdAt.immutable', false);
}
function gh12100() {
    mongoose.syncIndexes({ continueOnError: true });
    mongoose.syncIndexes({ continueOnError: false });
}
function setAsObject() {
    mongoose.set({
        debug: true,
        autoIndex: false
    });
    (0, tsd_1.expectError)(mongoose.set({ invalid: true }));
}
var x = mongoose.omitUndefined({ name: 'foo' });
