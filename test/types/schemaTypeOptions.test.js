"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var mongoose_1 = require("mongoose");
var tsd_1 = require("tsd");
(new mongoose_1.SchemaTypeOptions()) instanceof mongoose_1.SchemaTypeOptions;
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
(0, tsd_1.expectType)(new mongoose_1.SchemaTypeOptions().type);
function index() {
    new mongoose_1.SchemaTypeOptions().index = true;
    new mongoose_1.SchemaTypeOptions().index = false;
    new mongoose_1.SchemaTypeOptions().index = 1;
    new mongoose_1.SchemaTypeOptions().index = -1;
    new mongoose_1.SchemaTypeOptions().index = 'text';
    new mongoose_1.SchemaTypeOptions().index = '2d';
    new mongoose_1.SchemaTypeOptions().index = 'geoHaystack';
    new mongoose_1.SchemaTypeOptions().index = 'hashed';
    new mongoose_1.SchemaTypeOptions().index = 'ascending';
    new mongoose_1.SchemaTypeOptions().index = 'asc';
    new mongoose_1.SchemaTypeOptions().index = 'descending';
    new mongoose_1.SchemaTypeOptions().index = 'desc';
    (0, tsd_1.expectError)(''); // test empty string value
    (0, tsd_1.expectError)('invalid'); // test invalid string value
    (0, tsd_1.expectError)(0); // test invalid number
    (0, tsd_1.expectError)(2); // test invalid number
    (0, tsd_1.expectError)(-2); // test invalid number
    (0, tsd_1.expectError)(new Date()); // test invalid type
}
function defaultOptions() {
    // property "defaultOptions" may not be defined on the base "SchemaType", but is explicitly defined on all mongoose provided Schema.Types
    // https://github.com/Automattic/mongoose/blob/5528a6428bb08091c03d868e249c2e5a30144a71/lib/schematype.js#L55
    (0, tsd_1.expectType)(new mongoose_1.SchemaType('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.String('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Boolean('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Array('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Buffer('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Date('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Decimal128('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Int32('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.DocumentArray('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Map('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Mixed('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Number('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.ObjectId('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Double('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.Subdocument('none').defaultOptions);
    (0, tsd_1.expectType)(new mongoose_1.Schema.Types.UUID('none').defaultOptions);
}
function encrypt() {
    var uuid = new mongodb_1.BSON.UUID();
    var binary = new mongodb_1.BSON.Binary();
    new mongoose_1.SchemaTypeOptions()['encrypt'] = { keyId: uuid, algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic' };
    new mongoose_1.SchemaTypeOptions()['encrypt'] = { keyId: uuid, algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random' };
    new mongoose_1.SchemaTypeOptions()['encrypt'] = { keyId: uuid, algorithm: undefined };
    new mongoose_1.SchemaTypeOptions()['encrypt'] = { keyId: [uuid], algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random' };
    // qe + valid queries
    new mongoose_1.SchemaTypeOptions()['encrypt'] = { keyId: uuid, queries: 'equality' };
    new mongoose_1.SchemaTypeOptions()['encrypt'] = { keyId: uuid, queries: 'range' };
    new mongoose_1.SchemaTypeOptions()['encrypt'] = { keyId: uuid, queries: undefined };
    // empty object
    (0, tsd_1.expectError)({});
    // invalid keyId
    (0, tsd_1.expectError)({ keyId: 'fakeId' });
    // missing keyId
    (0, tsd_1.expectError)({ queries: 'equality' });
    (0, tsd_1.expectError)({ algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic' });
    // invalid algorithm
    (0, tsd_1.expectError)({ keyId: uuid, algorithm: 'SHA_FAKE_ALG' });
    // invalid queries
    (0, tsd_1.expectError)({ keyId: uuid, queries: 'fakeQueryOption' });
    // invalid input option
    (0, tsd_1.expectError)({ keyId: uuid, invalidKey: 'fakeKeyOption' });
}
