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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tsd_1 = require("tsd");
function gh10345() {
    (function () {
        var UserModel = (0, mongoose_1.model)('User', new mongoose_1.Schema({ name: String, id: Number }));
        var doc = new UserModel({ name: 'test', id: 42 });
        var leanDoc = doc.toObject();
        leanDoc.id = 43;
    })();
    (function () {
        return __awaiter(this, void 0, void 0, function () {
            var UserModel, doc, leanDoc, doc2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        UserModel = (0, mongoose_1.model)('User', new mongoose_1.Schema({ name: String }));
                        doc = new UserModel({ name: 'test' });
                        leanDoc = doc.toObject();
                        (0, tsd_1.expectError)(leanDoc.id = 43);
                        return [4 /*yield*/, UserModel.findOne().orFail().lean()];
                    case 1:
                        doc2 = _a.sent();
                        (0, tsd_1.expectError)(doc2.id = 43);
                        return [2 /*return*/];
                }
            });
        });
    })();
}
function gh11761() {
    return __awaiter(this, void 0, void 0, function () {
        var thingSchema, ThingModel, _a, _id, thing1, foundDoc, _id, thing2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    thingSchema = new mongoose_1.Schema({
                        name: mongoose_1.Schema.Types.String
                    });
                    ThingModel = (0, mongoose_1.model)('Thing', thingSchema);
                    return [4 /*yield*/, ThingModel.create({ name: 'thing1' })];
                case 1:
                    _a = (_b.sent()).toObject(), _id = _a._id, thing1 = __rest(_a, ["_id"]);
                    (0, tsd_1.expectType)(_id);
                    console.log({ _id: _id, thing1: thing1 });
                    return [4 /*yield*/, ThingModel.findOne().lean().limit(1).exec()];
                case 2:
                    foundDoc = _b.sent();
                    {
                        if (!foundDoc) {
                            return [2 /*return*/]; // Tell TS that it isn't null
                        }
                        _id = foundDoc._id, thing2 = __rest(foundDoc, ["_id"]);
                        (0, tsd_1.expectType)(foundDoc._id);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function gh11118() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, UserModel, docs, _i, docs_1, doc, _id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({
                        name: { type: String, required: true },
                        email: { type: String, required: true },
                        avatar: String
                    });
                    UserModel = (0, mongoose_1.model)('User', schema);
                    return [4 /*yield*/, UserModel.find().lean().exec()];
                case 1:
                    docs = _a.sent();
                    for (_i = 0, docs_1 = docs; _i < docs_1.length; _i++) {
                        doc = docs_1[_i];
                        _id = doc._id;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function _11767() {
    return __awaiter(this, void 0, void 0, function () {
        var QuestionSchema, ExamSchema, ExamModel, examFound, examFound2, examFound2Obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    QuestionSchema = new mongoose_1.Schema({
                        text: String,
                        answers: [String],
                        correct: Number
                    });
                    ExamSchema = new mongoose_1.Schema({
                        element: String,
                        dateTaken: Date,
                        questions: [QuestionSchema]
                    });
                    ExamModel = (0, mongoose_1.model)('Exam', ExamSchema);
                    return [4 /*yield*/, ExamModel.findOne().lean().exec()];
                case 1:
                    examFound = _a.sent();
                    if (!examFound)
                        return [2 /*return*/];
                    // Had to comment some of these active checks out
                    // $pop shouldn't be there, because questions should no longer be a mongoose array
                    // expectError<Function>(examFound.questions.$pop);
                    // popoulated shouldn't be on the question doc because it shouldn't
                    // be a mongoose subdocument anymore
                    // expectError(examFound.questions[0]!.populated);
                    (0, tsd_1.expectType)(examFound.questions[0].answers);
                    return [4 /*yield*/, ExamModel.findOne().exec()];
                case 2:
                    examFound2 = _a.sent();
                    if (!examFound2)
                        return [2 /*return*/];
                    examFound2Obj = examFound2.toObject();
                    // expectError(examFound2Obj.questions.$pop);
                    // expectError(examFound2Obj.questions[0].populated);
                    (0, tsd_1.expectType)(examFound2Obj.questions[0].answers);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13010() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, CountryModel, country;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({
                        name: { required: true, type: Map, of: String }
                    });
                    CountryModel = (0, mongoose_1.model)('Country', schema);
                    return [4 /*yield*/, CountryModel.create({
                            name: {
                                en: 'Croatia',
                                ru: 'Хорватия'
                            }
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, CountryModel.findOne().lean().orFail().exec()];
                case 2:
                    country = _a.sent();
                    (0, tsd_1.expectType)(country.name);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13345_1() {
    return __awaiter(this, void 0, void 0, function () {
        var imageSchema, placeSchema, PlaceModel, place;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageSchema = new mongoose_1.Schema({
                        url: { required: true, type: String }
                    });
                    placeSchema = new mongoose_1.Schema({
                        images: { required: true, type: [imageSchema] }
                    });
                    PlaceModel = (0, mongoose_1.model)('Place', placeSchema);
                    return [4 /*yield*/, PlaceModel.findOne().lean().orFail().exec()];
                case 1:
                    place = _a.sent();
                    (0, tsd_1.expectAssignable)(place);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13345_2() {
    return __awaiter(this, void 0, void 0, function () {
        var imageSchema, placeSchema, PlaceModel, place;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageSchema = new mongoose_1.Schema({
                        description: { required: true, type: Map, of: String },
                        url: { required: true, type: String }
                    });
                    placeSchema = new mongoose_1.Schema({
                        images: { required: true, type: [imageSchema] }
                    });
                    PlaceModel = (0, mongoose_1.model)('Place', placeSchema);
                    return [4 /*yield*/, PlaceModel.findOne().lean().orFail().exec()];
                case 1:
                    place = _a.sent();
                    (0, tsd_1.expectAssignable)(place);
                    (0, tsd_1.expectType)(place.images[0].description);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13345_3() {
    return __awaiter(this, void 0, void 0, function () {
        var imageSchema, placeSchema, PlaceModel, place;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageSchema = new mongoose_1.Schema({
                        url: { required: true, type: String }
                    });
                    placeSchema = new mongoose_1.Schema({
                        images: { type: [imageSchema], default: undefined }
                    });
                    PlaceModel = (0, mongoose_1.model)('Place', placeSchema);
                    return [4 /*yield*/, PlaceModel.findOne().lean().orFail().exec()];
                case 1:
                    place = _a.sent();
                    (0, tsd_1.expectAssignable)(place);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13382() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, Test, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({
                        name: String
                    });
                    Test = (0, mongoose_1.model)('Test', schema);
                    return [4 /*yield*/, Test.updateOne({}, { name: 'bar' }).lean()];
                case 1:
                    res = _a.sent();
                    (0, tsd_1.expectAssignable)(res);
                    return [2 /*return*/];
            }
        });
    });
}
function gh15057() {
    return __awaiter(this, void 0, void 0, function () {
        var TestSchema, AttachmentModel, main, doSomeThing;
        var _this = this;
        return __generator(this, function (_a) {
            TestSchema = new mongoose_1.Schema({
                type: { type: String, required: true },
                value: { type: String }
            });
            AttachmentModel = (0, mongoose_1.model)('test', TestSchema);
            main = function () { return __awaiter(_this, void 0, void 0, function () {
                var item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, AttachmentModel.findOne().lean()];
                        case 1:
                            item = _a.sent();
                            if (!item)
                                return [2 /*return*/];
                            doSomeThing(item);
                            return [2 /*return*/];
                    }
                });
            }); };
            doSomeThing = function (item) {
                console.log(item);
            };
            return [2 /*return*/];
        });
    });
}
function gh15122() {
    return __awaiter(this, void 0, void 0, function () {
        var parentSchema, Parent, testFn, parentDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parentSchema = new mongoose_1.Schema({
                        name: {
                            type: String,
                            required: true,
                            trim: true
                        },
                        surname: {
                            type: String,
                            required: true,
                            trim: true
                        },
                        child: {
                            type: 'ObjectId',
                            ref: 'Child',
                            required: true
                        }
                    });
                    parentSchema.virtual('fullName').get(function () {
                        return "".concat(this.name, " ").concat(this.surname);
                    });
                    Parent = (0, mongoose_1.model)('Parent', parentSchema);
                    testFn = function (parent) { };
                    return [4 /*yield*/, Parent.findOne().lean()];
                case 1:
                    parentDoc = _a.sent();
                    if (parentDoc) {
                        testFn(parentDoc);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function gh15158() {
    return __awaiter(this, void 0, void 0, function () {
        var createSomeModelAndDoSomething, doSomeThing;
        var _this = this;
        return __generator(this, function (_a) {
            createSomeModelAndDoSomething = function () { return __awaiter(_this, void 0, void 0, function () {
                var TestSchema, FooBarModel, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            TestSchema = new mongoose_1.Schema({
                                value: { type: String }
                            });
                            FooBarModel = (0, mongoose_1.model)('test', TestSchema);
                            return [4 /*yield*/, FooBarModel.findOne().lean()];
                        case 1:
                            item = _a.sent();
                            if (!item)
                                return [2 /*return*/];
                            doSomeThing(item);
                            return [2 /*return*/];
                    }
                });
            }); };
            doSomeThing = function (item) {
                console.log(item);
            };
            createSomeModelAndDoSomething();
            return [2 /*return*/];
        });
    });
}
