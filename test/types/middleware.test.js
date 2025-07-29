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
var preMiddlewareFn = function (next, opts) {
    this.$markValid('name');
    if (opts.session) {
        next();
    }
    else {
        next(new Error('Operation must be in Session.'));
    }
};
var schema = new mongoose_1.Schema({ name: { type: 'String' } });
schema.pre('find', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Find', this.getFilter());
            return [2 /*return*/];
        });
    });
});
schema.pre('find', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, tsd_1.expectError)(this.notAFunction());
            return [2 /*return*/];
        });
    });
});
schema.pre('aggregate', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Pipeline', this.pipeline());
            return [2 /*return*/];
        });
    });
});
schema.post('aggregate', function (res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Pipeline', this.pipeline(), res[0]);
            return [2 /*return*/];
        });
    });
});
schema.post('aggregate', function (res, next) {
    (0, tsd_1.expectType)(res);
    next();
});
schema.post('save', function (res, next) {
    (0, tsd_1.expectType)(res);
    next();
});
schema.pre(['save', 'validate'], { query: false, document: true }, function applyChanges() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Test.findOne({})];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
schema.pre('save', function (next, opts) {
    console.log(opts.session);
    next();
});
schema.pre('save', function (next) {
    console.log(this.name);
});
schema.post('save', function (res, next) {
    (0, tsd_1.expectType)(res);
    next();
});
schema.post('save', function () {
    console.log(this.name);
});
schema.post('save', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(this.name);
            return [2 /*return*/];
        });
    });
});
schema.post('save', function (err, res, next) {
    console.log(this.name, err.stack);
});
schema.pre('insertMany', function () {
    var name = this.name;
    return Promise.resolve();
});
schema.pre('insertMany', function () {
    console.log(this.name);
});
schema.pre('insertMany', function (next) {
    console.log(this.name);
    next();
});
schema.pre('insertMany', function (next, doc) {
    console.log(this.name, doc);
    next();
});
schema.pre('insertMany', function (next, docs) {
    console.log(this.name, docs);
    next();
});
schema.pre('bulkWrite', function (next, ops) {
    next();
});
schema.pre('createCollection', function (next, opts) {
    next();
});
schema.pre('estimatedDocumentCount', function (next) { });
schema.post('estimatedDocumentCount', function (count, next) {
    (0, tsd_1.expectType)(count);
    next();
});
schema.pre('countDocuments', function (next) { });
schema.post('countDocuments', function (count, next) {
    (0, tsd_1.expectType)(count);
    next();
});
schema.post('findOneAndDelete', function (res, next) {
    (0, tsd_1.expectType)(res);
    next();
});
schema.post('findOneAndUpdate', function (res, next) {
    (0, tsd_1.expectType)(res);
    next();
});
schema.post('findOneAndReplace', function (res, next) {
    (0, tsd_1.expectType)(res);
    next();
});
var Test = (0, mongoose_1.model)('Test', schema);
function gh11480() {
    var UserSchema = new mongoose_1.Schema({ name: { type: String } });
    UserSchema.pre('save', function (next) {
        (0, tsd_1.expectNotType)(this);
        next();
    });
}
function gh12583() {
    var userSchema = new mongoose_1.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        avatar: String
    });
    userSchema.post('save', { errorHandler: true }, function (error, doc, next) {
        (0, tsd_1.expectType)(error);
        console.log(error.name);
        console.log(doc.name);
    });
}
function gh11257() {
    var schema = new mongoose_1.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        avatar: String
    });
    schema.pre('save', { document: true }, function () {
        (0, tsd_1.expectType)(this);
    });
    schema.pre('updateOne', { document: true, query: false }, function () {
        this.isNew;
    });
    schema.pre('updateOne', { document: false, query: true }, function () {
        this.find();
    });
}
function gh13601() {
    var testSchema = new mongoose_1.Schema({
        name: String
    });
    testSchema.pre('deleteOne', { document: true }, function () {
        (0, tsd_1.expectAssignable)(this);
    });
}
function gh15242() {
    var PostSchema = new mongoose_1.Schema({
        title: { type: String, required: true },
        postTime: {
            type: Date,
            required: true,
            validate: {
                validator: function (postTime) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, true];
                        });
                    });
                }
            }
        }
    });
    var PostModel = (0, mongoose_1.model)('Post', PostSchema);
}
function gh15242WithVirtuals() {
    var PostSchema = new mongoose_1.Schema({
        title: { type: String, required: true },
        postTime: {
            type: Date,
            required: true,
            validate: {
                validator: function (postTime) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (!(this instanceof mongoose_1.Query)) {
                                (0, tsd_1.expectType)(this.myVirtual);
                            }
                            return [2 /*return*/, true];
                        });
                    });
                }
            }
        }
    }, { virtuals: { myVirtual: { get: function () { return 42; } } } });
    var PostModel = (0, mongoose_1.model)('Post', PostSchema);
}
