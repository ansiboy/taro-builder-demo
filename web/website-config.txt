import { WebsiteConfig } from "maishu-chitu-admin";

export type MyWebsiteConfig = {
    contextName: string;
};


let node_modules = "node_modules";
let websiteConfig: MyWebsiteConfig & WebsiteConfig = {
    contextName: "taro-builder-demo",
    requirejs: {
        paths: {
            "maishu-jueying": "node_modules/maishu-jueying/dist/index",
            "maishu-jueying-core": "node_modules/maishu-jueying-core/dist/index",
            "jquery-ui": "lib/jquery-ui-1.12.1/jquery-ui",
            "devices": "lib/devices.css-1.2/assets/devices.min.css",
            "taro-bundle": "lib/taro-bundle",
            "taro-ui": "lib/taro-ui",
            "tslib": "node_modules/tslib/tslib",
            "maishu-chitu-admin/static": "node_modules/maishu-chitu-admin/static",
            "htmlparser2": "node_modules/htmlparser2/",
            "taro-builder/static": "node_modules/taro-builder/dist/static",
            "react": `${node_modules}/react/umd/react.development`,
            "react-dom": `${node_modules}/react-dom/umd/react-dom.development`,
        }
    },
    menuItems: [
        {
            id: "AE3789A2-0CF0-4D81-A7C0-E2C9324A1DDD", name: "页面列表", path: "#page-list",
            children: [
                { id: "3CE34AB9-7814-4FE5-85E2-ABA6AAF9C1FD", name: "页面编辑", path: "#page-edit", hidden: true },
            ]
        },
        { id: "E5E34904-62D1-4694-9CAC-152D4F83F32E", name: "页面浏览", path: "#page-view", }

    ]
}

export default websiteConfig;