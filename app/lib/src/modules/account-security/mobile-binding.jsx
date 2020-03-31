"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
class MobileBindingPage extends taro_1.default.Component {
    constructor() {
        super(...arguments);
        this.config = {
            navigationBarTitleText: "手机绑定"
        };
    }
    render() {
        return <components_1.View className="page">
            <taro_ui_1.AtForm className="container">
                <taro_ui_1.AtInput name="mobile" title="手机号码" placeholder="请输入手机号码" onChange={e => { }}/>
                <taro_ui_1.AtInput name="mobile" title="验证码" placeholder="请输入验证码" onChange={e => { }}>
                    <components_1.Text>发送验证码</components_1.Text>
                </taro_ui_1.AtInput>
                <taro_ui_1.AtButton type="primary">立即设置</taro_ui_1.AtButton>
            </taro_ui_1.AtForm>
        </components_1.View>;
    }
}
exports.default = MobileBindingPage;
//# sourceMappingURL=mobile-binding.jsx.map