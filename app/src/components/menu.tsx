import React from "react";
import { component } from "taro-builder-core";
import "./menu.scss";
import { View } from "@tarojs/components";
import "taro-ui/dist/style/components/icon.scss";
import { defaultProps } from "./default-props";
import Taro from "@tarojs/taro";

export interface MenuNode {
    name: string,
    url: string,
    sortNumber?: number,
    icon?: string,
    children?: MenuNode[]
}

export interface Props {
    items: MenuNode[],
    showMenuIcon: boolean,
}

@component({ displayName: "菜单", icon: "icon-text-width", introduce: "页面底部导航菜单", group: "navigation" })
export class Menu extends React.Component {
    static defaultProps: Props = defaultProps.menu;
    render() {
        return <View className="menu">
            <View className="item" style={{ width: "25%" }}
                onClick={() => {
                    Taro.redirectTo({ url: "temp1", });
                }}>
                <View className='at-icon at-icon-home'></View>
                <View className="text">首页</View>
            </View>
            <View className="item" style={{ width: "25%" }}
                onClick={() => {
                    Taro.redirectTo({ url: "temp2" });
                }}>
                {/* <div><i className="icon-user"></i>我</div> */}
                <View className='at-icon at-icon-shopping-cart'></View>
                <View className="text">购物车</View>
            </View>
            <View className="item" style={{ width: "25%" }}>
                {/* <div><i className="icon-home"></i></div> */}
                <View className='at-icon at-icon-list'></View>
                <View className="text">资讯</View>
            </View>
            <View className="item" style={{ width: "25%" }}>
                {/* <div><i className="icon-user"></i>我</div> */}
                <View className='at-icon at-icon-user'></View>
                <View className="text">我</View>
            </View>
        </View>
    }
}