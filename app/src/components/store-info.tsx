import React from "react";
import { View, Image } from "@tarojs/components";
import { component } from "taro-builder-core";
import "./store-info.scss";

interface Props {
    name?: string,
    logo?: string
}

let defaultLogo = "https://jdc.jd.com/img/200";
let defaultName = "请输入标题";

@component({ displayName: "店铺信息", icon: "icon-edit", introduce: "显示店铺基本信息", group: "common" })
export class StoreInfo extends React.Component<Props> {

    static defaultProps = { name: "", logo: "" }

    render() {
        let logo = this.props.logo || defaultLogo;
        let name = this.props.name || defaultName;

        return <View className="store-info">
            <View className="logo">
                <Image className="image" src={logo} />
            </View>
            <View className="main">
                <View className="name">{name}</View>
                <View className="info">
                    <View className="item">
                        <View>0</View>
                        <View>全部商品</View>
                    </View>
                    <View className="item">
                        <View>0</View>
                        <View>上新商品</View>
                    </View>
                    <View className="item">
                        <View>0</View>
                        <View>我的订单</View>
                    </View>
                </View>
            </View>
            <View style={{ clear: "both" }}>

            </View>
        </View>
    }
}