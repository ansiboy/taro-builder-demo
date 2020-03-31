"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const empty_1 = require("../../controls/empty");
class UserFavorPage extends taro_1.Component {
    constructor() {
        super(...arguments);
        this.config = {
            navigationBarTitleText: '我的收藏'
        };
    }
    render() {
        return <components_1.View className="page">
            <empty_1.Empty icon="heart" text="你还没有添加收藏哦"/>
        </components_1.View>;
    }
}
exports.default = UserFavorPage;
//# sourceMappingURL=favor.jsx.map