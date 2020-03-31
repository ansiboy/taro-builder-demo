"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
const config_1 = require("../../config");
class AccountSecurityPage extends taro_1.default.Component {
    constructor() {
        super(...arguments);
        this.config = {
            navigationBarTitleText: "账户安全"
        };
    }
    render() {
        return <components_1.View>
            <taro_ui_1.AtList className="list-group">
                <taro_ui_1.AtListItem className="list-group-item" title="登录密码" arrow="right" note="设置登录密码，可以使用手机和密码登录" onClick={() => taro_1.default.navigateTo({ url: config_1.pages.loginPassword })}/>
                <taro_ui_1.AtListItem className="list-group-item" title="手机绑定" arrow="right" note="绑定手机后，你可以通过手机找回密码" onClick={() => taro_1.default.navigateTo({ url: config_1.pages.mobileBindding })}/>
                <taro_ui_1.AtListItem className="list-group-item" title="支付密码" arrow="right" note="设置支付密码后，使用余额支付需要密码" onClick={() => taro_1.default.navigateTo({ url: config_1.pages.payPassword })}/>
            </taro_ui_1.AtList>
        </components_1.View>;
    }
}
exports.default = AccountSecurityPage;
//# sourceMappingURL=index.jsx.map