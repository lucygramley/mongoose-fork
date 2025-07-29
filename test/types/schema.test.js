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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ProfileSchema = void 0;
exports.autoTypedSchema = autoTypedSchema;
var mongoose_1 = require("mongoose");
var mongodb_1 = require("mongodb");
var tsd_1 = require("tsd");
var Genre;
(function (Genre) {
    Genre[Genre["Action"] = 0] = "Action";
    Genre[Genre["Adventure"] = 1] = "Adventure";
    Genre[Genre["Comedy"] = 2] = "Comedy";
})(Genre || (Genre = {}));
var actorSchema = new mongoose_1.Schema({ name: { type: String }, age: { type: Number } });
var movieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        index: 'text'
    },
    featuredIn: {
        type: String,
        enum: ['Favorites', null],
        default: null
    },
    rating: {
        type: Number,
        required: [true, 'Required'],
        min: [0, 'MinValue'],
        max: [5, 'MaxValue']
    },
    genre: {
        type: String,
        enum: Genre,
        required: true
    },
    actionIntensity: {
        type: Number,
        required: [
            function () {
                return this.genre === Genre.Action;
            },
            'Action intensity required for action genre'
        ]
    },
    status: {
        type: String,
        enum: {
            values: ['Announced', 'Released'],
            message: 'Invalid value for `status`'
        }
    },
    actors: {
        type: [actorSchema],
        default: undefined
    }
});
movieSchema.index({ status: 1, 'actors.name': 1 });
movieSchema.index({ title: 'text' }, {
    weights: { title: 10 }
});
movieSchema.index({ rating: -1 });
movieSchema.index({ title: 1 }, { unique: true });
movieSchema.index({ title: 1 }, { unique: [true, 'Title must be unique'] });
movieSchema.index({ tile: 'ascending' });
movieSchema.index({ tile: 'asc' });
movieSchema.index({ tile: 'descending' });
movieSchema.index({ tile: 'desc' });
movieSchema.index({ tile: 'hashed' });
movieSchema.index({ tile: 'geoHaystack' });
(0, tsd_1.expectError)({ tile: 2 }); // test invalid number
(0, tsd_1.expectError)({ tile: -2 }); // test invalid number
(0, tsd_1.expectError)({ tile: '' }); // test empty string
(0, tsd_1.expectError)({ tile: 'invalid' }); // test invalid string
(0, tsd_1.expectError)({ tile: new Date() }); // test invalid type
(0, tsd_1.expectError)({ tile: true }); // test that booleans are not allowed
(0, tsd_1.expectError)({ tile: false }); // test that booleans are not allowed
var ProfileSchemaDef = { age: Number };
exports.ProfileSchema = new mongoose_1.Schema(ProfileSchemaDef);
var ProfileSchemaDef2 = {
    age: mongoose_1.Schema.Types.Number
};
var ProfileSchema2 = new mongoose_1.Schema(ProfileSchemaDef2);
var UserSchemaDef = {
    email: String,
    profile: ProfileSchema2
};
function gh9857() {
    return __awaiter(this, void 0, void 0, function () {
        var u;
        return __generator(this, function (_a) {
            (0, tsd_1.expectError)(u = {
                name: { type: String },
                active: { type: Boolean },
                points: Number
            });
            return [2 /*return*/];
        });
    });
}
function gh10261() {
    var type = [String];
    var colorEntitySchemaDefinition = {
        values: {
            type: type,
            required: true
        }
    };
}
function gh10287() {
    var subSchema = new mongoose_1.Schema({
        testProp: mongoose_1.Schema.Types.String
    });
    var mainSchema1 = new mongoose_1.Schema({
        subProp: subSchema
    });
    var mainSchema2 = new mongoose_1.Schema({
        subProp: {
            type: subSchema
        }
    });
}
function gh10370() {
    var movieSchema = new mongoose_1.Schema({
        actors: {
            type: [actorSchema]
        }
    });
}
function gh10409() {
    var someSchema = new mongoose_1.Schema({
        field: { type: Date }
    });
}
function gh10605() {
    var schema = new mongoose_1.Schema({
        arrayField: [String],
        object: {
            type: {
                value: {
                    type: Number
                }
            }
        }
    });
}
function gh10605_2() {
    var testSchema = new mongoose_1.Schema({
        someObject: { type: [{ id: String }] }
    });
}
function gh10731() {
    var productSchema = new mongoose_1.Schema({
        keywords: {
            type: [
                {
                    type: String,
                    trim: true,
                    lowercase: true,
                    required: true
                }
            ],
            required: true
        }
    });
}
function gh10789() {
    var addressSchema = new mongoose_1.Schema({
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    });
    var userSchema = new mongoose_1.Schema({
        name: {
            type: String,
            required: true
        },
        addresses: {
            type: [
                {
                    type: addressSchema,
                    required: true
                }
            ],
            required: true
        }
    });
}
function gh11439() {
    var bookSchema = new mongoose_1.Schema({
        collection: String
    }, {
        suppressReservedKeysWarning: true
    });
}
function gh11448() {
    var userSchema = new mongoose_1.Schema({ name: String, age: Number });
    userSchema.pick(['age']);
}
function gh11435() {
    var schema = new mongoose_1.Schema({
        ids: {
            type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Something' }],
            default: []
        }
    });
}
// timeSeries
new mongoose_1.Schema({}, { expires: '5 seconds' });
(0, tsd_1.expectError)(new mongoose_1.Schema({}, { expireAfterSeconds: '5 seconds' }));
new mongoose_1.Schema({}, { expireAfterSeconds: 5 });
function gh10900() {
    var patientSchema = new mongoose_1.Schema({
        menuStatus: { type: mongoose_1.Schema.Types.Mixed, default: {} }
    });
}
function autoTypedSchema() {
    // Test auto schema type obtaining with all possible path types.
    var Int8 = /** @class */ (function (_super) {
        __extends(Int8, _super);
        function Int8(key, options) {
            return _super.call(this, key, options, 'Int8') || this;
        }
        Int8.prototype.cast = function (val) {
            var _val = Number(val);
            if (isNaN(_val)) {
                throw new Error('Int8: ' + val + ' is not a number');
            }
            _val = Math.round(_val);
            if (_val < -0x80 || _val > 0x7F) {
                throw new Error('Int8: ' + val +
                    ' is outside of the range of valid 8-bit ints');
            }
            return _val;
        };
        return Int8;
    }(mongoose_1.SchemaType));
    var TestSchema = new mongoose_1.Schema({
        string1: String,
        string2: 'String',
        string3: 'string',
        string4: mongoose_1.Schema.Types.String,
        string5: { type: String, default: 'ABCD' },
        number1: Number,
        number2: 'Number',
        number3: 'number',
        number4: mongoose_1.Schema.Types.Number,
        number5: { type: Number, default: 10 },
        date1: Date,
        date2: 'Date',
        date3: 'date',
        date4: mongoose_1.Schema.Types.Date,
        date5: { type: Date, default: new Date() },
        buffer1: Buffer,
        buffer2: 'Buffer',
        buffer3: 'buffer',
        buffer4: mongoose_1.Schema.Types.Buffer,
        boolean1: Boolean,
        boolean2: 'Boolean',
        boolean3: 'boolean',
        boolean4: mongoose_1.Schema.Types.Boolean,
        boolean5: { type: Boolean, default: true },
        mixed1: Object,
        mixed2: {},
        mixed3: mongoose_1.Schema.Types.Mixed,
        objectId1: mongoose_1.Schema.Types.ObjectId,
        objectId2: 'ObjectId',
        objectId3: 'ObjectID',
        customSchema: Int8,
        map1: { type: Map, of: String },
        map2: { type: Map, of: Number },
        array1: [String],
        array2: Array,
        array3: [mongoose_1.Schema.Types.Mixed],
        array4: [{}],
        array5: [],
        array6: { type: [String] },
        array7: { type: [String], default: undefined },
        array8: { type: [String], default: function () { return undefined; } },
        decimal1: mongoose_1.Schema.Types.Decimal128,
        decimal2: 'Decimal128',
        decimal3: 'decimal128'
    });
    (0, tsd_1.expectType)({});
    var SchemaWithCustomTypeKey = new mongoose_1.Schema({
        name: {
            customTypeKey: String,
            required: true
        }
    }, {
        typeKey: 'customTypeKey'
    });
    (0, tsd_1.expectType)({});
    var AutoTypedSchema = new mongoose_1.Schema({
        userName: {
            type: String,
            required: [true, 'userName is required']
        },
        description: String,
        nested: new mongoose_1.Schema({
            age: {
                type: Number,
                required: true
            },
            hobby: {
                type: String,
                required: false
            }
        }),
        favoritDrink: {
            type: String,
            enum: ['Coffee', 'Tea']
        },
        favoritColorMode: {
            type: String,
            enum: {
                values: ['dark', 'light'],
                message: '{VALUE} is not supported'
            },
            required: true
        },
        friendID: {
            type: mongoose_1.Schema.Types.ObjectId
        },
        nestedArray: {
            type: [
                new mongoose_1.Schema({
                    date: { type: Date, required: true },
                    messages: Number
                })
            ]
        }
    }, {
        statics: {
            staticFn: function () {
                (0, tsd_1.expectType)(this);
                return 'Returned from staticFn';
            }
        },
        methods: {
            instanceFn: function () {
                (0, tsd_1.expectType)(this);
                return 'Returned from DocumentInstanceFn';
            }
        },
        query: {
            byUserName: function (userName) {
                (0, tsd_1.expectAssignable)(this);
                return this.where({ userName: userName });
            }
        }
    });
    return AutoTypedSchema;
}
// discriminator
var eventSchema = new mongoose_1.Schema({ message: String }, { discriminatorKey: 'kind' });
var batchSchema = new mongoose_1.Schema({ name: String }, { discriminatorKey: 'kind' });
batchSchema.discriminator('event', eventSchema);
// discriminator statics
var eventSchema2 = new mongoose_1.Schema({ message: String }, { discriminatorKey: 'kind', statics: { static1: function () {
            return 0;
        } } });
var batchSchema2 = new mongoose_1.Schema({ name: String }, { discriminatorKey: 'kind', statics: { static2: function () {
            return 1;
        } } });
batchSchema2.discriminator('event', eventSchema2);
function encryptionType() {
    var keyId = new mongodb_1.BSON.UUID();
    (0, tsd_1.expectError)(new mongoose_1.Schema({ name: { type: String, encrypt: { keyId: keyId } } }, { encryptionType: 'newFakeEncryptionType' }));
    (0, tsd_1.expectError)(new mongoose_1.Schema({ name: { type: String, encrypt: { keyId: keyId } } }, { encryptionType: 1 }));
    (0, tsd_1.expectType)(new mongoose_1.Schema({ name: { type: String, encrypt: { keyId: keyId } } }, { encryptionType: 'queryableEncryption' }));
    (0, tsd_1.expectType)(new mongoose_1.Schema({ name: { type: String, encrypt: { keyId: keyId } } }, { encryptionType: 'csfle' }));
}
function gh11828() {
    var t = {
        type: Boolean,
        default: function () {
            return this.name === 'Hafez';
        }
    };
    new mongoose_1.Schema({
        name: { type: String, default: function () { return 'Hafez'; } },
        age: { type: Number, default: function () { return 27; } },
        bornAt: { type: Date, default: function () { return new Date(); } },
        isActive: {
            type: Boolean,
            default: function () {
                return this.name === 'Hafez';
            }
        }
    });
}
function gh11997() {
    var userSchema = new mongoose_1.Schema({
        name: { type: String, default: function () { return 'Hafez'; } }
    });
    userSchema.index({ name: 1 }, { weights: { name: 1 } });
}
function gh12003() {
    var baseSchemaOptions = {
        versionKey: false
    };
    var BaseSchema = new mongoose_1.Schema({
        name: String
    }, baseSchemaOptions);
    (0, tsd_1.expectType)({});
    (0, tsd_1.expectType)({});
}
function gh11987() {
    var userSchema = new mongoose_1.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        organization: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Organization' }
    });
    (0, tsd_1.expectType)(userSchema.path('name'));
    (0, tsd_1.expectError)(userSchema.path('name'));
    (0, tsd_1.expectType)(userSchema.path('name').OptionsConstructor);
}
function gh12030() {
    var Schema1 = new mongoose_1.Schema({
        users: [
            {
                username: { type: String }
            }
        ]
    });
    (0, tsd_1.expectType)({});
    (0, tsd_1.expectType)({});
    (0, tsd_1.expectType)({});
    var Schema2 = new mongoose_1.Schema({
        createdAt: { type: Date, default: Date.now }
    });
    (0, tsd_1.expectType)({});
    var Schema3 = new mongoose_1.Schema({
        users: [
            new mongoose_1.Schema({
                username: { type: String },
                credit: { type: Number, default: 0 }
            })
        ]
    });
    (0, tsd_1.expectType)({});
    var Schema4 = new mongoose_1.Schema({
        data: { type: { role: String }, default: {} }
    });
    (0, tsd_1.expectType)({});
    var Schema5 = new mongoose_1.Schema({
        data: { type: { role: Object }, default: {} }
    });
    (0, tsd_1.expectType)({});
    var Schema6 = new mongoose_1.Schema({
        track: {
            backupCount: {
                type: Number,
                default: 0
            },
            count: {
                type: Number,
                default: 0
            }
        }
    });
    (0, tsd_1.expectType)({});
}
function pluginOptions() {
    function pluginFunction(schema, options) {
        return; // empty function, to satisfy lint option
    }
    var schema = new mongoose_1.Schema({});
    (0, tsd_1.expectType)(schema.plugin(pluginFunction)); // test that chaining would be possible
    // could not add strict tests that the parameters are inferred correctly, because i dont know how this would be done in tsd
    // test basic inferrence
    (0, tsd_1.expectError)(schema.plugin(pluginFunction, {})); // should error because "option2" is not optional
    schema.plugin(pluginFunction, { option2: 0 });
    schema.plugin(pluginFunction, { option1: 'string', option2: 1 });
    (0, tsd_1.expectError)(schema.plugin(pluginFunction, { option1: 'string' })); // should error because "option2" is not optional
    (0, tsd_1.expectError)(schema.plugin(pluginFunction, { option2: 'string' })); // should error because "option2" type is "number"
    (0, tsd_1.expectError)(schema.plugin(pluginFunction, { option1: 0 })); // should error because "option1" type is "string"
    // test plugins without options defined
    function pluginFunction2(schema) {
        return; // empty function, to satisfy lint option
    }
    schema.plugin(pluginFunction2);
    (0, tsd_1.expectError)(schema.plugin(pluginFunction2, {})); // should error because no options argument is defined
    // test overwriting options
    schema.plugin(pluginFunction2, { option2: 0 });
    (0, tsd_1.expectError)(schema.plugin(pluginFunction2, {})); // should error because "option2" is not optional
}
function gh12205() {
    var campaignSchema = new mongoose_1.Schema({
        client: {
            type: new mongoose_1.Types.ObjectId(),
            required: true
        }
    });
    var Campaign = (0, mongoose_1.model)('Campaign', campaignSchema);
    var doc = new Campaign();
    (0, tsd_1.expectType)(doc.client);
    (0, tsd_1.expectType)({});
    (0, tsd_1.expectType)({});
    (0, tsd_1.expectType)({});
    (0, tsd_1.expectType)({});
    /* type Baz = Schema.Types.ObjectId extends typeof Schema.Types.ObjectId ? string : number;
    expectType<string>({} as Baz); */
}
function gh12450() {
    var ObjectIdSchema = new mongoose_1.Schema({
        user: { type: mongoose_1.Schema.Types.ObjectId }
    });
    (0, tsd_1.expectType)({});
    var Schema2 = new mongoose_1.Schema({
        createdAt: { type: Date, required: true },
        decimalValue: { type: mongoose_1.Schema.Types.Decimal128, required: true }
    });
    (0, tsd_1.expectType)({});
    var Schema3 = new mongoose_1.Schema({
        createdAt: { type: Date, required: true },
        decimalValue: { type: mongoose_1.Schema.Types.Decimal128 }
    });
    (0, tsd_1.expectType)({});
    var Schema4 = new mongoose_1.Schema({
        createdAt: { type: Date },
        decimalValue: { type: mongoose_1.Schema.Types.Decimal128 }
    });
    (0, tsd_1.expectType)({});
}
function gh12242() {
    var dbExample = new mongoose_1.Schema({
        active: { type: Number, enum: [0, 1], required: true }
    });
    (0, tsd_1.expectType)({});
}
function testInferTimestamps() {
    var schema = new mongoose_1.Schema({
        name: String
    }, { timestamps: true });
    // For some reason, expectType<{ createdAt: Date, updatedAt: Date, name?: string }> throws
    // an error "Parameter type { createdAt: Date; updatedAt: Date; name?: string | undefined; }
    // is not identical to argument type { createdAt: NativeDate; updatedAt: NativeDate; } &
    // { name?: string | undefined; }"
    (0, tsd_1.expectType)({});
    var schema2 = new mongoose_1.Schema({
        name: String
    }, {
        timestamps: true,
        methods: { myName: function () {
                return this.name;
            } }
    });
    // For some reason, expectType<{ createdAt: Date, updatedAt: Date, name?: string }> throws
    // an error "Parameter type { createdAt: Date; updatedAt: Date; name?: string | undefined; }
    // is not identical to argument type { createdAt: NativeDate; updatedAt: NativeDate; } &
    // { name?: string | undefined; }"
    (0, tsd_1.expectType)({});
}
function gh12431() {
    var testSchema = new mongoose_1.Schema({
        testDate: { type: Date },
        testDecimal: { type: mongoose_1.Schema.Types.Decimal128 }
    });
    (0, tsd_1.expectType)({});
}
function gh12593() {
    return __awaiter(this, void 0, void 0, function () {
        var testSchema, Test, doc, doc2, doc3, arrSchema;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testSchema = new mongoose_1.Schema({ x: { type: mongoose_1.Schema.Types.UUID } });
                    (0, tsd_1.expectType)({});
                    Test = (0, mongoose_1.model)('Test', testSchema);
                    return [4 /*yield*/, Test.findOne({ x: '4709e6d9-61fd-435e-b594-d748eb196d8f' }).orFail()];
                case 1:
                    doc = _a.sent();
                    (0, tsd_1.expectType)(doc.x);
                    doc2 = new Test({ x: '4709e6d9-61fd-435e-b594-d748eb196d8f' });
                    (0, tsd_1.expectType)(doc2.x);
                    return [4 /*yield*/, Test.findOne({}).orFail().lean()];
                case 2:
                    doc3 = _a.sent();
                    (0, tsd_1.expectType)(doc3.x);
                    arrSchema = new mongoose_1.Schema({ arr: [{ type: mongoose_1.Schema.Types.UUID }] });
                    (0, tsd_1.expectType)({});
                    return [2 /*return*/];
            }
        });
    });
}
function gh12562() {
    var emailRegExp = /@/;
    var userSchema = new mongoose_1.Schema({
        email: {
            type: String,
            trim: true,
            validate: {
                validator: function (value) { return emailRegExp.test(value); },
                message: 'Email is not valid'
            },
            index: {
                partialFilterExpression: {
                    email: {
                        $exists: true,
                        $ne: null
                    }
                }
            },
            select: false
        }
    });
}
function gh12590() {
    var UserSchema = new mongoose_1.Schema({
        _password: String
    });
    var path = UserSchema.path('hashed_password');
    (0, tsd_1.expectType)(path);
    UserSchema.path('hashed_password').validate(function (v) {
        (0, tsd_1.expectType)(this);
        if (this._password && this._password.length < 8) {
            this.invalidate('password', 'Password must be at least 8 characters.');
        }
    });
}
function gh12611() {
    var reusableFields = {
        description: { type: String, required: true },
        skills: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Skill', default: [] }
    };
    var firstSchema = new mongoose_1.Schema(__assign(__assign({}, reusableFields), { anotherField: String }));
    (0, tsd_1.expectType)({});
}
function gh12782() {
    var schemaObj = { test: { type: String, required: true } };
    var schema = new mongoose_1.Schema(schemaObj);
    (0, tsd_1.expectType)({});
}
function gh12816() {
    var schema = new mongoose_1.Schema({}, { overwriteModels: true });
}
function gh12869() {
    var dbExampleConst = new mongoose_1.Schema({
        active: { type: String, enum: ['foo', 'bar'], required: true }
    });
    (0, tsd_1.expectType)({});
    var dbExample = new mongoose_1.Schema({
        active: { type: String, enum: ['foo', 'bar'], required: true }
    });
    (0, tsd_1.expectType)({});
}
function stringEnumInfer() {
    var StringEnum;
    (function (StringEnum) {
        StringEnum["Foo"] = "foo";
        StringEnum["Bar"] = "bar";
    })(StringEnum || (StringEnum = {}));
    var stringEnumSchema = new mongoose_1.Schema({
        active: { type: String, enum: StringEnum }
    });
    (0, tsd_1.expectType)({});
    var stringEnumSchemaRequired = new mongoose_1.Schema({
        active: { type: String, enum: StringEnum, required: true }
    });
    (0, tsd_1.expectAssignable)({});
}
function gh12882() {
    // Array of strings
    var arrString = new mongoose_1.Schema({
        fooArray: {
            type: [{
                    type: String,
                    required: true
                }],
            required: true
        }
    });
    // Array of numbers using string definition
    var arrNum = new mongoose_1.Schema({
        fooArray: {
            type: [{
                    type: 'Number',
                    required: true
                }],
            required: true
        }
    });
    (0, tsd_1.expectType)({});
    // Array of object with key named "type"
    var arrType = new mongoose_1.Schema({
        fooArray: {
            type: [{
                    type: {
                        type: String,
                        required: true
                    },
                    foo: {
                        type: Number,
                        required: true
                    }
                }],
            required: true
        }
    });
    (0, tsd_1.expectType)({});
    // Readonly array of strings
    var rArrString = new mongoose_1.Schema({
        fooArray: {
            type: [{
                    type: String,
                    required: true
                }],
            required: true
        }
    });
    (0, tsd_1.expectType)({});
    // Readonly array of numbers using string definition
    var rArrNum = new mongoose_1.Schema({
        fooArray: {
            type: [{
                    type: 'Number',
                    required: true
                }],
            required: true
        }
    });
    (0, tsd_1.expectType)({});
    // Readonly array of object with key named "type"
    var rArrType = new mongoose_1.Schema({
        fooArray: {
            type: [{
                    type: {
                        type: String,
                        required: true
                    },
                    foo: {
                        type: Number,
                        required: true
                    }
                }],
            required: true
        }
    });
    (0, tsd_1.expectType)({});
}
function gh13534() {
    var schema = new mongoose_1.Schema({
        myId: { type: mongoose_1.Schema.ObjectId, required: true }
    });
    var Test = (0, mongoose_1.model)('Test', schema);
    var doc = new Test({ myId: '0'.repeat(24) });
    (0, tsd_1.expectType)(doc.myId);
}
function maps() {
    var schema = new mongoose_1.Schema({
        myMap: { type: mongoose_1.Schema.Types.Map, of: Number, required: true }
    });
    var Test = (0, mongoose_1.model)('Test', schema);
    var doc = new Test({ myMap: { answer: 42 } });
    (0, tsd_1.expectType)(doc.myMap);
    (0, tsd_1.expectType)(doc.myMap.get('answer'));
}
function gh13514() {
    var schema = new mongoose_1.Schema({
        email: {
            type: String,
            required: {
                isRequired: true,
                message: 'Email is required'
            }
        }
    });
    var Test = (0, mongoose_1.model)('Test', schema);
    var doc = new Test({ email: 'bar' });
    var str = doc.email;
}
function gh13633() {
    var schema = new mongoose_1.Schema({ name: String });
    schema.pre('updateOne', { document: true, query: false }, function (next) {
    });
    schema.pre('updateOne', { document: true, query: false }, function (next, options) {
        (0, tsd_1.expectType)(options);
    });
    schema.post('save', function (res, next) {
    });
    schema.pre('insertMany', function (next, docs) {
    });
    schema.pre('insertMany', function (next, docs, options) {
        (0, tsd_1.expectType)(options);
    });
}
function gh13702() {
    var schema = new mongoose_1.Schema({ name: String });
    (0, tsd_1.expectType)(schema.indexes());
}
function gh13780() {
    var schema = new mongoose_1.Schema({ num: mongoose_1.Schema.Types.BigInt });
    (0, tsd_1.expectType)(null);
}
function gh13800() {
    // Typed Schema
    var schema = new mongoose_1.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    });
    schema.method('fullName', function fullName() {
        (0, tsd_1.expectType)(this.firstName);
        (0, tsd_1.expectType)(this.lastName);
        (0, tsd_1.expectType)(this.someOtherField);
        (0, tsd_1.expectType)(this.fullName);
    });
    // Auto Typed Schema
    var autoTypedSchema = new mongoose_1.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    });
    autoTypedSchema.method('fullName', function fullName() {
        (0, tsd_1.expectType)(this.firstName);
        (0, tsd_1.expectType)(this.lastName);
        (0, tsd_1.expectError)(this.someOtherField);
    });
}
function gh13797() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            new mongoose_1.Schema({ name: { type: String, required: function () {
                        (0, tsd_1.expectType)(this);
                        return true;
                    } } });
            new mongoose_1.Schema({ name: { type: String, default: function () {
                        (0, tsd_1.expectType)(this);
                        return '';
                    } } });
            return [2 /*return*/];
        });
    });
}
function gh14002() {
    var userIdTypeHint = 'placeholder';
    var schema = new mongoose_1.Schema({
        userId: { type: String, required: true, __typehint: userIdTypeHint }
    });
    (0, tsd_1.expectType)({});
}
function gh14028_methods() {
    // Define methods on schema
    var schema = new mongoose_1.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true }
    }, {
        methods: {
            fullName: function () {
                // Expect type of `this` to have fullName method
                (0, tsd_1.expectType)(this.fullName);
                return this.firstName + ' ' + this.lastName;
            },
            isAdult: function () {
                // Expect type of `this` to have isAdult method
                (0, tsd_1.expectType)(this.isAdult);
                return this.age >= 18;
            }
        }
    });
    var User = (0, mongoose_1.model)('User', schema);
    var user = new User({ firstName: 'John', lastName: 'Doe', age: 20 });
    // Trigger type assertions inside methods
    user.fullName();
    user.isAdult();
    // Expect type of methods to be inferred if accessed directly
    (0, tsd_1.expectType)(schema.methods.fullName);
    (0, tsd_1.expectType)(schema.methods.isAdult);
    // Define methods outside of schema
    var schema2 = new mongoose_1.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true }
    });
    schema2.methods.fullName = function fullName() {
        (0, tsd_1.expectType)(this.fullName);
        return this.firstName + ' ' + this.lastName;
    };
    schema2.methods.isAdult = function isAdult() {
        (0, tsd_1.expectType)(this.isAdult);
        return true;
    };
    var User2 = (0, mongoose_1.model)('User2', schema2);
    var user2 = new User2({ firstName: 'John', lastName: 'Doe', age: 20 });
    user2.fullName();
    user2.isAdult();
    // Skip InstanceMethods
    var schema3 = new mongoose_1.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true }
    }, {
        methods: {
            fullName: function () {
                // Expect methods to still have access to `this` type
                (0, tsd_1.expectType)(this.firstName);
                // As InstanceMethods type is not specified, expect type of this.fullName to be undefined
                (0, tsd_1.expectError)(this.fullName);
                return this.firstName + ' ' + this.lastName;
            }
        }
    });
    var User3 = (0, mongoose_1.model)('User2', schema3);
    var user3 = new User3({ firstName: 'John', lastName: 'Doe', age: 20 });
    (0, tsd_1.expectError)(user3.fullName());
}
function gh14028_statics() {
    // Define statics on schema
    var schema = new mongoose_1.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true }
    }, {
        statics: {
            createWithFullName: function (name) {
                (0, tsd_1.expectType)(schema.statics.createWithFullName);
                (0, tsd_1.expectType)(this.create);
                var _a = name.split(' '), firstName = _a[0], lastName = _a[1];
                return this.create({ firstName: firstName, lastName: lastName });
            }
        }
    });
    // Trigger type assertions inside statics
    schema.statics.createWithFullName('John Doe');
}
function gh13424() {
    var subDoc = {
        name: { type: String, required: true },
        controls: { type: String, required: true }
    };
    var testSchema = {
        question: { type: String, required: true },
        subDocArray: { type: [subDoc], required: true }
    };
    var TestModel = (0, mongoose_1.model)('TestModel', new mongoose_1.Schema(testSchema));
    var doc = new TestModel({});
    (0, tsd_1.expectType)(doc.subDocArray[0]._id);
}
function gh14147() {
    var affiliateSchema = new mongoose_1.Schema({
        balance: { type: BigInt, default: BigInt(0) }
    });
    var AffiliateModel = (0, mongoose_1.model)('Affiliate', affiliateSchema);
    var doc = new AffiliateModel();
    (0, tsd_1.expectType)(doc.balance);
}
function gh14235() {
    var userSchema = new mongoose_1.Schema({ name: String, age: Number });
    userSchema.omit(['age']);
}
function gh14496() {
    var schema = new mongoose_1.Schema({
        name: {
            type: String
        }
    });
    schema.path('name').validate({
        validator: function () {
            throw new Error('Oops!');
        },
        // `errors['name']` will be "Oops!"
        message: function (props) {
            (0, tsd_1.expectType)(props.reason);
            return 'test';
        }
    });
}
function gh14367() {
    var UserSchema = new mongoose_1.Schema({
        counts: [mongoose_1.Schema.Types.Number],
        roles: [mongoose_1.Schema.Types.String],
        dates: [mongoose_1.Schema.Types.Date],
        flags: [mongoose_1.Schema.Types.Boolean]
    });
    var x = {
        counts: [12],
        roles: ['test'],
        dates: [new Date('2016-06-01')],
        flags: [true]
    };
}
function gh14573() {
    var _a;
    var userSchema = new mongoose_1.Schema({
        names: new mongoose_1.Schema({ firstName: String })
    }, {
        methods: {
            getName: function () {
                var _a, _b;
                var str = (_a = this.names) === null || _a === void 0 ? void 0 : _a.firstName;
                return (_b = this.names) === null || _b === void 0 ? void 0 : _b.toObject();
            }
        }
    });
    var UserModel = (0, mongoose_1.model)('User', userSchema);
    var doc = new UserModel({ names: { _id: '0'.repeat(24), firstName: 'foo' } });
    (_a = doc.names) === null || _a === void 0 ? void 0 : _a.ownerDocument();
}
function gh13772() {
    var schemaDefinition = {
        name: String,
        docArr: [{ name: String }]
    };
    var schema = new mongoose_1.Schema(schemaDefinition);
    var TestModel = (0, mongoose_1.model)('User', schema);
    (0, tsd_1.expectAssignable)({});
    var doc = new TestModel();
    (0, tsd_1.expectAssignable)(doc.toObject());
    (0, tsd_1.expectAssignable)(doc.toJSON());
}
function gh14696() {
    var x = {
        validator: function (v) {
            (0, tsd_1.expectAssignable)(this);
            return !v || this.name === 'super admin';
        }
    };
    var userSchema = new mongoose_1.Schema({
        name: {
            type: String,
            required: [true, 'Name on card is required']
        },
        isActive: {
            type: Boolean,
            default: false,
            validate: {
                validator: function (v) {
                    (0, tsd_1.expectAssignable)(this);
                    return !v || this.name === 'super admin';
                }
            }
        },
        isActiveAsync: {
            type: Boolean,
            default: false,
            validate: {
                validator: function (v) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            (0, tsd_1.expectAssignable)(this);
                            return [2 /*return*/, !v || this.name === 'super admin'];
                        });
                    });
                }
            }
        }
    });
}
function gh14748() {
    var nestedSchema = new mongoose_1.Schema({ name: String });
    var schema = new mongoose_1.Schema({
        arr: [nestedSchema],
        singleNested: nestedSchema
    });
    var subdoc = schema.path('singleNested')
        .cast({ name: 'bar' });
    (0, tsd_1.expectAssignable)(subdoc);
    var subdoc2 = schema.path('singleNested').cast({ name: 'bar' });
    (0, tsd_1.expectAssignable)(subdoc2);
    var subdoc3 = schema.path('singleNested').cast({ name: 'bar' });
    (0, tsd_1.expectAssignable)(subdoc3);
}
function gh13215() {
    var schemaDefinition = {
        userName: { type: String, required: true }
    };
    var schemaOptions = {
        typeKey: 'type',
        timestamps: {
            createdAt: 'date',
            updatedAt: false
        }
    };
    (0, tsd_1.expectType)({});
    var schema = new mongoose_1.Schema(schemaDefinition, schemaOptions);
    (0, tsd_1.expectType)({});
}
function gh14825() {
    var schemaDefinition = {
        userName: { type: String, required: true }
    };
    var schemaOptions = {
        typeKey: 'type',
        timestamps: {
            createdAt: 'date',
            updatedAt: false
        }
    };
    (0, tsd_1.expectAssignable)({});
    var schema = new mongoose_1.Schema(schemaDefinition, schemaOptions);
    (0, tsd_1.expectAssignable)({});
}
function gh8389() {
    var schema = new mongoose_1.Schema({ name: String, tags: [String] });
    (0, tsd_1.expectAssignable)(schema.path('name').getEmbeddedSchemaType());
    (0, tsd_1.expectAssignable)(schema.path('tags').getEmbeddedSchemaType());
}
function gh14879() {
    mongoose_1.Schema.Types.String.setters.push(function (val) { return typeof val === 'string' ? val.trim() : val; });
}
function gh14950() {
    return __awaiter(this, void 0, void 0, function () {
        var SightingSchema, TestModel, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    SightingSchema = new mongoose_1.Schema({
                        _id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
                        location: {
                            type: { type: String, required: true },
                            coordinates: [{ type: Number }]
                        }
                    });
                    TestModel = (0, mongoose_1.model)('Test', SightingSchema);
                    return [4 /*yield*/, TestModel.findOne().orFail()];
                case 1:
                    doc = _a.sent();
                    (0, tsd_1.expectType)(doc.location.type);
                    (0, tsd_1.expectType)(doc.location.coordinates);
                    return [2 /*return*/];
            }
        });
    });
}
function gh14902() {
    return __awaiter(this, void 0, void 0, function () {
        var exampleSchema, Test, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exampleSchema = new mongoose_1.Schema({
                        image: { type: Buffer },
                        subdoc: {
                            type: new mongoose_1.Schema({
                                testBuf: Buffer
                            })
                        }
                    });
                    Test = (0, mongoose_1.model)('Test', exampleSchema);
                    return [4 /*yield*/, Test.findOne().lean().orFail()];
                case 1:
                    doc = _a.sent();
                    (0, tsd_1.expectType)(doc.image);
                    (0, tsd_1.expectType)(doc.subdoc.testBuf);
                    return [2 /*return*/];
            }
        });
    });
}
function gh14451() {
    return __awaiter(this, void 0, void 0, function () {
        var exampleSchema, Test;
        return __generator(this, function (_a) {
            exampleSchema = new mongoose_1.Schema({
                myId: { type: 'ObjectId' },
                myRequiredId: { type: 'ObjectId', required: true },
                myBuf: { type: Buffer, required: true },
                subdoc: {
                    type: new mongoose_1.Schema({
                        subdocProp: Date
                    })
                },
                docArr: [{ nums: [Number], times: [{ type: Date }] }],
                myMap: {
                    type: Map,
                    of: String
                }
            });
            Test = (0, mongoose_1.model)('Test', exampleSchema);
            (0, tsd_1.expectType)({});
            return [2 /*return*/];
        });
    });
}
function gh12959() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, TestModel, doc, leanDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({ name: String });
                    TestModel = (0, mongoose_1.model)('Test', schema);
                    return [4 /*yield*/, TestModel.findOne().orFail()];
                case 1:
                    doc = _a.sent();
                    (0, tsd_1.expectType)(doc.__v);
                    return [4 /*yield*/, TestModel.findOne().lean().orFail()];
                case 2:
                    leanDoc = _a.sent();
                    (0, tsd_1.expectType)(leanDoc.__v);
                    return [2 /*return*/];
            }
        });
    });
}
function gh15236() {
    return __awaiter(this, void 0, void 0, function () {
        var schema;
        return __generator(this, function (_a) {
            schema = new mongoose_1.Schema({
                myNum: { type: Number }
            });
            schema.path('myNum').min(0);
            return [2 /*return*/];
        });
    });
}
function gh15244() {
    var schema = new mongoose_1.Schema({});
    schema.discriminator('Name', new mongoose_1.Schema({}), { value: 'value' });
}
function schemaDouble() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, TestModel, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = new mongoose_1.Schema({ balance: 'Double' });
                    TestModel = (0, mongoose_1.model)('Test', schema);
                    return [4 /*yield*/, TestModel.findOne().orFail()];
                case 1:
                    doc = _a.sent();
                    (0, tsd_1.expectType)(doc.balance);
                    return [2 /*return*/];
            }
        });
    });
}
function gh15301() {
    var userSchema = new mongoose_1.Schema({
        time: {
            type: new mongoose_1.Schema({
                hours: { type: Number, required: true },
                minutes: { type: Number, required: true }
            }, { _id: false }),
            required: true
        }
    });
    var timeStringToObject = function (time) {
        if (typeof time !== 'string')
            return time;
        var _a = time.split(':'), hours = _a[0], minutes = _a[1];
        return { hours: parseInt(hours), minutes: parseInt(minutes) };
    };
    userSchema.pre('init', function (rawDoc) {
        (0, tsd_1.expectType)(rawDoc);
        if (typeof rawDoc.time === 'string') {
            rawDoc.time = timeStringToObject(rawDoc.time);
        }
    });
}
function gh15412() {
    var ScheduleEntrySchema = new mongoose_1.Schema({
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: false }
    });
    var ScheduleEntry = (0, mongoose_1.model)('ScheduleEntry', ScheduleEntrySchema);
    ScheduleEntrySchema.post('init', function (_res, next) {
        (0, tsd_1.expectType)(this.startDate);
        (0, tsd_1.expectType)(this.endDate);
        next();
    });
}
function defaultReturnsUndefined() {
    var schema = new mongoose_1.Schema({
        arr: {
            type: [Number],
            default: function () { return void 0; }
        }
    });
}
function gh15479() {
    var TestSchema = new mongoose_1.Schema({
        name: String,
        testField: {
            type: String,
            required: true,
            default: 'blah'
        }
    });
    function transform(doc, ret) {
        var testField = ret.testField, val = __rest(ret, ["testField"]);
        return val;
    }
    TestSchema.set('toJSON', { transform: transform });
    var TestModel = (0, mongoose_1.model)('Test', TestSchema);
    var doc = new TestModel();
    getTestField(doc.toJSON());
    (0, tsd_1.expectError)(getTestField(doc.toJSON()));
    function getTestField(obj) {
        return obj.testField;
    }
}
function gh15516() {
    var schema = new mongoose_1.Schema({
        name: String
    });
    schema.virtual('myVirtual').get(function () {
        (0, tsd_1.expectType)(this);
    });
}
function gh15536() {
    var UserModelNameRequiredCustom = (0, mongoose_1.model)('User', new mongoose_1.Schema({
        name: { type: String, required: 'This is a custom error message' }
    }));
    var user3 = new UserModelNameRequiredCustom({ name: null });
    (0, tsd_1.expectType)(user3.name);
}
