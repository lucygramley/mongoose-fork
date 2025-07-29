"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Repository = /** @class */ (function () {
    function Repository(MM) {
        this.M = MM;
    }
    Repository.prototype.findById = function (id) {
        return this.M.findById(id).orFail().exec();
    };
    return Repository;
}());
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
