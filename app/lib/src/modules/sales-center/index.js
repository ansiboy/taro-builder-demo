"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@tarojs/components");
class SalesCenterPage extends Taro.Component {
    constructor() {
        super(...arguments);
        this.config = {
            navigationBarTitleText: "销售员中心"
        };
    }
    render() {
        return React.createElement(components_1.View, { className: "page" });
    }
}
exports.default = SalesCenterPage;
//# sourceMappingURL=index.js.map