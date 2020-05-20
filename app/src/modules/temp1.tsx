import React, { Component } from "react"
import { Menu } from "../components"
import { View } from "@tarojs/components"
import Picture from "../components/picture"

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

        return <Picture source="https://shop6.bailunmei.com/image/image?id=8811e0c5-b929-1bf1-616a-8384212d2941_1024_768&width=200&height=200" />
    }
}