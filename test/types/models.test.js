"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoTypedModel = autoTypedModel;
var mongoose_1 = require("mongoose");
var tsd_1 = require("tsd");
var schema_test_1 = require("./schema.test");
function rawDocSyntax() {
    var TestSchema = new mongoose_1.Schema({
        foo: { type: String, required: true }
    });
    var Test = mongoose_1.connection.model('Test', TestSchema);
    (0, tsd_1.expectType)(Test);
    var doc = new Test({ foo: '42' });
    console.log(doc.foo);
    console.log(doc.bar());
    doc.save();
}
function tAndDocSyntax() {
    var TestSchema = new mongoose_1.Schema({
        foo: { type: String, required: true }
    });
    var Test = mongoose_1.connection.model('Test', TestSchema);
    var aggregated = Test.aggregate([]).then(function (res) { return res[0]; });
    var bar = function (SomeModel) { return console.log(SomeModel); };
}
function insertManyTest() {
    return __awaiter(this, void 0, void 0, function () {
        var TestSchema, Test, res, res2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TestSchema = new mongoose_1.Schema({
                        foo: { type: String, required: true }
                    });
                    Test = mongoose_1.connection.model('Test', TestSchema);
                    Test.insertMany([{ foo: 'bar' }]).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            res.length;
                            return [2 /*return*/];
                        });
                    }); });
                    return [4 /*yield*/, Test.insertMany([{ foo: 'bar' }], { rawResult: true })];
                case 1:
                    res = _a.sent();
                    (0, tsd_1.expectType)(res.insertedIds[0]);
                    return [4 /*yield*/, Test.insertMany([{ foo: 'bar' }], { ordered: false, rawResult: true })];
                case 2:
                    res2 = _a.sent();
                    (0, tsd_1.expectAssignable)(res2.mongoose.results[0]);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13930() {
    var TestSchema = new mongoose_1.Schema({
        foo: { type: String, required: true }
    });
    var Test = mongoose_1.connection.model('Test', TestSchema);
    Test.insertMany([{ foo: 'bar' }], {});
}
function gh10074() {
    var DogSchema = new mongoose_1.Schema({
        breed: { type: String },
        name: { type: String },
        age: { type: Number }
    });
    var Dog = (0, mongoose_1.model)('dog', DogSchema);
    var rex = new Dog({
        breed: 'test',
        name: 'rex',
        age: '50'
    });
}
function gh10359() {
    return __awaiter(this, void 0, void 0, function () {
        function foo(model) {
            return __awaiter(this, void 0, void 0, function () {
                var doc;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, model.findOne({ groupId: 'test' }).orFail().lean().exec()];
                        case 1:
                            doc = _a.sent();
                            (0, tsd_1.expectType)(doc.firstName);
                            (0, tsd_1.expectType)(doc.lastName);
                            (0, tsd_1.expectType)(doc._id);
                            (0, tsd_1.expectType)(doc.groupId);
                            return [2 /*return*/, doc];
                    }
                });
            });
        }
        var UserModel;
        return __generator(this, function (_a) {
            UserModel = (0, mongoose_1.model)('gh10359', new mongoose_1.Schema({ firstName: String, lastName: String, groupId: String }));
            foo(UserModel);
            return [2 /*return*/];
        });
    });
}
var ExpiresSchema = new mongoose_1.Schema({
    ttl: {
        type: Date,
        expires: 3600
    }
});
var projectSchema = new mongoose_1.Schema({ name: String });
projectSchema.pre('save', function () {
    // this => IProject
});
projectSchema.post('save', function () {
    // this => IProject
});
projectSchema.pre('deleteOne', function () {
    this.model;
});
projectSchema.post('deleteOne', function () {
    this.model;
});
projectSchema.methods.myMethod = function () { return 10; };
projectSchema.statics.myStatic = function () { return 42; };
var Project = mongoose_1.connection.model('Project', projectSchema);
Project.myStatic();
Project.create({
    name: 'mongoose'
}).then(function (project) {
    project.myMethod();
});
Project.exists({ name: 'Hello' }).then(function (result) {
    result === null || result === void 0 ? void 0 : result._id;
});
function find() {
    // no args
    Project.find();
    // just filter
    Project.find({});
    Project.find({ name: 'Hello' });
    // just callback; this is no longer supported on .find()
    Project.find(function (error, result) { return console.log(error, result); });
    // filter + projection
    Project.find({}, undefined);
    Project.find({}, null);
    Project.find({}, { name: 1 });
    Project.find({}, { name: 0 });
    // filter + projection + options
    Project.find({}, undefined, { limit: 5 });
    Project.find({}, null, { limit: 5 });
    Project.find({}, { name: 1 }, { limit: 5 });
}
function inheritance() {
    var InteractsWithDatabase = /** @class */ (function (_super) {
        __extends(InteractsWithDatabase, _super);
        function InteractsWithDatabase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InteractsWithDatabase.prototype._update = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.save()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return InteractsWithDatabase;
    }(mongoose_1.Model));
    var doc = new InteractsWithDatabase();
    doc instanceof mongoose_1.Model;
    var SourceProvider = /** @class */ (function (_super) {
        __extends(SourceProvider, _super);
        function SourceProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SourceProvider.deleteInstallation = function (installationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOneAndDelete({ installationId: installationId })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return SourceProvider;
    }(InteractsWithDatabase));
}
Project.createCollection({ expires: '5 seconds' });
Project.createCollection({ expireAfterSeconds: 5 });
(0, tsd_1.expectError)(Project.createCollection({ expireAfterSeconds: '5 seconds' }));
function bulkWrite() {
    var schema = new mongoose_1.Schema({
        str: { type: String, default: 'test' },
        num: Number
    });
    var M = (0, mongoose_1.model)('Test', schema);
    var ops = [
        {
            updateOne: {
                filter: { num: 0 },
                update: {
                    $inc: { num: 1 }
                },
                upsert: true
            }
        }
    ];
    M.bulkWrite(ops);
}
function bulkWriteAddToSet() {
    var schema = new mongoose_1.Schema({
        arr: [String]
    });
    var M = (0, mongoose_1.model)('Test', schema);
    var ops = [
        {
            updateOne: {
                filter: {
                    arr: {
                        $nin: ['abc']
                    }
                },
                update: {
                    $addToSet: {
                        arr: 'abc'
                    }
                }
            }
        }
    ];
    return M.bulkWrite(ops);
}
function gh12277() {
    return __awaiter(this, void 0, void 0, function () {
        var baseModelClassSchema, BaseModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseModelClassSchema = new mongoose_1.Schema({
                        firstname: String
                    });
                    BaseModel = (0, mongoose_1.model)('test', baseModelClassSchema);
                    return [4 /*yield*/, BaseModel.bulkWrite([
                            {
                                updateOne: {
                                    update: {
                                        firstname: 'test'
                                    },
                                    filter: {
                                        firstname: 'asdsd'
                                    }
                                }
                            }
                        ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function overwriteBulkWriteContents() {
    return __awaiter(this, void 0, void 0, function () {
        var baseModelClassSchema, BaseModel;
        return __generator(this, function (_a) {
            baseModelClassSchema = new mongoose_1.Schema({
                firstname: String
            });
            BaseModel = (0, mongoose_1.model)('test', baseModelClassSchema);
            (0, tsd_1.expectError)(BaseModel.bulkWrite([
                {
                    insertOne: {
                        document: {
                            test: 'hello'
                        }
                    }
                }
            ]));
            BaseModel.bulkWrite([
                {
                    insertOne: {
                        document: {
                            testy: 'hello'
                        }
                    }
                }
            ]);
            BaseModel.bulkWrite([
                {
                    insertOne: {
                        document: {
                            randomPropertyNotInTypes: 'hello'
                        }
                    }
                }
            ]);
            return [2 /*return*/];
        });
    });
}
function autoTypedModel() {
    var _this = this;
    var AutoTypedSchema = (0, schema_test_1.autoTypedSchema)();
    var AutoTypedModel = (0, mongoose_1.model)('AutoTypeModel', AutoTypedSchema);
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
function gh11911() {
    var animalSchema = new mongoose_1.Schema({
        name: { type: String }
    });
    var Animal = (0, mongoose_1.model)('Animal', animalSchema);
    var changes = {};
    (0, tsd_1.expectAssignable)({
        filter: {},
        update: changes
    });
}
function gh12059() {
    var animalSchema = new mongoose_1.Schema({
        name: { type: String }
    });
    var Animal = (0, mongoose_1.model)('Animal', animalSchema);
    var animal = new Animal();
    Animal.bulkSave([animal], { timestamps: false });
    Animal.bulkSave([animal], { timestamps: true });
    Animal.bulkSave([animal], {});
}
function schemaInstanceMethodsAndQueryHelpers() {
    var userSchema = new mongoose_1.Schema({
        name: String
    }, {
        statics: {
            findByName: function (name) {
                return (0, mongoose_1.model)('User').findOne({ name: name }).orFail();
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
    var TestModel = (0, mongoose_1.model)('User', userSchema);
}
function gh12100() {
    var schema = new mongoose_1.Schema();
    var Model = (0, mongoose_1.model)('Model', schema);
    Model.syncIndexes({ continueOnError: true, noResponse: true });
    Model.syncIndexes({ continueOnError: false, noResponse: true });
}
(function gh12070() {
    var schema_with_string_id = new mongoose_1.Schema({ _id: String, nickname: String });
    var TestModel = (0, mongoose_1.model)('test', schema_with_string_id);
    var obj = new TestModel();
    (0, tsd_1.expectType)(obj._id);
})();
(function gh12094() {
    return __awaiter(this, void 0, void 0, function () {
        var userSchema, User, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userSchema = new mongoose_1.Schema({
                        name: { type: String, required: true },
                        email: { type: String, required: true },
                        avatar: String
                    });
                    User = (0, mongoose_1.model)('User', userSchema);
                    return [4 /*yield*/, User.exists({ name: 'Bill' }).orFail()];
                case 1:
                    doc = _a.sent();
                    (0, tsd_1.expectType)(doc._id);
                    return [2 /*return*/];
            }
        });
    });
})();
function modelRemoveOptions() {
    var cmodel = (0, mongoose_1.model)('Test', new mongoose_1.Schema());
    var res = yield cmodel.deleteOne({}, {});
}
function gh12286() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, User, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({
                        name: { type: String, required: true }
                    });
                    User = (0, mongoose_1.model)('User', schema);
                    return [4 /*yield*/, User.findById('0'.repeat(24), { name: 1 }).lean()];
                case 1:
                    user = _a.sent();
                    if (user == null) {
                        return [2 /*return*/];
                    }
                    (0, tsd_1.expectType)(user.name);
                    return [2 /*return*/];
            }
        });
    });
}
function gh12332() {
    var schema = new mongoose_1.Schema({ age: Number });
    var User = (0, mongoose_1.model)('User', schema);
    User.castObject({ age: '19' });
    User.castObject({ age: '19' }, { ignoreCastErrors: true });
}
function gh12347() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, User, replaceOneResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({
                        name: { type: String, required: true }
                    });
                    User = (0, mongoose_1.model)('User', schema);
                    return [4 /*yield*/, User.replaceOne({}, {})];
                case 1:
                    replaceOneResult = _a.sent();
                    (0, tsd_1.expectType)(replaceOneResult);
                    return [2 /*return*/];
            }
        });
    });
}
function gh12319() {
    return __awaiter(this, void 0, void 0, function () {
        var projectSchema, ProjectModel, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    projectSchema = new mongoose_1.Schema({
                        name: {
                            type: String,
                            required: true
                        }
                    }, {
                        methods: {
                            doSomething: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/];
                                    });
                                });
                            }
                        }
                    });
                    ProjectModel = (0, mongoose_1.model)('Project', projectSchema);
                    _a = tsd_1.expectType;
                    return [4 /*yield*/, ProjectModel.findOne().orFail()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function findWithId() {
    var id = new mongoose_1.Types.ObjectId();
    var TestModel = (0, mongoose_1.model)('test', new mongoose_1.Schema({}));
    TestModel.find(id);
    TestModel.findOne(id);
}
function gh12573ModelAny() {
    var TestModel = (0, mongoose_1.model)('Test', new mongoose_1.Schema({}));
    var doc = new TestModel();
    (0, tsd_1.expectType)(doc);
    var fieldA = doc.fieldA;
    (0, tsd_1.expectType)(fieldA);
}
function aggregateOptionsTest() {
    var TestModel = (0, mongoose_1.model)('test', new mongoose_1.Schema({}));
    var options = {};
    TestModel.aggregate(undefined, options);
}
function gh13151() {
    return __awaiter(this, void 0, void 0, function () {
        var TestSchema, TestModel, test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TestSchema = new mongoose_1.Schema({
                        title: {
                            type: String,
                            required: true
                        }
                    });
                    TestModel = (0, mongoose_1.model)('Test', TestSchema);
                    return [4 /*yield*/, TestModel.findOne().lean()];
                case 1:
                    test = _a.sent();
                    (0, tsd_1.expectType)(test);
                    if (!test)
                        return [2 /*return*/];
                    (0, tsd_1.expectType)(test);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13206() {
    var TestSchema = new mongoose_1.Schema({ name: String });
    var TestModel = (0, mongoose_1.model)('Test', TestSchema);
    TestModel.watch([], { fullDocument: 'updateLookup' }).on('change', function (change) {
        (0, tsd_1.expectType)(change);
    });
}
function gh13529() {
    function test(dbModel) {
        var resourceDoc = new dbModel();
        resourceDoc.foo = 'bar';
    }
}
function gh13705() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, TestModel, findByIdRes, findOneRes, findRes, findByIdAndDeleteRes, findByIdAndUpdateRes, findOneAndDeleteRes, findOneAndReplaceRes, findOneAndUpdateRes, findOneAndUpdateResWithMetadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({ name: String });
                    TestModel = (0, mongoose_1.model)('Test', schema);
                    return [4 /*yield*/, TestModel.findById('0'.repeat(24), undefined, { lean: true })];
                case 1:
                    findByIdRes = _a.sent();
                    (0, tsd_1.expectType)(findByIdRes);
                    return [4 /*yield*/, TestModel.findOne({ _id: '0'.repeat(24) }, undefined, { lean: true })];
                case 2:
                    findOneRes = _a.sent();
                    (0, tsd_1.expectType)(findOneRes);
                    return [4 /*yield*/, TestModel.find({ _id: '0'.repeat(24) }, undefined, { lean: true })];
                case 3:
                    findRes = _a.sent();
                    (0, tsd_1.expectType)(findRes);
                    return [4 /*yield*/, TestModel.findByIdAndDelete('0'.repeat(24), { lean: true })];
                case 4:
                    findByIdAndDeleteRes = _a.sent();
                    (0, tsd_1.expectType)(findByIdAndDeleteRes);
                    return [4 /*yield*/, TestModel.findByIdAndUpdate('0'.repeat(24), {}, { lean: true })];
                case 5:
                    findByIdAndUpdateRes = _a.sent();
                    (0, tsd_1.expectType)(findByIdAndUpdateRes);
                    return [4 /*yield*/, TestModel.findOneAndDelete({ _id: '0'.repeat(24) }, { lean: true })];
                case 6:
                    findOneAndDeleteRes = _a.sent();
                    (0, tsd_1.expectType)(findOneAndDeleteRes);
                    return [4 /*yield*/, TestModel.findOneAndReplace({ _id: '0'.repeat(24) }, {}, { lean: true })];
                case 7:
                    findOneAndReplaceRes = _a.sent();
                    (0, tsd_1.expectType)(findOneAndReplaceRes);
                    return [4 /*yield*/, TestModel.findOneAndUpdate({}, {}, { lean: true })];
                case 8:
                    findOneAndUpdateRes = _a.sent();
                    (0, tsd_1.expectType)(findOneAndUpdateRes);
                    return [4 /*yield*/, TestModel.findOneAndUpdate({}, {}, { lean: true, includeResultMetadata: true })];
                case 9:
                    findOneAndUpdateResWithMetadata = _a.sent();
                    (0, tsd_1.expectAssignable)(findOneAndUpdateResWithMetadata);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13746() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, TestModel, findByIdAndUpdateRes, findOneAndReplaceRes, findOneAndUpdateRes, findOneAndDeleteRes, findByIdAndDeleteRes;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    schema = new mongoose_1.Schema({ name: String });
                    TestModel = (0, mongoose_1.model)('Test', schema);
                    return [4 /*yield*/, TestModel.findByIdAndUpdate('0'.repeat(24), {}, { includeResultMetadata: true })];
                case 1:
                    findByIdAndUpdateRes = _l.sent();
                    (0, tsd_1.expectType)((_a = findByIdAndUpdateRes.lastErrorObject) === null || _a === void 0 ? void 0 : _a.updatedExisting);
                    (0, tsd_1.expectType)((_b = findByIdAndUpdateRes.lastErrorObject) === null || _b === void 0 ? void 0 : _b.upserted);
                    (0, tsd_1.expectType)(findByIdAndUpdateRes.ok);
                    return [4 /*yield*/, TestModel.findOneAndReplace({ _id: '0'.repeat(24) }, {}, { includeResultMetadata: true })];
                case 2:
                    findOneAndReplaceRes = _l.sent();
                    (0, tsd_1.expectType)((_c = findOneAndReplaceRes.lastErrorObject) === null || _c === void 0 ? void 0 : _c.updatedExisting);
                    (0, tsd_1.expectType)((_d = findOneAndReplaceRes.lastErrorObject) === null || _d === void 0 ? void 0 : _d.upserted);
                    (0, tsd_1.expectType)(findOneAndReplaceRes.ok);
                    return [4 /*yield*/, TestModel.findOneAndUpdate({ _id: '0'.repeat(24) }, {}, { includeResultMetadata: true })];
                case 3:
                    findOneAndUpdateRes = _l.sent();
                    (0, tsd_1.expectType)((_e = findOneAndUpdateRes.lastErrorObject) === null || _e === void 0 ? void 0 : _e.updatedExisting);
                    (0, tsd_1.expectType)((_f = findOneAndUpdateRes.lastErrorObject) === null || _f === void 0 ? void 0 : _f.upserted);
                    (0, tsd_1.expectType)(findOneAndUpdateRes.ok);
                    return [4 /*yield*/, TestModel.findOneAndDelete({ _id: '0'.repeat(24) }, { includeResultMetadata: true })];
                case 4:
                    findOneAndDeleteRes = _l.sent();
                    (0, tsd_1.expectType)((_g = findOneAndDeleteRes.lastErrorObject) === null || _g === void 0 ? void 0 : _g.updatedExisting);
                    (0, tsd_1.expectType)((_h = findOneAndDeleteRes.lastErrorObject) === null || _h === void 0 ? void 0 : _h.upserted);
                    (0, tsd_1.expectType)(findOneAndDeleteRes.ok);
                    return [4 /*yield*/, TestModel.findByIdAndDelete('0'.repeat(24), { includeResultMetadata: true })];
                case 5:
                    findByIdAndDeleteRes = _l.sent();
                    (0, tsd_1.expectType)((_j = findByIdAndDeleteRes.lastErrorObject) === null || _j === void 0 ? void 0 : _j.updatedExisting);
                    (0, tsd_1.expectType)((_k = findByIdAndDeleteRes.lastErrorObject) === null || _k === void 0 ? void 0 : _k.upserted);
                    (0, tsd_1.expectType)(findByIdAndDeleteRes.ok);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13904() {
    var schema = new mongoose_1.Schema({ name: String });
    var Test = (0, mongoose_1.model)('Test', schema);
    (0, tsd_1.expectAssignable)(Test.insertMany([{ name: 'test' }], {
        ordered: false,
        rawResult: true
    }));
}
function gh13957() {
    var RepositoryBase = /** @class */ (function () {
        function RepositoryBase(schemaModel) {
            this.model = schemaModel;
        }
        // Testing that the following compiles successfully
        RepositoryBase.prototype.insertMany = function (elems) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.model.insertMany(elems)];
                        case 1:
                            elems = _a.sent();
                            return [2 /*return*/, elems];
                    }
                });
            });
        };
        return RepositoryBase;
    }());
    var schema = new mongoose_1.Schema({ name: { type: String, required: true } });
    var TestModel = (0, mongoose_1.model)('Test', schema);
    var repository = new RepositoryBase(TestModel);
    (0, tsd_1.expectType)(repository.insertMany([{ name: 'test' }]));
}
function gh13897() {
    var documentSchema = new mongoose_1.Schema({
        name: { type: String, required: true }
    }, {
        timestamps: true
    });
    var Document = (0, mongoose_1.model)('Document', documentSchema);
    var doc = new Document({ name: 'foo' });
    (0, tsd_1.expectType)(doc.createdAt);
    (0, tsd_1.expectError)(new Document({ name: 'foo' }));
}
function gh14026() {
    return __awaiter(this, void 0, void 0, function () {
        var FooModel, distinctBar, TestModel, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    FooModel = mongoose_1.default.model('Foo', new mongoose_1.default.Schema({ bar: [String] }));
                    return [4 /*yield*/, FooModel.distinct('bar')];
                case 1:
                    distinctBar = _b.sent();
                    (0, tsd_1.expectType)(distinctBar);
                    TestModel = mongoose_1.default.model('Test', new mongoose_1.default.Schema({ bar: [String] }));
                    _a = tsd_1.expectType;
                    return [4 /*yield*/, TestModel.distinct('bar')];
                case 2:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function gh14072() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, M;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.default.Schema({
                        num: { type: Number },
                        created_at: { type: Number },
                        updated_at: { type: Number }
                    }, {
                        timestamps: {
                            createdAt: 'created_at',
                            updatedAt: 'updated_at',
                            currentTime: function () { return new Date().valueOf() / 1000; }
                        }
                    });
                    M = mongoose_1.default.model('Test', schema);
                    return [4 /*yield*/, M.bulkWrite([
                            {
                                insertOne: {
                                    document: { num: 3 }
                                }
                            },
                            {
                                updateOne: {
                                    filter: { num: 6 },
                                    update: { num: 8 },
                                    timestamps: false
                                }
                            },
                            {
                                updateMany: {
                                    filter: { num: 5 },
                                    update: { num: 10 },
                                    timestamps: false
                                }
                            }
                        ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function gh14003() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, TestModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({ name: String });
                    TestModel = (0, mongoose_1.model)('Test', schema);
                    return [4 /*yield*/, TestModel.validate({ name: 'foo' }, ['name'])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, TestModel.validate({ name: 'foo' }, { pathsToSkip: ['name'] })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function gh14114() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, Test, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = new mongoose_1.default.Schema({ name: String });
                    Test = mongoose_1.default.model('Test', schema);
                    _a = tsd_1.expectType;
                    return [4 /*yield*/, Test.findOneAndDelete({ name: 'foo' })];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13999() {
    return __awaiter(this, void 0, void 0, function () {
        var RepositoryBase;
        return __generator(this, function (_a) {
            RepositoryBase = /** @class */ (function () {
                function RepositoryBase(schemaModel) {
                    this.model = schemaModel;
                }
                RepositoryBase.prototype.insertMany = function (elems) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.model.insertMany(elems, { session: null })];
                                case 1:
                                    elems = _a.sent();
                                    return [2 /*return*/, elems];
                            }
                        });
                    });
                };
                return RepositoryBase;
            }());
            return [2 /*return*/];
        });
    });
}
function gh4727() {
    var userSchema = new mongoose_1.default.Schema({
        name: String
    });
    var companySchema = new mongoose_1.default.Schema({
        name: String,
        users: [{ ref: 'User', type: mongoose_1.default.Schema.Types.ObjectId }]
    });
    mongoose_1.default.model('UserTestHydrate', userSchema);
    var Company = mongoose_1.default.model('CompanyTestHyrdrate', companySchema);
    var users = [{ _id: new mongoose_1.default.Types.ObjectId(), name: 'Val' }];
    var company = { _id: new mongoose_1.default.Types.ObjectId(), name: 'Booster', users: [users[0]] };
    return Company.hydrate(company, {}, { hydratedPopulatedDocs: true });
}
function gh14440() {
    return __awaiter(this, void 0, void 0, function () {
        var testSchema, TestModel, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testSchema = new mongoose_1.Schema({
                        dateProperty: { type: Date }
                    });
                    TestModel = (0, mongoose_1.model)('Test', testSchema);
                    doc = new TestModel();
                    return [4 /*yield*/, TestModel.bulkWrite([
                            {
                                updateOne: {
                                    filter: { _id: doc._id },
                                    update: { dateProperty: (new Date('2023-06-01')).toISOString() }
                                }
                            }
                        ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function gh12064() {
    return __awaiter(this, void 0, void 0, function () {
        var FooSchema, MyRecordSchema, MyRecord, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    FooSchema = new mongoose_1.Schema({
                        one: { type: String }
                    });
                    MyRecordSchema = new mongoose_1.Schema({
                        _id: { type: String },
                        foo: { type: FooSchema },
                        arr: [Number]
                    });
                    MyRecord = (0, mongoose_1.model)('MyRecord', MyRecordSchema);
                    _a = tsd_1.expectType;
                    return [4 /*yield*/, MyRecord.distinct('foo.one').exec()];
                case 1:
                    _a.apply(void 0, [_e.sent()]);
                    _b = tsd_1.expectType;
                    return [4 /*yield*/, MyRecord.find().distinct('foo.one').exec()];
                case 2:
                    _b.apply(void 0, [_e.sent()]);
                    _c = tsd_1.expectType;
                    return [4 /*yield*/, MyRecord.distinct('foo.two').exec()];
                case 3:
                    _c.apply(void 0, [_e.sent()]);
                    _d = tsd_1.expectType;
                    return [4 /*yield*/, MyRecord.distinct('arr.0').exec()];
                case 4:
                    _d.apply(void 0, [_e.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function testWithLevel1NestedPaths() {
    (0, tsd_1.expectType)({});
    var FooSchema = new mongoose_1.Schema({
        one: { type: String }
    });
    var schema = new mongoose_1.Schema({
        _id: { type: String },
        foo: { type: FooSchema }
    });
    (0, tsd_1.expectAssignable)({});
}
function gh14802() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, Model, conn2;
        return __generator(this, function (_a) {
            schema = new mongoose_1.default.Schema({
                name: String
            });
            Model = (0, mongoose_1.model)('Test', schema);
            conn2 = mongoose_1.default.createConnection('mongodb://127.0.0.1:27017/mongoose_test');
            Model.useConnection(conn2);
            return [2 /*return*/];
        });
    });
}
function gh14843() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, Model, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.default.Schema({
                        name: String
                    });
                    Model = (0, mongoose_1.model)('Test', schema);
                    return [4 /*yield*/, Model.insertOne({ name: 'taco' })];
                case 1:
                    doc = _a.sent();
                    (0, tsd_1.expectType)(doc);
                    return [2 /*return*/];
            }
        });
    });
}
function gh15369() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, Model, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.default.Schema({
                        name: String
                    });
                    Model = (0, mongoose_1.model)('Test', schema);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Model.bulkSave([])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof mongoose_1.default.Error.MongooseBulkSaveIncompleteError) {
                        console.log('Bulk save error');
                    }
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function gh15437() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, PersonModel, data, doc1;
        return __generator(this, function (_a) {
            schema = new mongoose_1.default.Schema({
                name: String,
                age: Number,
                address: String
            });
            PersonModel = (0, mongoose_1.model)('Person', schema);
            data = { name: 'John Doe', age: 30, address: '123 Main St' };
            doc1 = PersonModel.hydrate(data, 'name age');
            (0, tsd_1.expectType)(doc1.name);
            (0, tsd_1.expectType)(doc1.age);
            (0, tsd_1.expectAssignable)(doc1.address);
            return [2 /*return*/];
        });
    });
}
function customModelInstanceWithStatics() {
    return __awaiter(this, void 0, void 0, function () {
        var schema;
        return __generator(this, function (_a) {
            schema = new mongoose_1.Schema({ name: { type: String, required: true } }, {
                statics: {
                    function: function () {
                        (0, tsd_1.expectType)(this.someCustomProp);
                    }
                }
            });
            return [2 /*return*/];
        });
    });
}
