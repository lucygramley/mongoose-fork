"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({ name: { type: 'String' } });
var Base = (0, mongoose_1.model)('Test', schema);
var Disc = Base.discriminator('Test2', new mongoose_1.Schema({ email: { type: String } }));
var doc = new Disc({ name: 'foo', email: 'hi' });
doc.name = 'bar';
doc.email = 'hello';
var Disc2 = Base.discriminator('Disc2', new mongoose_1.Schema({ email: { type: String } }), { value: 'test', mergeHooks: false, mergePlugins: false });
function test() {
    var CardType;
    (function (CardType) {
        CardType["Artifact"] = "artifact";
        CardType["Creature"] = "creature";
        CardType["Enchantment"] = "enchantment";
        CardType["Land"] = "land";
    })(CardType || (CardType = {}));
    var cardDbBaseSchemaDefinition = {
        type: { type: String, required: true }
    };
    var cardDbSchemaOptions = { discriminatorKey: 'type' };
    var cardDbSchema = new mongoose_1.Schema(cardDbBaseSchemaDefinition, cardDbSchemaOptions);
    var cardDbModel = mongoose_1.default.model('Card', cardDbSchema, 'card');
    var landDbAdditionalPropertiesSchemaDefinition = {};
    var landDbSchema = new mongoose_1.Schema(landDbAdditionalPropertiesSchemaDefinition);
    var landDbModel = cardDbModel.discriminator('Land', landDbSchema, CardType.Land);
    var sampleLandDb = new landDbModel({
        type: CardType.Land
    });
    var sampleCardDb = sampleLandDb;
}
