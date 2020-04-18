import React from "react";
import { View, Text, Image } from "@tarojs/components";
import { component } from "maishu-jueying-core";
import { AtAvatar } from "taro-ui";
import "./store-info.scss";

interface Props {
    name?: string,
    logo?: string
}

@component({ displayName: "店铺信息", icon: "icon-list", introduce: "显示店铺基本商品" })
export class StoreInfo extends React.Component<Props> {
    render() {
        return <View className="store-info">
            <View className="logo">
                {/* <AtAvatar image='https://jdc.jd.com/img/200' size="large"></AtAvatar> */}
                <Image className="image" src="http://shop6.bailunmei.com/image/image?id=b589cfcf-3a94-a422-8ea1-ff2bb0af029e_1024_768&width=100&height=100" />
            </View>
            <View className="main">
                <View className="name">蓝微手淘</View>
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