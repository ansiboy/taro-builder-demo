import * as taroBuilder from "taro-builder";
import path = require("path");
import fs = require("fs");

let componentsPhysicalPath = path.join(__dirname, "../app/out");
let settings: taroBuilder.Settings = {
    port: 5251,
    rootPhysicalPath: path.join(__dirname),
    appSourcePhysicalPath: componentsPhysicalPath,
    editorsPath: "component-editors/index",
    db: {
        host: "127.0.0.1",
        database: "taro-builder",
        user: "root",
        password: "111111",
        port: 3306,
        charset: "utf8"
    },
    virtualPaths: {
        // ue: path.join(__dirname, "static/lib/ueditor"),
        // "lib/ueditor": path.join(__dirname, "static/lib/ueditor")
        // "taro-builder": path.join(__dirname, "node_modules/taro-builder")
        // "lib/taro-ui/dist/style/components": path.join(__dirname, "node_modules/taro-ui/dist/style/components"),
    },
    websiteConfig: {
        requirejs: {
            paths: {
                // "taro-ui": path.join(__dirname, "node_modules/taro-ui")
                "fast-deep-equal": "node_modules/fast-deep-equal/index"
            }
        }
    }
}

if (fs.existsSync("config.js")) {
    Object.assign(settings, require("./config.js").default);
}
taroBuilder.start(settings)