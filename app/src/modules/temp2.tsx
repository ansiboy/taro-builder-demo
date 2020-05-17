import React, { Component } from "react"
import { ScrollView, View } from "@tarojs/components"
import { Menu } from "../components"

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

        return <View>
            
            <View className="footer">
                <Menu />
            </View>
        </View>
    }
}