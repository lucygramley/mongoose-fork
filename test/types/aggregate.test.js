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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tsd_1 = require("tsd");
var schema = new mongoose_1.Schema({ name: { type: 'String' } });
var Test = (0, mongoose_1.model)('Test', schema);
var AnotherTest = (0, mongoose_1.model)('AnotherTest', schema);
Test.aggregate([{ $match: { name: 'foo' } }]).exec().then(function (res) { return console.log(res); });
Test.aggregate([{ $match: { name: 'foo' } }]).exec().then(function (res) { return console.log(res[0].name); });
Test.aggregate([{ $match: { name: 'foo' } }]).then(function (res) { return console.log(res[0].name); });
run().catch(function (err) { return console.log(err.stack); });
function run() {
    return __awaiter(this, void 0, void 0, function () {
        function eachAsync() {
            Test.aggregate().cursor().eachAsync(function (doc) {
                (0, tsd_1.expectType)(doc);
            });
            Test.aggregate().cursor().eachAsync(function (docs) {
                (0, tsd_1.expectType)(docs);
            }, { batchSize: 2 });
            Test.aggregate().cursor().eachAsync(function (doc) {
                (0, tsd_1.expectType)(doc);
            });
            Test.aggregate().cursor().eachAsync(function (docs) {
                (0, tsd_1.expectType)(docs);
            }, { batchSize: 2 });
        }
        var res, res2, _a, _b, _c, obj, e_1_1, _d, _e, _f, _g, _h, _j, _k, _l;
        var _this = this;
        var _m, e_1, _o, _p;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0: return [4 /*yield*/, Test.aggregate([{ $match: { name: 'foo' } }]).exec()];
                case 1:
                    res = _q.sent();
                    console.log(res[0].name);
                    return [4 /*yield*/, Test.aggregate([{ $match: { name: 'foo' } }])];
                case 2:
                    res2 = _q.sent();
                    console.log(res2[0].name);
                    (0, tsd_1.expectType)(Test.aggregate([{ $match: { name: 'foo' } }]).options.maxTimeMS);
                    (0, tsd_1.expectType)(Test.aggregate([{ $match: { name: 'foo' } }]).options.allowDiskUse);
                    Test.aggregate([{ $match: { name: 'foo' } }]).option({ maxTimeMS: 222 });
                    return [4 /*yield*/, Test.aggregate([{ $match: { name: 'foo' } }]).cursor().eachAsync(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log(res);
                                return [2 /*return*/];
                            });
                        }); })];
                case 3:
                    _q.sent();
                    _q.label = 4;
                case 4:
                    _q.trys.push([4, 9, 10, 15]);
                    _a = true, _b = __asyncValues(Test.aggregate());
                    _q.label = 5;
                case 5: return [4 /*yield*/, _b.next()];
                case 6:
                    if (!(_c = _q.sent(), _m = _c.done, !_m)) return [3 /*break*/, 8];
                    _p = _c.value;
                    _a = false;
                    obj = _p;
                    obj.name;
                    _q.label = 7;
                case 7:
                    _a = true;
                    return [3 /*break*/, 5];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _q.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _q.trys.push([10, , 13, 14]);
                    if (!(!_a && !_m && (_o = _b.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _o.call(_b)];
                case 11:
                    _q.sent();
                    _q.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15:
                    // Aggregate.prototype.sort()
                    _d = tsd_1.expectType;
                    return [4 /*yield*/, Test.aggregate().sort('-name')];
                case 16:
                    // Aggregate.prototype.sort()
                    _d.apply(void 0, [_q.sent()]);
                    _e = tsd_1.expectType;
                    return [4 /*yield*/, Test.aggregate().sort({ name: 1 })];
                case 17:
                    _e.apply(void 0, [_q.sent()]);
                    _f = tsd_1.expectType;
                    return [4 /*yield*/, Test.aggregate().sort({ name: -1 })];
                case 18:
                    _f.apply(void 0, [_q.sent()]);
                    _g = tsd_1.expectType;
                    return [4 /*yield*/, Test.aggregate().sort({ name: 'asc' })];
                case 19:
                    _g.apply(void 0, [_q.sent()]);
                    _h = tsd_1.expectType;
                    return [4 /*yield*/, Test.aggregate().sort({ name: 'ascending' })];
                case 20:
                    _h.apply(void 0, [_q.sent()]);
                    _j = tsd_1.expectType;
                    return [4 /*yield*/, Test.aggregate().sort({ name: 'desc' })];
                case 21:
                    _j.apply(void 0, [_q.sent()]);
                    _k = tsd_1.expectType;
                    return [4 /*yield*/, Test.aggregate().sort({ name: 'descending' })];
                case 22:
                    _k.apply(void 0, [_q.sent()]);
                    _l = tsd_1.expectType;
                    return [4 /*yield*/, Test.aggregate().sort({ name: { $meta: 'textScore' } })];
                case 23:
                    _l.apply(void 0, [_q.sent()]);
                    // Aggregate.prototype.model()
                    (0, tsd_1.expectType)(Test.aggregate().model());
                    (0, tsd_1.expectType)(Test.aggregate().model(AnotherTest));
                    return [2 /*return*/];
            }
        });
    });
}
function gh12017_1() {
    var a = { $subtract: [
            { $dayOfWeek: new Date() }, // errors
            2
        ] };
}
function gh12017_2() {
    var a = {
        $reduce: {
            input: '$values',
            initialValue: { depth: -1 }, // errors
            in: {
                depth: '$$this.depth' // errors
            }
        }
    };
    var b = {
        $reduce: {
            input: '$values',
            initialValue: 0,
            in: { $add: ['$$value', '$$this'] }
        }
    };
    var c = {
        $set: {
            child: {
                foo: 'bar' // errors
            },
            friend: new mongoose_1.Types.ObjectId()
        }
    };
    var d = { $toInt: 2.5 };
}
function gh12311() {
    var densifyWithDates = {
        $densify: {
            field: 'timestamp',
            range: {
                step: 1,
                unit: 'hour',
                bounds: [new Date('2022-01-01'), new Date('2022-12-31')]
            }
        }
    };
    var densifyWithNumbers = {
        $densify: {
            field: 'age',
            range: {
                step: 1,
                bounds: [30, 90]
            }
        }
    };
    var densifyWithFullBounds = {
        $densify: {
            field: 'age',
            range: {
                step: 1,
                bounds: 'full'
            }
        }
    };
}
function gh13060() {
    var schema = new mongoose_1.Schema({ status: String });
    var documentModel = (0, mongoose_1.model)('Document', schema);
    documentModel.aggregate([{
            $group: {
                _id: '$_id',
                merged: {
                    $mergeObjects: {
                        status: '$status'
                    }
                }
            }
        }]);
}
function gh15300() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, TestModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({ status: String });
                    TestModel = (0, mongoose_1.model)('Document', schema);
                    return [4 /*yield*/, TestModel.aggregate().project('a b -_id')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
