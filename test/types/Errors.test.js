"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/**
 * gh-issue #11367
 *
 * @see https://github.com/Automattic/mongoose/issues/11367
 */
function handleValidationError(err) {
    var errorTypes = Object.keys(err.errors).map(function (field) { return err.errors[field].kind; });
    return errorTypes;
}
/**
 * gh-issue #11838
 *
 * @see https://github.com/Automattic/mongoose/issues/11838
 */
function gh11838() {
    var Model = mongoose.model('Test', new mongoose.Schema({ answer: Number }));
    var doc = new Model({ answer: 'not a number' });
    var err = doc.validateSync();
    err instanceof mongoose.Error;
    err instanceof mongoose.MongooseError;
    err instanceof mongoose.Error.ValidationError;
}
