"use strict";
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
exports.__esModule = true;
var houses_1 = require("./houses");
function findHouses(houses, filter) {
    var data = typeof houses === "string" ? JSON.parse(houses) : houses;
    return data.map(function (house, index) {
        return __assign(__assign({}, house), { id: index });
    }).filter(filter);
}
console.log(findHouses(JSON.stringify(houses_1.houses), function (_a) {
    var name = _a.name;
    return name === "Atreides";
}));
console.log(findHouses(houses_1.houses, function (_a) {
    var name = _a.name;
    return name === "Harkonnen";
}));
