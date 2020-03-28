import * as taroBuilder from "taro-builder";
import path = require("path");
import fs = require("fs");
import websiteConfig from "./website-config";

let componentsPhysicalPath = path.join(__dirname, "../app/.temp");
let settings: taroBuilder.Settings = {
    port: 5251,
    rootPhysicalPath: path.join(__dirname),
    appSourcePhysicalPath: componentsPhysicalPath,
    db: {
        host: "127.0.0.1",
        database: "taro-builder",
        user: "root",
        password: "111111",
        port: 3306
    },
    websiteConfig
}

if (fs.existsSync("config.js")) {
    Object.assign(settings, require("./config.js").default);
}
debugger
taroBuilder.start(settings)