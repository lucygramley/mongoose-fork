"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoTypedModelConnection = autoTypedModelConnection;
var mongoose_1 = require("mongoose");
var mongodb = require("mongodb");
var tsd_1 = require("tsd");
var schema_test_1 = require("./schema.test");
(0, tsd_1.expectType)((0, mongoose_1.createConnection)());
(0, tsd_1.expectType)((0, mongoose_1.createConnection)('mongodb://127.0.0.1:27017/test'));
(0, tsd_1.expectType)((0, mongoose_1.createConnection)('mongodb://127.0.0.1:27017/test', { appName: 'mongoose' }));
var conn = (0, mongoose_1.createConnection)();
(0, tsd_1.expectAssignable)(conn.model('Test', new mongoose_1.Schema({ name: { type: String } })));
(0, tsd_1.expectType)(conn.model('Test', new mongoose_1.Schema({ name: { type: String } })));
(0, tsd_1.expectType)(conn.openUri('mongodb://127.0.0.1:27017/test'));
(0, tsd_1.expectType)(conn.openUri('mongodb://127.0.0.1:27017/test', { bufferCommands: true }));
conn.readyState === 0;
conn.readyState === 99;
(0, tsd_1.expectError)(conn.readyState = 0);
(0, tsd_1.expectType)(conn.createCollections());
(0, tsd_1.expectType)(new mongoose_1.Connection());
(0, tsd_1.expectType)(new mongoose_1.Connection().asPromise());
(0, tsd_1.expectType)(conn.createCollection('some'));
(0, tsd_1.expectType)(conn.dropCollection('some'));
(0, tsd_1.expectError)(conn.deleteModel());
(0, tsd_1.expectType)(conn.deleteModel('something'));
(0, tsd_1.expectType)(conn.deleteModel(/.+/));
(0, tsd_1.expectType)(conn.modelNames());
(0, tsd_1.expectType)((0, mongoose_1.createConnection)('mongodb://127.0.0.1:27017/test').close());
(0, tsd_1.expectType)((0, mongoose_1.createConnection)('mongodb://127.0.0.1:27017/test').close(true));
(0, tsd_1.expectType)(conn.db);
(0, tsd_1.expectType)(conn.getClient());
(0, tsd_1.expectType)(conn.setClient(new mongodb.MongoClient('mongodb://127.0.0.1:27017/test')));
(0, tsd_1.expectType)(conn.transaction(function (res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, tsd_1.expectType)(res);
        return [2 /*return*/, 'a'];
    });
}); }));
(0, tsd_1.expectType)(conn.transaction(function (res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, tsd_1.expectType)(res);
        return [2 /*return*/, 'a'];
    });
}); }, { readConcern: 'majority' }));
(0, tsd_1.expectType)(conn.withSession(function (res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, tsd_1.expectType)(res);
        return [2 /*return*/, 'a'];
    });
}); }));
(0, tsd_1.expectError)(conn.user = 'invalid');
(0, tsd_1.expectError)(conn.pass = 'invalid');
(0, tsd_1.expectError)(conn.host = 'invalid');
(0, tsd_1.expectError)(conn.port = 'invalid');
(0, tsd_1.expectType)(conn.collection('test'));
(0, tsd_1.expectType)((_a = conn.db) === null || _a === void 0 ? void 0 : _a.collection('test'));
(0, tsd_1.expectType)(conn.startSession());
(0, tsd_1.expectType)(conn.startSession({ causalConsistency: true }));
(0, tsd_1.expectType)(conn.syncIndexes());
(0, tsd_1.expectType)(conn.syncIndexes({ continueOnError: true }));
(0, tsd_1.expectType)(conn.syncIndexes({ background: true }));
(0, tsd_1.expectType)(conn.useDb('test'));
(0, tsd_1.expectType)(conn.useDb('test', {}));
(0, tsd_1.expectType)(conn.useDb('test', { noListener: true }));
(0, tsd_1.expectType)(conn.useDb('test', { useCache: true }));
(0, tsd_1.expectType)(conn.listCollections().then(function (collections) { return collections.map(function (coll) { return coll.name; }); }));
(0, tsd_1.expectType)(conn.listDatabases().then(function (dbs) { return dbs.databases.map(function (db) { return db.name; }); }));
function autoTypedModelConnection() {
    var _this = this;
    var AutoTypedSchema = (0, schema_test_1.autoTypedSchema)();
    var AutoTypedModel = mongoose_1.connection.model('AutoTypeModelConnection', AutoTypedSchema);
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var randomObject, testDoc1, testDoc2, testDoc3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, AutoTypedModel.create({ unExistKey: 'unExistKey', description: 'st' })];
                case 1:
                    randomObject = _b.sent();
                    (0, tsd_1.expectType)(randomObject.userName);
                    return [4 /*yield*/, AutoTypedModel.create({ userName: 'M0_0a' })];
                case 2:
                    testDoc1 = _b.sent();
                    (0, tsd_1.expectType)(testDoc1.userName);
                    (0, tsd_1.expectType)(testDoc1.description);
                    return [4 /*yield*/, AutoTypedModel.insertMany([{ userName: 'M0_0a' }])];
                case 3:
                    testDoc2 = _b.sent();
                    (0, tsd_1.expectType)(testDoc2[0].userName);
                    (0, tsd_1.expectType)((_a = testDoc2[0]) === null || _a === void 0 ? void 0 : _a.description);
                    return [4 /*yield*/, AutoTypedModel.findOne({ userName: 'M0_0a' })];
                case 4:
                    testDoc3 = _b.sent();
                    (0, tsd_1.expectType)(testDoc3 === null || testDoc3 === void 0 ? void 0 : testDoc3.userName);
                    (0, tsd_1.expectType)(testDoc3 === null || testDoc3 === void 0 ? void 0 : testDoc3.description);
                    // Model-statics-functions-test
                    (0, tsd_1.expectType)(AutoTypedModel.staticFn());
                    return [2 /*return*/];
            }
        });
    }); })();
    return AutoTypedModel;
}
function schemaInstanceMethodsAndQueryHelpersOnConnection() {
    var userSchema = new mongoose_1.Schema({
        name: String
    }, {
        statics: {
            findByName: function (name) {
                return mongoose_1.connection.model('User').findOne({ name: name }).orFail();
            }
        },
        methods: {
            doSomething: function () {
                return 'test';
            }
        },
        query: {
            byName: function (name) {
                return this.where({ name: name });
            }
        }
    });
    var TestModel = mongoose_1.connection.model('User', userSchema);
}
function gh15359() {
    return __awaiter(this, void 0, void 0, function () {
        var res, res2, res3;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, conn.bulkWrite([{ model: 'Test', name: 'insertOne', document: { name: 'test1' } }])];
                case 1:
                    res = _c.sent();
                    (0, tsd_1.expectType)(res.insertedCount);
                    (0, tsd_1.expectError)(res.mongoose.validationErrors);
                    return [4 /*yield*/, conn.bulkWrite([{ model: 'Test', name: 'insertOne', document: { name: 'test2' } }], { ordered: false })];
                case 2:
                    res2 = _c.sent();
                    (0, tsd_1.expectType)(res2.insertedCount);
                    (0, tsd_1.expectType)((_a = res2.mongoose) === null || _a === void 0 ? void 0 : _a.validationErrors);
                    return [4 /*yield*/, conn.bulkWrite([
                            { model: 'Test', name: 'updateOne', filter: { name: 'test5' }, update: { $set: { num: 42 } } },
                            { model: 'Test', name: 'updateOne', filter: { name: 'test4' }, update: { $set: { num: 'not a number' } } }
                        ], { ordered: false })];
                case 3:
                    res3 = _c.sent();
                    (0, tsd_1.expectType)(res3.insertedCount);
                    (0, tsd_1.expectType)((_b = res3.mongoose) === null || _b === void 0 ? void 0 : _b.validationErrors);
                    return [2 /*return*/];
            }
        });
    });
}
