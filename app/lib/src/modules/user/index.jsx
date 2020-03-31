"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
require("./index.less");
const config_1 = require("../../config");
const IconSize = 52;
class IndexPage extends taro_1.default.Component {
    constructor(props) {
        super(props);
        this.config = {
            navigationBarTitleText: '用户中心',
        };
    }
    render() {
        return <components_1.View>
            <components_1.View className="user-info">
                <components_1.View className="at-row at-row__justify--center">
                    <taro_ui_1.AtAvatar className="header-image" size="large" circle image=""></taro_ui_1.AtAvatar>
                </components_1.View>
                <components_1.View className="text">未填写</components_1.View>
                <components_1.View className="blance">
                    <components_1.Text>余额</components_1.Text>
                    <components_1.Text className="price">￥0.00</components_1.Text>
                </components_1.View>
            </components_1.View>
            <components_1.View className="at-row">
                <components_1.View className="at-col" onClick={() => taro_1.default.navigateTo({ url: `${config_1.pages.orderList}?tab=all`, })}>
                    <taro_ui_1.AtIcon className="icon" value="bullet-list" size={IconSize}/>
                    <components_1.View className="text">全部订单</components_1.View>
                </components_1.View>
                <components_1.View className="at-col" onClick={() => taro_1.default.navigateTo({ url: `${config_1.pages.orderList}?tab=toPaid`, })}>
                    <taro_ui_1.AtIcon className="icon" value="credit-card" size={IconSize}/>
                    <components_1.View className="text">待付款</components_1.View>
                </components_1.View>
                <components_1.View className="at-col" onClick={() => taro_1.default.navigateTo({ url: `${config_1.pages.orderList}?tab=toReceive`, })}>
                    <taro_ui_1.AtIcon className="icon" value="folder" size={IconSize}/>
                    <components_1.View className="text">待收货</components_1.View>
                </components_1.View>
                <components_1.View className="at-col" onClick={() => taro_1.default.navigateTo({ url: `${config_1.pages.orderList}?tab=toEvaluate`, })}>
                    <taro_ui_1.AtIcon className="icon" value="star" size={IconSize}/>
                    <components_1.View className="text">待评价</components_1.View>
                </components_1.View>
            </components_1.View>
            <components_1.View className="list-group">
                <taro_ui_1.AtList>
                    <taro_ui_1.AtListItem className="list-group-item" title='收货地址' arrow='right' onClick={() => {
            taro_1.default.navigateTo({ url: config_1.pages.receiptList });
        }}/>
                    <taro_ui_1.AtListItem className="list-group-item" title='我的收藏' arrow='right' onClick={() => taro_1.default.navigateTo({ url: "./favor" })}/>
                    <taro_ui_1.AtListItem className="list-group-item" title='我的优惠券' arrow='right' hasBorder={false} onClick={() => taro_1.default.navigateTo({ url: "./coupon" })}/>
                </taro_ui_1.AtList>
            </components_1.View>

            <components_1.View className="list-group">
                <taro_ui_1.AtList>
                    <taro_ui_1.AtListItem className="list-group-item" title='销售员中心' arrow='right' hasBorder={false} onClick={() => taro_1.default.navigateTo({ url: config_1.pages.salesCenter })}/>
                </taro_ui_1.AtList>
            </components_1.View>

            <components_1.View className="list-group">
                <taro_ui_1.AtList>
                    <taro_ui_1.AtListItem className="list-group-item" title='账号安全' arrow='right' onClick={() => taro_1.default.navigateTo({ url: config_1.pages.accountSecurity })}/>
                    <taro_ui_1.AtListItem className="list-group-item" title='退出' arrow='right' hasBorder={false}/>
                </taro_ui_1.AtList>
            </components_1.View>
        </components_1.View>;
    }
}
exports.default = IndexPage;
//# sourceMappingURL=index.jsx.map