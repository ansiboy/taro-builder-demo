"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const index_1 = require("./modules/index");
require("./app.less");
require("../node_modules/taro-ui/dist/style/index.scss");
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
class App extends taro_1.Component {
    constructor() {
        super(...arguments);
        /**
         * 指定config的类型声明为: Taro.Config
         *
         * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
         * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
         * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
         */
        this.config = {
            pages: [
                "modules/temp",
                "modules/user/receipt-list",
                "modules/user/receipt-edit",
                "modules/shopping/product-list",
                "modules/account-security/index",
                "modules/account-security/login-password",
                "modules/account-security/mobile-binding",
                "modules/account-security/pay-password",
                "modules/sales-center/index",
                "modules/shopping/order-list",
                "modules/user/coupon",
                "modules/user/favor",
                "modules/user/index",
                "modules/user/receipt-edit",
                "modules/user/receipt-list",
                "modules/index",
            ],
            window: {
                backgroundTextStyle: 'light',
                navigationBarBackgroundColor: '#fff',
                navigationBarTitleText: 'WeChat',
                navigationBarTextStyle: 'black'
            }
        };
    }
    componentDidMount() { }
    componentDidShow() { }
    componentDidHide() { }
    componentDidCatchError() { }
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (<index_1.default />);
    }
}
taro_1.default.render(<App />, document.getElementById('app'));
//# sourceMappingURL=app.jsx.map