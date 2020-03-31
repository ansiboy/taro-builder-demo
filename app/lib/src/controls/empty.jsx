"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
const config_1 = require("../config");
require("./empty.less");
class Empty extends taro_1.Component {
    render() {
        return <components_1.View className="empty" onClick={this.props.onClick}>
            <components_1.View className="icon">
                <taro_ui_1.AtIcon value={this.props.icon} size={config_1.style.emptyIconSize}/>
            </components_1.View>
            <components_1.View className="text">
                {this.props.text}
            </components_1.View>
        </components_1.View>;
    }
}
exports.Empty = Empty;
//# sourceMappingURL=empty.jsx.map