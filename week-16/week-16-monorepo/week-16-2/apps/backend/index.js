"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config_1 = require("@repo/common/config");
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.json({
        message: "hii from backend....",
    });
});
app.listen(3000, function () {
    console.log("app is runnign on 3000");
    console.log(config_1.VALUE);
});
