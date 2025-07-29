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
var personSchema = new mongoose_1.Schema({
    _id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});
var petSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    ownerId: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
});
// Virtual getters and setters
personSchema.virtual('fullName')
    .get(function (value, virtual, doc) {
    return "".concat(this.firstName, " ").concat(this.lastName);
})
    .set(function (value, virtual, doc) {
    var splittedName = value.split(' ');
    this.firstName = splittedName[0];
    this.lastName = splittedName[1];
});
personSchema.virtual('fullNameAlt')
    .get(function () {
    return "".concat(this.firstName, " ").concat(this.lastName);
})
    .set(function (value) {
    var splittedName = value.split(' ');
    this.firstName = splittedName[0];
    this.lastName = splittedName[1];
});
// Populated virtuals
petSchema.virtual('owner', {
    ref: 'Person',
    localField: 'ownerId',
    foreignField: '_id',
    justOne: true,
    autopopulate: true,
    options: {
        match: { isDeleted: false }
    }
});
var Person = (0, mongoose_1.model)('Person', personSchema);
var Pet = (0, mongoose_1.model)('Pet', petSchema);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var person, pet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Person.create({ _id: 1, firstName: 'John', lastName: 'Wick' })];
            case 1:
                person = _a.sent();
                return [4 /*yield*/, Pet.create({ name: 'Andy', ownerId: person._id })];
            case 2:
                _a.sent();
                return [4 /*yield*/, Pet.findOne().orFail().populate('owner')];
            case 3:
                pet = _a.sent();
                console.log(pet.owner.fullName); // John Wick
                return [2 /*return*/];
        }
    });
}); })();
function gh11543() {
    var personSchema = new mongoose_1.Schema({
        _id: { type: Number, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    });
    (0, tsd_1.expectType)(personSchema.virtuals);
}
function autoTypedVirtuals() {
    return __awaiter(this, void 0, void 0, function () {
        var testSchema, TestModel, doc, doc2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testSchema = new mongoose_1.Schema({
                        email: {
                            type: String,
                            required: [true, 'email is required']
                        }
                    }, {
                        virtuals: {
                            domain: {
                                get: function () {
                                    (0, tsd_1.expectType)(this);
                                    return this.email.slice(this.email.indexOf('@') + 1);
                                },
                                set: function () {
                                    (0, tsd_1.expectType)(this);
                                },
                                options: {}
                            }
                        }
                    });
                    TestModel = (0, mongoose_1.model)('AutoTypedVirtuals', testSchema);
                    doc = new TestModel();
                    (0, tsd_1.expectType)(doc.domain);
                    (0, tsd_1.expectType)({});
                    return [4 /*yield*/, TestModel.findOne().orFail()];
                case 1:
                    doc2 = _a.sent();
                    (0, tsd_1.expectType)(doc2.domain);
                    return [2 /*return*/];
            }
        });
    });
}
