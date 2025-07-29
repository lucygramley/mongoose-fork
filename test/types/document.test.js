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
var connection_test_1 = require("./connection.test");
var Drink = (0, mongoose_1.model)('Drink', new mongoose_1.Schema({
    name: String
}));
var schema = new mongoose_1.Schema({
    name: { type: 'String', required: true },
    address: new mongoose_1.Schema({ city: { type: String, required: true } }),
    favoritDrink: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: Drink
    }
});
var Test = (0, mongoose_1.model)('Test', schema);
void function main() {
    return __awaiter(this, void 0, void 0, function () {
        var doc, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, Test.findOne().orFail()];
                case 1:
                    doc = _e.sent();
                    _a = tsd_1.expectType;
                    return [4 /*yield*/, doc.deleteOne()];
                case 2:
                    _a.apply(void 0, [_e.sent()]);
                    _b = tsd_1.expectType;
                    return [4 /*yield*/, doc.deleteOne().findOne()];
                case 3:
                    _b.apply(void 0, [_e.sent()]);
                    _c = tsd_1.expectAssignable;
                    return [4 /*yield*/, doc.deleteOne().findOne().lean()];
                case 4:
                    _c.apply(void 0, [_e.sent()]);
                    _d = tsd_1.expectNotAssignable;
                    return [4 /*yield*/, doc.deleteOne().findOne().lean()];
                case 5:
                    _d.apply(void 0, [_e.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}();
void function run() {
    return __awaiter(this, void 0, void 0, function () {
        var user, error, _error;
        return __generator(this, function (_a) {
            user = new Test({ name: {}, address: {} });
            error = user.validateSync();
            if (error != null) {
                _error = error.errors.address;
            }
            return [2 /*return*/];
        });
    });
}();
(function () {
    var test = new Test();
    test.validate({ pathsToSkip: ['hello'] });
    test.validate({ pathsToSkip: 'name age' });
    test.validateSync({ pathsToSkip: ['name', 'age'] });
    test.validateSync({ pathsToSkip: 'name age' });
    test.validateSync({ pathsToSkip: 'name age', blub: 1 });
    var x = test.save();
    (0, tsd_1.expectAssignable)(test.save());
    (0, tsd_1.expectAssignable)(test.save({}));
})();
function gh10526(arg1) {
    var t = new arg1({ name: 'hello' });
}
function testMethods() {
    var schema = new mongoose_1.Schema({ first: String, last: String });
    schema.methods.fullName = function () {
        return this.first + ' ' + this.last;
    };
    var UserModel = (0, mongoose_1.model)('User', schema);
    var doc = new UserModel({ first: 'test', last: 'test' });
    (0, tsd_1.expectType)(doc.fullName());
}
function testRequiredId() {
    var _this = this;
    var FooSchema = new mongoose_1.Schema({
        _id: String,
        label: { type: String }
    });
    var Foo = (0, mongoose_1.model)('Foo', FooSchema);
    var createFoo = function (foo) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Foo.create(foo)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
}
function gh11117() {
    return __awaiter(this, void 0, void 0, function () {
        var fooSchema, fooModel, items, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fooSchema = new mongoose_1.Schema({
                        someDate: { required: true, type: Date },
                        someId: { required: true, type: mongoose_1.Schema.Types.ObjectId },
                        someNumber: { required: true, type: Number },
                        someString: { required: true, type: String }
                    });
                    fooModel = (0, mongoose_1.model)('foos', fooSchema);
                    return [4 /*yield*/, fooModel.create([
                            {
                                someId: new mongoose_1.Types.ObjectId(),
                                someDate: new Date(),
                                someNumber: 5,
                                someString: 'test'
                            }
                        ])];
                case 1:
                    items = _a.sent();
                    json = items[0].toJSON();
                    (0, tsd_1.expectType)(json.someDate);
                    return [2 /*return*/];
            }
        });
    });
}
function gh11085() {
    var userSchema = new mongoose_1.Schema({
        username: String,
        email: String
    });
    var UserModel = (0, mongoose_1.model)('User', userSchema);
    var newUser = new UserModel();
    var _id;
    (0, tsd_1.expectError)(_id = newUser._id);
    var _id2 = newUser._id;
}
function gh11435() {
    var ItemSchema = new mongoose_1.Schema({ name: String });
    ItemSchema.pre('validate', function preValidate() {
        (0, tsd_1.expectType)(this.$model('Item1'));
    });
}
function gh11598() {
    return __awaiter(this, void 0, void 0, function () {
        var doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Test.findOne().orFail()];
                case 1:
                    doc = _a.sent();
                    doc.populate('favoritDrink', undefined, (0, mongoose_1.model)('temp', new mongoose_1.Schema()));
                    return [2 /*return*/];
            }
        });
    });
}
function autoTypedDocument() {
    var AutoTypedModel = (0, models_test_1.autoTypedModel)();
    var AutoTypeModelInstance = new AutoTypedModel({ unExistProperty: 1, description: 2 });
    (0, tsd_1.expectType)(AutoTypeModelInstance.userName);
    (0, tsd_1.expectType)(AutoTypeModelInstance.favoritDrink);
    (0, tsd_1.expectType)(AutoTypeModelInstance.favoritColorMode);
    // Document-Methods-tests
    (0, tsd_1.expectType)(new AutoTypedModel().instanceFn());
}
function autoTypedDocumentConnection() {
    var AutoTypedModel = (0, connection_test_1.autoTypedModelConnection)();
    var AutoTypeModelInstance = new AutoTypedModel({ unExistProperty: 1, description: 2 });
    (0, tsd_1.expectType)(AutoTypeModelInstance.userName);
    (0, tsd_1.expectType)(AutoTypeModelInstance.favoritDrink);
    (0, tsd_1.expectType)(AutoTypeModelInstance.favoritColorMode);
    // Document-Methods-tests
    (0, tsd_1.expectType)(new AutoTypedModel().instanceFn());
}
function gh11960() {
    return __awaiter(this, void 0, void 0, function () {
        var NestedSchema, ParentSchema, ParentModel, doc, doc;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    NestedSchema = new mongoose_1.Schema({
                        dummy: { type: String }
                    });
                    ParentSchema = new mongoose_1.Schema({
                        username: { type: String },
                        map: { type: Map, of: String },
                        nested: { type: NestedSchema },
                        nestedArray: [{ type: NestedSchema }]
                    });
                    ParentModel = (0, mongoose_1.model)('Parent', ParentSchema);
                    {
                        doc = new ParentModel({
                            username: 'user1',
                            map: { key1: 'value1', key2: 'value2' },
                            nested: { dummy: 'hello' },
                            nestedArray: [{ dummy: 'hello again' }]
                        });
                        (0, tsd_1.expectType)(doc);
                        (0, tsd_1.expectType)(doc.map);
                        doc.nested.parent();
                        (_a = doc.nestedArray) === null || _a === void 0 ? void 0 : _a[0].parentArray();
                    }
                    return [4 /*yield*/, ParentModel.create({
                            username: 'user1',
                            map: { key1: 'value1', key2: 'value2' },
                            nested: { dummy: 'hello' },
                            nestedArray: [{ dummy: 'hello again' }]
                        })];
                case 1:
                    doc = _c.sent();
                    (0, tsd_1.expectType)(doc);
                    (0, tsd_1.expectType)(doc.map);
                    doc.nested.parent();
                    (_b = doc.nestedArray) === null || _b === void 0 ? void 0 : _b[0].parentArray();
                    return [2 /*return*/];
            }
        });
    });
}
function gh12290() {
    var schema = new mongoose_1.Schema({
        name: String,
        age: Number
    });
    var User = (0, mongoose_1.model)('User', schema);
    var user = new User({ name: 'John', age: 30 });
    user.isDirectModified(['name', 'age']);
    user.isDirectModified('name age');
    user.isDirectModified('name');
}
function gh13878() {
    var schema = new mongoose_1.Schema({
        name: String,
        age: Number
    });
    var User = (0, mongoose_1.model)('User', schema);
    var user = new User({ name: 'John', age: 30 });
    (0, tsd_1.expectType)(user.$model());
    (0, tsd_1.expectType)(user.model());
}
function gh13094() {
    var doc = null;
    (0, tsd_1.expectType)(doc.name);
    // The following currently fails.
    /* type UserDocumentUnknown = HydratedDocument<{ name: string }, Record<string, unknown>>;
  
    const doc2: UserDocumentUnknown = null as any;
    expectType<string>(doc2.name); */
    // The following currently fails.
    /* type UserDocumentAny = HydratedDocument<{ name: string }, Record<string, any>>;
  
    const doc3: UserDocumentAny = null as any;
    expectType<string>(doc3.name); */
}
function gh13738() {
    var schema = new mongoose_1.Schema({
        age: Number,
        dob: Date,
        settings: {
            theme: String,
            alerts: {
                sms: Boolean
            }
        }
    });
    var Person = (0, mongoose_1.model)('Person', schema);
    var person = new Person({ name: 'person', dob: new Date(), settings: { alerts: { sms: true }, theme: 'light' } });
    (0, tsd_1.expectType)(person.get('age'));
    (0, tsd_1.expectType)(person.get('dob'));
    (0, tsd_1.expectType)(person.get('settings'));
}
function gh12959() {
    return __awaiter(this, void 0, void 0, function () {
        var subdocSchema, schema, Model, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subdocSchema = new mongoose_1.Schema({ foo: { type: 'string', required: true } });
                    schema = new mongoose_1.Schema({
                        subdocArray: { type: [subdocSchema], required: true }
                    });
                    Model = (0, mongoose_1.model)('test', schema);
                    return [4 /*yield*/, Model.findById('id').orFail()];
                case 1:
                    doc = _a.sent();
                    (0, tsd_1.expectType)(doc._id);
                    (0, tsd_1.expectType)(doc.__v);
                    (0, tsd_1.expectError)(doc.subdocArray[0].__v);
                    return [2 /*return*/];
            }
        });
    });
}
function gh14876() {
    return __awaiter(this, void 0, void 0, function () {
        var carSchema, userSchema, Car, User, user, car, populatedCar, depopulatedCar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    carSchema = new mongoose_1.Schema({
                        make: { type: String, required: true },
                        model: { type: String, required: true },
                        year: { type: Number, required: true },
                        owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
                    });
                    userSchema = new mongoose_1.Schema({
                        name: String,
                        age: Number
                    });
                    Car = (0, mongoose_1.model)('Car', carSchema);
                    User = (0, mongoose_1.model)('User', userSchema);
                    return [4 /*yield*/, User.create({ name: 'John', age: 25 })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, Car.create({
                            make: 'Toyota',
                            model: 'Camry',
                            year: 2020,
                            owner: user._id
                        })];
                case 2:
                    car = _a.sent();
                    return [4 /*yield*/, Car.findById(car._id)
                            .populate('owner')
                            .exec()];
                case 3:
                    populatedCar = _a.sent();
                    if (!populatedCar)
                        return [2 /*return*/];
                    console.log(populatedCar.owner.name); // outputs John
                    depopulatedCar = populatedCar.depopulate('owner');
                    (0, tsd_1.expectType)(populatedCar.owner);
                    (0, tsd_1.expectType)(depopulatedCar.owner);
                    return [2 /*return*/];
            }
        });
    });
}
function gh15077() {
    return __awaiter(this, void 0, void 0, function () {
        var fooSchema, fooModel, foundFoo, newFoo, createdFoo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fooSchema = new mongoose_1.Schema({
                        state: {
                            type: String,
                            enum: ['on', 'off']
                        }
                    }, { timestamps: true });
                    fooModel = (0, mongoose_1.model)('foo', fooSchema);
                    return [4 /*yield*/, fooModel
                            .findOne({
                            state: 'on'
                        })
                            .lean()
                            .exec()];
                case 1:
                    foundFoo = _a.sent();
                    if (!!foundFoo) return [3 /*break*/, 3];
                    newFoo = {
                        state: 'on'
                        // extra props but irrelevant
                    };
                    return [4 /*yield*/, fooModel.create(newFoo)];
                case 2:
                    createdFoo = _a.sent();
                    foundFoo = createdFoo.toObject();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function gh15316() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, TestModel, doc;
        return __generator(this, function (_a) {
            schema = new mongoose_1.Schema({
                name: { type: String, required: true }
            }, {
                virtuals: {
                    upper: { get: function () { return this.name.toUpperCase(); } }
                }
            });
            TestModel = (0, mongoose_1.model)('Test', schema);
            doc = new TestModel({ name: 'taco' });
            (0, tsd_1.expectType)(doc.toJSON({ virtuals: true }).upper);
            (0, tsd_1.expectType)(doc.toObject({ virtuals: true }).upper);
            return [2 /*return*/];
        });
    });
}
