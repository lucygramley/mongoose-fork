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
// Use the mongodb ObjectId to make instanceof calls possible
var mongodb_1 = require("mongodb");
var tsd_1 = require("tsd");
var childSchema = new mongoose_1.Schema({ name: String });
var ChildModel = (0, mongoose_1.model)('Child', childSchema);
var ParentModel = (0, mongoose_1.model)('Parent', new mongoose_1.Schema({
    child: { type: 'ObjectId', ref: 'Child' },
    name: String
}));
ParentModel.
    findOne({}).
    populate('child').
    orFail().
    then(function (doc) {
    var child = doc.child;
    if (child == null || child instanceof mongodb_1.ObjectId) {
        throw new Error('should be populated');
    }
    else {
        useChildDoc(child);
    }
    var lean = doc.toObject();
    var leanChild = lean.child;
    if (leanChild == null || leanChild instanceof mongodb_1.ObjectId) {
        throw new Error('should be populated');
    }
    else {
        var name_1 = leanChild.name;
        (0, tsd_1.expectError)(leanChild.save());
    }
});
function useChildDoc(child) {
    console.log(child.name.trim());
}
var personSchema = new mongoose_1.Schema({
    name: String,
    stories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Story' }]
});
var storySchema = new mongoose_1.Schema({
    title: String,
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Person' },
    fans: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Person' }]
});
var Person = (0, mongoose_1.model)('Person', personSchema);
var Story = (0, mongoose_1.model)('Story', storySchema);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var story;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Story.findOne().orFail()];
            case 1:
                story = _a.sent();
                return [4 /*yield*/, story.populate('author')];
            case 2:
                _a.sent();
                return [4 /*yield*/, story.populate({ path: 'fans' })];
            case 3:
                _a.sent();
                return [4 /*yield*/, story.populate({ path: 'fans', model: Person })];
            case 4:
                _a.sent();
                return [4 /*yield*/, story.populate(['author'])];
            case 5:
                _a.sent();
                return [4 /*yield*/, story.populate([{ path: 'fans' }])];
            case 6:
                _a.sent();
                return [4 /*yield*/, story.populate(['author', { path: 'fans' }])];
            case 7:
                _a.sent();
                return [4 /*yield*/, Story.findOne().populate(['author'])];
            case 8:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
function documentDepopulate() {
    return __awaiter(this, void 0, void 0, function () {
        var story;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Story.findOne().populate('author').orFail()];
                case 1:
                    story = _a.sent();
                    story.depopulate('author');
                    story.depopulate(['author']);
                    story.depopulate();
                    return [2 /*return*/];
            }
        });
    });
}
function testPathsParam() {
    return __awaiter(this, void 0, void 0, function () {
        var story, name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Story.findOne().populate('author').orFail()];
                case 1:
                    story = _a.sent();
                    if (story.author.name === undefined) {
                        return [2 /*return*/];
                    }
                    name = story.author.name;
                    return [2 /*return*/];
            }
        });
    });
}
function gh11014() {
    var ParentModel = (0, mongoose_1.model)('Parent', new mongoose_1.Schema({
        child: { type: 'ObjectId', ref: 'Child' },
        name: String
    }));
    var childSchema = new mongoose_1.Schema({ name: String });
    var ChildModel = (0, mongoose_1.model)('Child', childSchema);
    // Populate with `Paths` generic `{ child: Child }` to override `child` path
    ParentModel.find({})
        .populate('child')
        .orFail()
        .then(function (parents) {
        parents.map(function (p) { return p.child.name; });
    });
}
function gh11321() {
    var parentSchema = new mongoose_1.Schema({
        child: { type: 'ObjectId', ref: 'Child' },
        name: String
    });
    parentSchema.virtual('test', {
        localField: function (doc) {
            if (typeof doc.name === 'string') {
                return doc.name;
            }
            return 'foo';
        },
        foreignField: function (doc) {
            if (typeof doc.name === 'string') {
                return doc.name;
            }
            return 'foo';
        }
    });
}
function gh11503() {
    var FriendSchema = new mongoose_1.Schema({
        blocked: Boolean
    });
    var userSchema = new mongoose_1.Schema({
        friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'friends' }]
    });
    var User = (0, mongoose_1.model)('friends', userSchema);
    User.findOne({}).populate('friends').then(function (user) {
        if (!user)
            return;
        (0, tsd_1.expectType)(user === null || user === void 0 ? void 0 : user.friends[0]);
        (0, tsd_1.expectError)(user === null || user === void 0 ? void 0 : user.friends[0].blocked);
        (0, tsd_1.expectError)(user === null || user === void 0 ? void 0 : user.friends.map(function (friend) { return friend.blocked; }));
    });
    User.findOne({}).populate('friends').then(function (user) {
        if (!user)
            return;
        (0, tsd_1.expectAssignable)(user === null || user === void 0 ? void 0 : user.friends[0]);
        (0, tsd_1.expectType)(user === null || user === void 0 ? void 0 : user.friends[0].blocked);
        var firstFriendBlockedValue = user === null || user === void 0 ? void 0 : user.friends.map(function (friend) { return friend; })[0];
        (0, tsd_1.expectType)(firstFriendBlockedValue === null || firstFriendBlockedValue === void 0 ? void 0 : firstFriendBlockedValue.blocked);
    });
}
function gh11544() {
    var userSchema = new mongoose_1.Schema({
        friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'friends' }]
    });
    var User = (0, mongoose_1.model)('friends', userSchema);
    User.findOne({}).populate({ path: 'friends', strictPopulate: false });
    User.findOne({}).populate({ path: 'friends', strictPopulate: true });
    User.findOne({}).populate({ path: 'friends', populate: { path: 'someNestedPath', strictPopulate: false } });
}
function gh11862() {
    var t = { type: 'ObjectId', refPath: 'userType' };
    var userSchema = new mongoose_1.Schema({
        userType: String,
        friend: { type: 'ObjectId', refPath: 'userType' }
    });
    var User = (0, mongoose_1.model)('friends', userSchema);
    User.findOne({}).populate('friend');
}
function _11532() {
    return __awaiter(this, void 0, void 0, function () {
        var parentSchema, parent, populateQuery, populateResult, leanResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parentSchema = new mongoose_1.Schema({
                        name: { type: String, required: true },
                        child: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Child', required: true }
                    });
                    parent = (0, mongoose_1.model)('Parent', parentSchema);
                    populateQuery = parent.findOne().populate('child');
                    return [4 /*yield*/, populateQuery];
                case 1:
                    populateResult = _a.sent();
                    return [4 /*yield*/, populateQuery.lean()];
                case 2:
                    leanResult = _a.sent();
                    if (!populateResult)
                        return [2 /*return*/];
                    (0, tsd_1.expectType)(populateResult.child.name);
                    if (!leanResult)
                        return [2 /*return*/];
                    (0, tsd_1.expectType)(leanResult.child.name);
                    return [2 /*return*/];
            }
        });
    });
}
function gh11710() {
    return __awaiter(this, void 0, void 0, function () {
        var ParentModel, childSchema, ChildModel, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ParentModel = (0, mongoose_1.model)('Parent', new mongoose_1.Schema({
                        child: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Child' },
                        name: String
                    }));
                    childSchema = new mongoose_1.Schema({ name: String });
                    ChildModel = (0, mongoose_1.model)('Child', childSchema);
                    return [4 /*yield*/, ParentModel.findOne({}).populate('child').orFail()];
                case 1:
                    doc = _a.sent();
                    (0, tsd_1.expectType)(doc.child);
                    return [2 /*return*/];
            }
        });
    });
}
function gh11758() {
    return __awaiter(this, void 0, void 0, function () {
        var nestedChildSchema, ParentModel, NestedChildModel, parent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nestedChildSchema = new mongoose_1.Schema({ name: String });
                    ParentModel = (0, mongoose_1.model)('Parent', new mongoose_1.Schema({
                        nestedChild: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NestedChild' },
                        name: String
                    }));
                    NestedChildModel = (0, mongoose_1.model)('NestedChild', nestedChildSchema);
                    parent = new ParentModel({
                        nestedChild: new NestedChildModel({ name: 'test' }),
                        name: 'Parent'
                    }).$assertPopulated('nestedChild');
                    (0, tsd_1.expectType)(parent.nestedChild.name);
                    return [4 /*yield*/, parent.save()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function gh11955() {
    return __awaiter(this, void 0, void 0, function () {
        var ParentModel, childSchema, parent, populatedParent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ParentModel = (0, mongoose_1.model)('Parent', new mongoose_1.Schema({
                        children: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Child' }],
                        name: String
                    }));
                    childSchema = new mongoose_1.Schema({ name: String });
                    (0, mongoose_1.model)('Child', childSchema);
                    return [4 /*yield*/, ParentModel.findOne({}).exec()];
                case 1:
                    parent = _a.sent();
                    return [4 /*yield*/, parent.populate('child')];
                case 2:
                    populatedParent = _a.sent();
                    populatedParent.children.find(function (_a) {
                        var name = _a.name;
                        return console.log(name);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function gh12136() {
    var Child = /** @class */ (function () {
        function Child() {
        }
        return Child;
    }());
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
}
function gh13070() {
    return __awaiter(this, void 0, void 0, function () {
        var parentSchema, childSchema, Parent, Child, doc, doc2, name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parentSchema = new mongoose_1.Schema({
                        name: { type: String, required: true },
                        child: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Child', required: true }
                    });
                    childSchema = new mongoose_1.Schema({
                        name: { type: String, required: true },
                        parent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Parent', required: true }
                    });
                    Parent = (0, mongoose_1.model)('Parent', parentSchema);
                    Child = (0, mongoose_1.model)('Child', childSchema);
                    return [4 /*yield*/, Parent.findOne().orFail()];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, Child.populate(doc, 'child')];
                case 2:
                    doc2 = _a.sent();
                    name = doc2.child.name;
                    return [2 /*return*/];
            }
        });
    });
}
function gh14441() {
    var ParentModel = (0, mongoose_1.model)('Parent', new mongoose_1.Schema({
        child: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Child' },
        name: String
    }));
    var childSchema = new mongoose_1.Schema({ name: String });
    (0, mongoose_1.model)('Child', childSchema);
    ParentModel.findOne({})
        .populate('child')
        .orFail()
        .then(function (doc) {
        (0, tsd_1.expectType)(doc.child.name);
        var docObject = doc.toObject();
        (0, tsd_1.expectType)(docObject.child.name);
    });
    ParentModel.findOne({})
        .populate('child')
        .lean()
        .orFail()
        .then(function (doc) {
        (0, tsd_1.expectType)(doc.child.name);
    });
    ParentModel.find({})
        .populate('child')
        .orFail()
        .then(function (docs) {
        (0, tsd_1.expectType)(docs[0].child.name);
        var docObject = docs[0].toObject();
        (0, tsd_1.expectType)(docObject.child.name);
    });
}
function gh14574() {
    return __awaiter(this, void 0, void 0, function () {
        var userSchema, userModel, UserModel, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userSchema = new mongoose_1.Schema({
                        firstName: String,
                        lastName: String,
                        friend: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
                    }, {
                        methods: {
                            fullName: function () {
                                return "".concat(this.firstName, " ").concat(this.lastName);
                            }
                        }
                    });
                    userModel = (0, mongoose_1.model)('User', userSchema);
                    UserModel = function () { return userModel; };
                    return [4 /*yield*/, UserModel()
                            .findOne({ firstName: 'b' })
                            .populate('friend')
                            .orFail()
                            .exec()];
                case 1:
                    user = _a.sent();
                    (0, tsd_1.expectType)(user.fullName());
                    (0, tsd_1.expectType)(user.friend.fullName());
                    return [2 /*return*/];
            }
        });
    });
}
function gh15111() {
    return __awaiter(this, void 0, void 0, function () {
        var childSchema, ChildModel, parentSchema, ParentModel, parents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    childSchema = new mongoose_1.Schema({
                        name: {
                            type: 'String',
                            required: true,
                            trim: true
                        }
                    });
                    ChildModel = mongoose_1.default.model('Child', childSchema);
                    parentSchema = new mongoose_1.Schema({
                        name: {
                            type: 'String',
                            required: true,
                            trim: true
                        },
                        surname: {
                            type: 'String',
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
                    ParentModel = mongoose_1.default.model('Parent', parentSchema);
                    return [4 /*yield*/, ParentModel.find().populate('child')];
                case 1:
                    parents = _a.sent();
                    (0, tsd_1.expectType)(parents[0].fullName);
                    return [2 /*return*/];
            }
        });
    });
}
