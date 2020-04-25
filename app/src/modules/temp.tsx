import { View, Button, } from "@tarojs/components";
import React from "react";
import ReactDOM from "react-dom";
import { SingleColumnProducts } from "../components/single-column-products";
import { CountInput } from "../components/count-input";
import { StoreInfo } from "../components";
// import "taro-ui/dist/style/components/input-number.scss";
// import "taro-ui/dist/style/components/icon.scss";

export default class PageView extends React.Component {
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
        const scrollStyle = {
            height: '150px'
        }
        const scrollTop = 0
        const Threshold = 20
        const vStyleA = {
            height: '150px',
            'background-color': 'rgb(26, 173, 25)'
        }
        const vStyleB = {
            height: '150px',
            'background-color': 'rgb(39,130,215)'
        }
        const vStyleC = {
            height: '150px',
            'background-color': 'rgb(241,241,241)',
            color: '#333'
        }
        return (
            <View>
                {React.createElement(StoreInfo)}
                <SingleColumnProducts />
            </View>
        )
    }
}