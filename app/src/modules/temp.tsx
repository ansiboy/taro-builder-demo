import React from "react";
import "../components";
import { PageData, parseComponentData, Page } from "taro-builder-core";
import { View } from "@tarojs/components";
import { ShoppingCartBar } from "../components";
// import "taro-ui/dist/style/components/input-number.scss";
// import "taro-ui/dist/style/components/icon.scss";
// import "../components/store-info.scss";

let pageData: PageData = {
    "id": "f370d8b7-2c8e-f988-545c-e90de6eb576c",
    "type": "PageView",
    "props": {},
    "children": [
        {
            "id": "page-body",
            "type": "section",
            "props": {
                "id": "page-body",
                "visible": true
            },
            "parentId": "f370d8b7-2c8e-f988-545c-e90de6eb576c",
            "selected": false
        },
        {
            "id": "page-header",
            "type": "header",
            "props": {
                "id": "page-header",
                "height": 50,
                "visible": false
            },
            "parentId": "f370d8b7-2c8e-f988-545c-e90de6eb576c",
            "selected": false
        },
        {
            "id": "page-footer",
            "type": "footer",
            "props": {
                "id": "page-footer",
                "height": 50,
                "visible": true
            },
            "parentId": "f370d8b7-2c8e-f988-545c-e90de6eb576c",
            "selected": false
        },
        {
            "id": "8cde247e-39d0-b711-14a4-2b911391e584",
            "type": "Menu",
            "props": {},
            "parentId": "page-footer",
            "selected": false
        },
        {
            "id": "a0daa2bf-cd81-6294-3efa-51a4dbd01142",
            "type": "StoreInfo",
            "props": {},
            "parentId": "page-body",
            "selected": false
        },
        {
            "id": "286988f3-ff83-9f3b-e0d6-39853844157d",
            "type": "HtmlView",
            "props": {},
            "parentId": "page-body",
            "selected": false
        }
    ],
    "selected": false
};

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

        let elements = pageData.children.map(c => parseComponentData(c as any));
        console.log("HHH")
        // return <Page pageData={pageData} />
        return <ShoppingCartBar />
    }
}