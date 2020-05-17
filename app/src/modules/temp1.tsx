import React, { Component } from "react"
import { Menu } from "../components"
import { View } from "@tarojs/components"

export default class PageView extends Component {
    constructor(props) {
        super(props)
    }

    onScrollToUpper() { }

    // or 使用箭头函数
    // onScrollToUpper = () => {}

    onScroll(e) {
        console.log(e.detail)
    }

    render() {

        return <>
            <View>Temp1</View>
            <View className="footer">
                <Menu />
            </View>
        </>
    }
}