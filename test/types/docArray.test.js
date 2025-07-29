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
function gh10293() {
    return __awaiter(this, void 0, void 0, function () {
        var testSchema, TestModel;
        return __generator(this, function (_a) {
            testSchema = new mongoose_1.Schema({
                name: {
                    type: String,
                    required: true
                },
                arrayOfArray: [[String]]
            });
            TestModel = (0, mongoose_1.model)('gh10293TestModel', testSchema);
            testSchema.methods.getArrayOfArray = function () {
                var test = this.toObject();
                (0, tsd_1.expectType)(test.arrayOfArray);
                return test.arrayOfArray; // <-- error here if the issue persisted
            };
            return [2 /*return*/];
        });
    });
}
function gh13087() {
    (0, tsd_1.expectError)(new mongoose_1.Types.DocumentArray([1, 2, 3]));
    var locationSchema = new mongoose_1.Schema({
        type: {
            required: true,
            type: String,
            enum: ['Point']
        },
        coordinates: {
            required: true,
            type: [Number] // [longitude, latitude]
        }
    }, { _id: false });
    var pointSchema = new mongoose_1.Schema({
        name: { required: true, type: String },
        location: { required: true, type: locationSchema }
    });
    var routeSchema = new mongoose_1.Schema({
        points: { type: [pointSchema] }
    });
    function getTestRouteData() {
        return {
            points: new mongoose_1.Types.DocumentArray([
                { name: 'Test', location: { type: 'Point', coordinates: [1, 2] } }
            ])
        };
    }
    var points = getTestRouteData().points;
    (0, tsd_1.expectType)(points);
}
function gh13424() {
    return __awaiter(this, void 0, void 0, function () {
        var subDoc, testSchema, TestModel, doc;
        return __generator(this, function (_a) {
            subDoc = {
                name: { type: String, required: true },
                controls: { type: String, required: true }
            };
            testSchema = new mongoose_1.Schema({
                question: { type: String, required: true },
                subDocArray: { type: [subDoc], required: true }
            });
            TestModel = (0, mongoose_1.model)('Test', testSchema);
            doc = new TestModel();
            (0, tsd_1.expectType)(doc.subDocArray[0]._id);
            return [2 /*return*/];
        });
    });
}
function gh14367() {
    return __awaiter(this, void 0, void 0, function () {
        var UserSchema;
        return __generator(this, function (_a) {
            UserSchema = new mongoose_1.Schema({
                reminders: {
                    type: [
                        {
                            type: { type: mongoose_1.Schema.Types.String },
                            date: { type: mongoose_1.Schema.Types.Date },
                            toggle: { type: mongoose_1.Schema.Types.Boolean },
                            notified: { type: mongoose_1.Schema.Types.Boolean }
                        }
                    ],
                    default: [
                        { type: 'vote', date: new Date(), toggle: false, notified: false },
                        { type: 'daily', date: new Date(), toggle: false, notified: false },
                        { type: 'drop', date: new Date(), toggle: false, notified: false },
                        { type: 'claim', date: new Date(), toggle: false, notified: false },
                        { type: 'work', date: new Date(), toggle: false, notified: false }
                    ]
                },
                avatar: {
                    type: mongoose_1.Schema.Types.String
                }
            }, { timestamps: true });
            (0, tsd_1.expectType)({});
            (0, tsd_1.expectType)({});
            (0, tsd_1.expectType)({});
            (0, tsd_1.expectType)({});
            return [2 /*return*/];
        });
    });
}
function gh14469() {
    var _a, _b;
    var userSchema = new mongoose_1.Schema({
        names: [new mongoose_1.Schema({ firstName: String })]
    }, { timestamps: true });
    // Create model
    var UserModel = (0, mongoose_1.model)('User', userSchema);
    var doc = new UserModel({ names: [{ firstName: 'John' }] });
    var jsonDoc = doc === null || doc === void 0 ? void 0 : doc.toJSON();
    (0, tsd_1.expectType)((_a = jsonDoc === null || jsonDoc === void 0 ? void 0 : jsonDoc.names[0]) === null || _a === void 0 ? void 0 : _a.firstName);
    var jsonNames = (_b = doc === null || doc === void 0 ? void 0 : doc.names[0]) === null || _b === void 0 ? void 0 : _b.toJSON();
    (0, tsd_1.expectType)(jsonNames === null || jsonNames === void 0 ? void 0 : jsonNames.firstName);
}
function gh15041() {
    var subDoc = {
        name: { type: String, required: true },
        age: { type: Number, required: true }
    };
    var testSchema = new mongoose_1.Schema({
        subdocArray: { type: [subDoc], required: true }
    });
    var TestModel = (0, mongoose_1.model)('Test', testSchema);
    var doc = new TestModel({ subdocArray: [{ name: 'John', age: 30 }] });
    (0, tsd_1.expectType)(doc.subdocArray.splice(0, 1, { name: 'Bill' }));
}
