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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tsd_1 = require("tsd");
var models_test_1 = require("./models.test");
var childSchema = new mongoose_1.Schema({ name: String });
var ChildModel = (0, mongoose_1.model)('Child', childSchema);
var schema = new mongoose_1.Schema({
    name: { type: 'String' },
    tags: [String],
    child: { type: 'ObjectId', ref: 'Child' },
    docs: [{ _id: 'ObjectId', id: Number, tags: [String] }],
    endDate: Date
});
schema.query._byName = function (name) {
    return this.find({ name: name });
};
schema.query.byName = function (name) {
    (0, tsd_1.expectError)(this.notAQueryHelper());
    return this._byName(name);
};
var Test = (0, mongoose_1.model)('Test', schema);
Test.find({}, {}, { populate: { path: 'child', model: ChildModel, match: true } }).exec().then(function (res) { return console.log(res); });
Test.find().byName('test').byName('test2').orFail().exec().then(console.log);
Test.countDocuments({ name: /Test/ }).exec().then(function (res) { return console.log(res); });
Test.findOne({ 'docs.id': 42 }).exec().then(console.log);
// ObjectId casting
Test.find({ parent: new mongoose_1.Types.ObjectId('0'.repeat(24)) });
Test.find({ parent: '0'.repeat(24) });
Test.find({ parent: { $in: ['0'.repeat(24)] } });
// Operators
Test.find({ name: { $in: ['Test'] } }).exec().then(function (res) { return console.log(res); });
Test.find({ tags: 'test' }).exec();
Test.find({ tags: { $in: ['test'] } }).exec();
Test.find({ tags: /test/ }).exec();
Test.find({ tags: { $in: [/test/] } }).exec();
// Implicit `$in`
Test.find({ name: ['Test1', 'Test2'] }).exec();
// Implicit `$in` for regex string
Test.find({ name: [/Test1/, /Test2/] });
Test.find({ name: { $gte: 'Test' } }, null, { collation: { locale: 'en-us' } }).exec().
    then(function (res) { return console.log(res[0].name); });
Test.findOne().orFail(new Error('bar')).then(function (doc) { return console.log('Found! ' + doc); });
Test.distinct('name').exec().then(function (res) { return console.log(res[0]); });
Test.distinct('name', {}, { collation: { locale: 'en', strength: 2 } }).exec().then(function (res) { return console.log(res[0]); });
Test.findOneAndUpdate({ name: 'test' }, { name: 'test2' }).exec().then(function (res) { return console.log(res); });
Test.findOneAndUpdate({ name: 'test' }, { name: 'test2' }).then(function (res) { return console.log(res); });
Test.findOneAndUpdate({ name: 'test' }, { $set: { name: 'test2' } }).then(function (res) { return console.log(res); });
Test.findOneAndUpdate({ name: 'test' }, { $inc: { age: 2 } }).then(function (res) { return console.log(res); });
Test.findOneAndUpdate({ name: 'test' }, { name: 'test3' }, { upsert: true, new: true }).then(function (res) {
    res.name = 'test4';
});
Test.findOneAndUpdate({ name: 'test' }, { name: 'test3' }, { upsert: true, returnOriginal: false }).then(function (res) {
    res.name = 'test4';
});
Test.findOneAndUpdate({ name: 'test' }, { name: 'test3' }, { includeResultMetadata: true }).then(function (res) {
    console.log(res.ok);
});
Test.findOneAndUpdate({ name: 'test' }, { name: 'test3' }, { new: true, upsert: true, includeResultMetadata: true }).then(function (res) {
    console.log(res.ok);
});
Test.findOneAndReplace({ name: 'test' }, { _id: new mongoose_1.Types.ObjectId(), name: 'test2' }).exec().then(function (res) { return console.log(res); });
Test.findOneAndUpdate({ name: 'test' }, { $addToSet: { tags: 'each' } });
Test.findOneAndUpdate({ name: 'test' }, { $push: { tags: 'each' } });
Test.findOneAndUpdate({ name: 'test' }, { $pull: { docs: { 'nested.id': 1 } } });
Test.findOneAndUpdate({ name: 'test', 'docs.id': 1 }, { $pull: { 'docs.$.tags': 'foo' } });
var update = Math.random() > 0.5 ? { $unset: { 'docs.0': 1 } } : { age: 55 };
Test.findOneAndUpdate({ name: 'test' }, update);
Test.findOneAndUpdate({ name: 'test' }, { $currentDate: { endDate: true } });
Test.findOneAndUpdate({ name: 'test' }, [{ $set: { endDate: true } }]);
Test.findByIdAndUpdate({ name: 'test' }, { name: 'test2' }, function (err, doc) { return console.log(doc); });
Test.findOneAndUpdate({ name: 'test' }, { 'docs.0.myId': '0'.repeat(24) });
// Chaining
Test.findOne().where({ name: 'test' });
Test.where().find({ name: 'test' });
// Projection
var p0 = Test.find().projection({
    age: true,
    parent: 1,
    'docs.id': 1
});
var p1 = Test.find().projection('age docs.id');
var p2 = Test.find().projection();
var p3 = Test.find().projection(null);
(0, tsd_1.expectError)(Test.find({}, { name: 'ss' })); // Only 0 and 1 are allowed
(0, tsd_1.expectError)(Test.find({}, { name: 3 })); // Only 0 and 1 are allowed
(0, tsd_1.expectError)(Test.find({}, { name: true, age: false, endDate: true, tags: 1 })); // Exclusion in a inclusion projection is not allowed
(0, tsd_1.expectError)(Test.find({}, { name: true, age: false, endDate: true })); // Inclusion in a exclusion projection is not allowed
(0, tsd_1.expectError)(Test.find({}, { name: false, age: false, tags: false, child: { name: false }, docs: { myId: false, id: true } })); // Inclusion in a exclusion projection is not allowed in nested objects and arrays
(0, tsd_1.expectError)(Test.find({}, { tags: { something: 1 } })); // array of strings or numbers should only be allowed to be a boolean or 1 and 0
Test.find({}, { name: true, age: true, endDate: true, tags: 1, child: { name: true }, docs: { myId: true, id: true } }); // This should be allowed
Test.find({}, { name: 1, age: 1, endDate: 1, tags: 1, child: { name: 1 }, docs: { myId: 1, id: 1 } }); // This should be allowed
Test.find({}, { _id: 0, name: 1, age: 1, endDate: 1, tags: 1, child: 1, docs: 1 }); // _id is an exception and should be allowed to be excluded
Test.find({}, { name: 0, age: 0, endDate: 0, tags: 0, child: 0, docs: 0 }); // This should be allowed
Test.find({}, { name: 0, age: 0, endDate: 0, tags: 0, child: { name: 0 }, docs: { myId: 0, id: 0 } }); // This should be allowed
Test.find({}, { name: 1, age: 1, _id: 0 }); // This should be allowed since _id is an exception
Test.find({}, { someOtherField: 1 }); // This should be allowed since it's not a field in the schema
(0, tsd_1.expectError)(Test.find({}, { name: { $slice: 1 } })); // $slice should only be allowed on arrays
Test.find({}, { tags: { $slice: 1 } }); // $slice should be allowed on arrays
Test.find({}, { tags: { $slice: [1, 2] } }); // $slice with the format of [ <number to skip>, <number to return> ] should also be allowed on arrays
(0, tsd_1.expectError)(Test.find({}, { age: { $elemMatch: {} } })); // $elemMatch should not be allowed on non arrays
Test.find({}, { docs: { $elemMatch: { id: 'aa' } } }); // $elemMatch should be allowed on arrays
(0, tsd_1.expectError)(Test.find({}, { tags: { $slice: 1, $elemMatch: {} } })); // $elemMatch and $slice should not be allowed together
Test.find({}, { age: 1, tags: { $slice: 5 } }); // $slice should be allowed in inclusion projection
Test.find({}, { age: 0, tags: { $slice: 5 } }); // $slice should be allowed in exclusion projection
Test.find({}, { age: 1, tags: { $elemMatch: {} } }); // $elemMatch should be allowed in inclusion projection
Test.find({}, { age: 0, tags: { $elemMatch: {} } }); // $elemMatch should be allowed in exclusion projection
(0, tsd_1.expectError)(Test.find({}, { 'docs.id': 11 })); // Dot notation should be allowed and does not accept any
(0, tsd_1.expectError)(Test.find({}, { docs: { id: '1' } })); // Dot notation should be able to use a combination with objects
Test.find({}, { docs: { id: false } }); // Dot notation should be allowed with valid values - should correctly handle arrays
Test.find({}, { docs: { id: true } }); // Dot notation should be allowed with valid values - should correctly handle arrays
Test.find({ docs: { $elemMatch: { id: 1 } } }, { 'docs.$': 1 }); // $ projection should be allowed
Test.find({}, { child: 1 }); // Dot notation should be able to use a combination with objects
// Test.find({}, { 'docs.profiles': { name: 1 } }); // 3 levels deep not supported
(0, tsd_1.expectError)(Test.find({}, { 'docs.profiles': { name: 'aa' } })); // should support a combination of dot notation and objects
(0, tsd_1.expectError)(Test.find({}, { endDate: { toString: 1 } }));
(0, tsd_1.expectError)(Test.find({}, { tags: { trim: 1 } }));
(0, tsd_1.expectError)(Test.find({}, { child: { toJSON: 1 } }));
Test.find({}, { age: 1, _id: 0 });
Test.find({}, { name: 0, age: 0, _id: 1 });
// Manual Casting using ProjectionType
Test.find({}, { docs: { unknownParams: 1 } });
// Sorting
Test.find().sort();
Test.find().sort('-name');
Test.find().sort({ name: -1 });
Test.find().sort({ name: 'ascending' });
Test.find().sort(undefined);
Test.find().sort(null);
Test.find().sort([['key', 'ascending']]);
Test.find().sort([['key1', 'ascending'], ['key2', 'descending']]);
(0, tsd_1.expectError)(Test.find().sort({ name: 2 }));
(0, tsd_1.expectError)(Test.find().sort({ name: 'invalidSortOrder' }));
(0, tsd_1.expectError)(Test.find().sort([['key', 'invalid']]));
(0, tsd_1.expectError)(Test.find().sort([['key', false]]));
(0, tsd_1.expectError)(Test.find().sort(['invalid']));
// Super generic query
function testGenericQuery() {
    function findSomething(model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, model.findOne({ something: 'test' }).orFail().exec()];
            });
        });
    }
}
function eachAsync() {
    Test.find().cursor().eachAsync(function (doc) {
        (0, tsd_1.expectType)(doc);
    });
    Test.find().cursor().eachAsync(function (docs) {
        (0, tsd_1.expectType)(docs);
    }, { batchSize: 2 });
}
function gh10617() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, DBModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({
                        date: { type: Date, default: Date.now }, // date created
                        _tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Tag' }]
                    });
                    DBModel = (0, mongoose_1.model)('Meep', schema);
                    return [4 /*yield*/, DBModel.findOne({})];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function gh10757() {
    var MyEnum;
    (function (MyEnum) {
        MyEnum[MyEnum["VALUE1"] = 0] = "VALUE1";
        MyEnum[MyEnum["VALUE2"] = 1] = "VALUE2";
        MyEnum[MyEnum["VALUE3"] = 2] = "VALUE3";
    })(MyEnum || (MyEnum = {}));
    var test = { status: { $in: [MyEnum.VALUE1, MyEnum.VALUE2] } };
}
function gh10857() {
    var test = { status: { $in: ['VALUE1', 'VALUE2'] } };
}
function gh10786() {
    var updateQuery = { name: 'John' };
    if (true) {
        updateQuery.phone = 'XXXX';
    }
}
function gh11156() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, User, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = new mongoose_1.Schema({
                        name: String,
                        age: Number
                    });
                    User = (0, mongoose_1.model)('User', schema);
                    _a = tsd_1.expectType;
                    return [4 /*yield*/, User.findOne({}).orFail()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function gh11041() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, MyModel, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = new mongoose_1.Schema({
                        name: { type: String, required: true },
                        email: { type: String, required: true },
                        avatar: String
                    });
                    MyModel = (0, mongoose_1.model)('User', schema);
                    _a = tsd_1.expectType;
                    return [4 /*yield*/, MyModel.findOne({}).populate('someField').exec()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function gh11306() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, MyModel, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    schema = new mongoose_1.Schema({
                        name: { type: String, required: true },
                        email: { type: String, required: true },
                        avatar: String
                    });
                    MyModel = (0, mongoose_1.model)('User', schema);
                    _a = tsd_1.expectType;
                    return [4 /*yield*/, MyModel.distinct('notThereInSchema')];
                case 1:
                    _a.apply(void 0, [_d.sent()]);
                    _b = tsd_1.expectType;
                    return [4 /*yield*/, MyModel.distinct('name')];
                case 2:
                    _b.apply(void 0, [_d.sent()]);
                    _c = tsd_1.expectType;
                    return [4 /*yield*/, MyModel.distinct('overrideTest')];
                case 3:
                    _c.apply(void 0, [_d.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function autoTypedQuery() {
    var AutoTypedModel = (0, models_test_1.autoTypedModel)();
    var query = AutoTypedModel.find();
    (0, tsd_1.expectType)(AutoTypedModel.find().byUserName(''));
}
function gh11964() {
    var Repository = /** @class */ (function () {
        function Repository() {
        }
        Repository.prototype.find = function (id) {
            var idCondition = id;
            // `as` is necessary because `T` can be `{ id: never }`,
            // so we need to explicitly coerce
            var filter = { id: id };
        };
        return Repository;
    }());
}
function gh14397() {
    var id = 'Test Id';
    var idCondition;
    var filter;
    (0, tsd_1.expectAssignable)(id);
    (0, tsd_1.expectAssignable)({ id: id });
}
function gh12091() {
    var userSchema = new mongoose_1.Schema({
        friendsNames: [String]
    });
    var update = { $addToSet: { friendsNames: 'John Doe' } };
    if (!(update === null || update === void 0 ? void 0 : update.$addToSet)) {
        return;
    }
    update.$addToSet.friendsNames = 'Jane Doe';
}
function gh12142() {
    var schema = new mongoose_1.Schema({ name: String, comments: [{ text: String }] });
    var Test = (0, mongoose_1.model)('Test', schema);
    Test.updateOne({ _id: new mongoose_1.Types.ObjectId() }, {
        $pull: { comments: new mongoose_1.Types.ObjectId() }
    });
}
function gh12342_manual() {
    return __awaiter(this, void 0, void 0, function () {
        var ProjectSchema, ProjectModel, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ProjectSchema = new mongoose_1.Schema({
                        name: String,
                        stars: Number
                    });
                    ProjectSchema.query.byName = function byName(name) {
                        return this.find({ name: name });
                    };
                    ProjectModel = (0, mongoose_1.model)('Project', schema);
                    _a = tsd_1.expectType;
                    return [4 /*yield*/, ProjectModel.findOne().where('stars').gt(1000).byName('mongoose')];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function gh12342_auto() {
    return __awaiter(this, void 0, void 0, function () {
        var ProjectSchema, ProjectModel, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ProjectSchema = new mongoose_1.Schema({
                        name: String,
                        stars: Number
                    }, {
                        query: {
                            byName: function (name) {
                                return this.find({ name: name });
                            }
                        }
                    });
                    ProjectModel = (0, mongoose_1.model)('Project', ProjectSchema);
                    _a = tsd_1.expectType;
                    return [4 /*yield*/, ProjectModel.findOne().where('stars').gt(1000).byName('mongoose')];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function gh11602() {
    return __awaiter(this, void 0, void 0, function () {
        var query, ModelType, updateResult;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    query = Test.findOne();
                    query instanceof mongoose_1.Query;
                    ModelType = (0, mongoose_1.model)('foo', schema);
                    return [4 /*yield*/, ModelType.findOneAndUpdate(query, { $inc: { occurence: 1 } }, {
                            upsert: true,
                            returnDocument: 'after',
                            includeResultMetadata: true
                        })];
                case 1:
                    updateResult = _d.sent();
                    (0, tsd_1.expectError)((_a = updateResult.lastErrorObject) === null || _a === void 0 ? void 0 : _a.modifiedCount);
                    (0, tsd_1.expectType)((_b = updateResult.lastErrorObject) === null || _b === void 0 ? void 0 : _b.updatedExisting);
                    (0, tsd_1.expectType)((_c = updateResult.lastErrorObject) === null || _c === void 0 ? void 0 : _c.upserted);
                    ModelType.findOneAndUpdate({}, {}, { returnDocument: 'before' });
                    ModelType.findOneAndUpdate({}, {}, { returnDocument: 'after' });
                    ModelType.findOneAndUpdate({}, {}, { returnDocument: undefined });
                    ModelType.findOneAndUpdate({}, {}, {});
                    (0, tsd_1.expectError)(ModelType.findOneAndUpdate({}, {}, {
                        returnDocument: 'not-before-or-after'
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
function gh13142() {
    return __awaiter(this, void 0, void 0, function () {
        var BlogSchema, BlogModel, BlogRepository, blogRepository, blog;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    BlogSchema = new mongoose_1.Schema({ title: String });
                    BlogModel = (0, mongoose_1.model)('Blog', BlogSchema);
                    BlogRepository = /** @class */ (function () {
                        function BlogRepository() {
                            this.blogModel = BlogModel;
                        }
                        BlogRepository.prototype.findOne = function (filter, projection, options) {
                            return this.blogModel.findOne(filter, projection, options);
                        };
                        return BlogRepository;
                    }());
                    blogRepository = new BlogRepository();
                    return [4 /*yield*/, blogRepository.findOne({ title: 'test' }, { content: 1 }, { lean: true })];
                case 1:
                    blog = _a.sent();
                    if (!blog)
                        return [2 /*return*/];
                    (0, tsd_1.expectType)(blog);
                    return [2 /*return*/];
            }
        });
    });
}
function gh13224() {
    return __awaiter(this, void 0, void 0, function () {
        var userSchema, UserModel, u1, u2, users, u3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userSchema = new mongoose_1.Schema({ name: String, age: Number });
                    UserModel = (0, mongoose_1.model)('User', userSchema);
                    return [4 /*yield*/, UserModel.findOne().select(['name']).orFail()];
                case 1:
                    u1 = _a.sent();
                    (0, tsd_1.expectType)(u1.name);
                    (0, tsd_1.expectType)(u1.age);
                    (0, tsd_1.expectAssignable)(u1.toObject);
                    return [4 /*yield*/, UserModel.findOne().select(['name']).orFail()];
                case 2:
                    u2 = _a.sent();
                    (0, tsd_1.expectType)(u2.name);
                    (0, tsd_1.expectError)(u2.age);
                    (0, tsd_1.expectAssignable)(u2.toObject);
                    return [4 /*yield*/, UserModel.find().select(['name'])];
                case 3:
                    users = _a.sent();
                    u3 = users[0];
                    (0, tsd_1.expectType)(u3.name);
                    (0, tsd_1.expectError)(u3.age);
                    (0, tsd_1.expectAssignable)(u3.toObject);
                    (0, tsd_1.expectError)(UserModel.findOne().select(['name']).orFail());
                    return [2 /*return*/];
            }
        });
    });
}
function gh13630() {
    (0, tsd_1.expectAssignable)({ $set: { name: 'John' } });
    (0, tsd_1.expectAssignable)({ $unset: { phone: 'test' } });
    (0, tsd_1.expectAssignable)({ $set: { nested: { test: 'foo' } } });
    (0, tsd_1.expectNotAssignable)({ $set: { namee: 'foo' } });
    (0, tsd_1.expectNotAssignable)({ $set: { 'nested.test': 'foo' } });
    var x = { $set: { name: 'John' } };
    (0, tsd_1.expectAssignable)(x);
}
function gh14190() {
    var userSchema = new mongoose_1.Schema({ name: String, age: Number });
    var UserModel = (0, mongoose_1.model)('User', userSchema);
    var doc = yield UserModel.findByIdAndDelete('0'.repeat(24));
    (0, tsd_1.expectType)(doc);
    var res = yield UserModel.findByIdAndDelete('0'.repeat(24), { includeResultMetadata: true });
    (0, tsd_1.expectAssignable)(res);
    var res2 = yield UserModel.find().findByIdAndDelete('0'.repeat(24), { includeResultMetadata: true });
    (0, tsd_1.expectAssignable)(res2);
}
function mongooseQueryOptions() {
    var userSchema = new mongoose_1.Schema({ name: String, age: Number });
    var UserModel = (0, mongoose_1.model)('User', userSchema);
    UserModel.updateOne({ name: 'bar' }, { name: 'baz' }, {
        context: 'query',
        multipleCastError: true,
        overwriteDiscriminatorKey: true,
        runValidators: true,
        sanitizeProjection: true,
        sanitizeFilter: true,
        setDefaultsOnInsert: true,
        strict: true,
        strictQuery: 'throw',
        timestamps: false,
        translateAliases: false
    });
    UserModel.findOne({}, null, {
        lean: true,
        populate: 'test'
    });
}
function gh14473() {
    var AbstractSchema = /** @class */ (function () {
        function AbstractSchema() {
            this._id = 4;
            this.createdAt = new Date();
            this.updatedAt = new Date();
            this.deletedAt = new Date();
        }
        return AbstractSchema;
    }());
    var generateExists = function () {
        var query = { deletedAt: { $ne: null } };
        var query2 = { deletedAt: { $lt: new Date() } };
    };
}
function gh14525() {
    return __awaiter(this, void 0, void 0, function () {
        var doc, doc2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, {}.findOne({}).populate('test').orFail().exec()];
                case 1:
                    doc = _a.sent();
                    doc.func();
                    return [4 /*yield*/, {}.create({})];
                case 2:
                    doc2 = _a.sent();
                    return [4 /*yield*/, {}.findOne({}).populate('test').orFail().exec()];
                case 3:
                    doc2 = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function gh14545() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, M, myDocs, myDoc, myProjections, myProjection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({
                        prop: { type: String },
                        another: { type: String },
                        createdAt: { type: Number },
                        updatedAt: { type: Number }
                    });
                    M = (0, mongoose_1.model)('Test', schema);
                    return [4 /*yield*/, M.find({}).exec()];
                case 1:
                    myDocs = _a.sent();
                    return [4 /*yield*/, M.findOne({}).exec()];
                case 2:
                    myDoc = _a.sent();
                    return [4 /*yield*/, M.find({}).select({ prop: 1 }).exec()];
                case 3:
                    myProjections = _a.sent();
                    (0, tsd_1.expectType)(myProjections);
                    return [4 /*yield*/, M.findOne({}).select({ prop: 1 }).exec()];
                case 4:
                    myProjection = _a.sent();
                    (0, tsd_1.expectType)(myProjection);
                    return [2 /*return*/];
            }
        });
    });
}
function gh14841() {
    var filter = {
        $expr: { $lt: [{ $size: '$owners' }, 10] }
    };
}
function gh15526() {
    return __awaiter(this, void 0, void 0, function () {
        var userSchemaDefinition, UserModel, selection, u1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userSchemaDefinition = { name: String, age: Number };
                    UserModel = (0, mongoose_1.model)('User', new mongoose_1.Schema(userSchemaDefinition));
                    selection = ['name'];
                    return [4 /*yield*/, UserModel.findOne()
                            .select(selection)
                            .orFail()];
                case 1:
                    u1 = _a.sent();
                    (0, tsd_1.expectType)(u1.name);
                    (0, tsd_1.expectError)(u1.age);
                    return [2 /*return*/];
            }
        });
    });
}
function gh14173() {
    return __awaiter(this, void 0, void 0, function () {
        var userSchema, User, _id, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userSchema = new mongoose_1.Schema({
                        name: String,
                        account: {
                            amount: Number,
                            owner: { type: String, default: function () { return 'OWNER'; } },
                            taxIds: [Number]
                        }
                    });
                    User = (0, mongoose_1.model)('User', userSchema);
                    return [4 /*yield*/, User.create({
                            name: 'test',
                            account: {
                                amount: 25,
                                owner: 'test',
                                taxIds: [42]
                            }
                        })];
                case 1:
                    _id = (_a.sent())._id;
                    return [4 /*yield*/, User
                            .findOne({ _id: _id }, { name: 1, account: { amount: 1 } })
                            .orFail()];
                case 2:
                    doc = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function gh3230() {
    return __awaiter(this, void 0, void 0, function () {
        var Test, schema, Test2, D, _id, test, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Test = (0, mongoose_1.model)('Test', new mongoose_1.Schema({ name: String, arr: [{ testRef: { type: 'ObjectId', ref: 'Test2' } }] }));
                    schema = new mongoose_1.Schema({ name: String });
                    Test2 = (0, mongoose_1.model)('Test2', schema);
                    D = Test2.discriminator('D', new mongoose_1.Schema({ prop: String }));
                    return [4 /*yield*/, Test.deleteMany({})];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, Test2.deleteMany({})];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, D.create({ name: 'foo', prop: 'bar' })];
                case 3:
                    _id = (_c.sent())._id;
                    return [4 /*yield*/, Test.create({ name: 'test', arr: [{ testRef: _id }] })];
                case 4:
                    test = _c.sent();
                    _b = (_a = console).log;
                    return [4 /*yield*/, Test.findById(test._id).populate('arr.testRef', { name: 1, prop: 1, _id: 0, __t: 0 })];
                case 5:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
