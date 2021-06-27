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
var dogs = [
    {
        name: 'Pat',
        breed: 'Bulldog'
    },
    {
        name: 'Boots',
        breed: 'Pomegranate'
    }
];
var forEach = function (data, cb) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        cb(item, i);
    }
};
var map = function (data, cb) {
    var newArr = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var updatedItem = cb(item, i);
        newArr.push(updatedItem);
    }
    return newArr;
};
var filter = function (data, cb) {
    var filteredArr = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (cb(item, i)) {
            filteredArr.push(item);
        }
    }
    return filteredArr;
};
forEach(dogs, function (dog) {
    console.log(dog);
});
var mappedDogs = map(dogs, function (dog) {
    return __assign(__assign({}, dog), { age: 13 });
});
console.log(mappedDogs);
var filteredDogs = filter(dogs, function (dog) {
    return dog.name === 'Boots';
});
console.log(filteredDogs);
