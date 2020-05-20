import React from "react";
import { component } from "taro-builder-core";
import { Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

export interface Props {
    /** 图片地址 */
    source: string
    /** 
     * 跳转链接，多个链接对应图片上不同的点击区域，为空则不点击跳转
     * 比如说：
     * 1. 两个链接，第一个链接对应图片上第一个 50% 区域，第二个链接对应图片上第二个 50% 区域
     * 2. 三个链接，第一个链接对应图片上第一个 33.3% 区域，第二个链接对应图片上第二个 33.3% 区域，
     * 依此类推
     */
    targetPages?: { name: string, id?: string, url?: string }[]
}

@component({ displayName: "图片", icon: "icon-picture", introduce: "页面上的图片，可设置跳转链接" })
export default class Picture extends React.Component<Props> {

    static defaultProps: Partial<Props> = {
        targetPages: [

        ]
    }

    onClick(e: { x: number, y: number }) {
        let targetPages = this.props.targetPages;
        if (targetPages == null || targetPages.length == 0)
            return;

        Taro.getSystemInfo().then(r => {
            console.log(r.windowWidth);
            let n = targetPages.length;
            let index = Math.floor(e.x * n / r.windowWidth);
            let page = targetPages[index];
            Taro.navigateTo({ url: page.url });
        })
    }
    render() {
        return <Image src={this.props.source || ""} onClick={e => this.onClick(e.detail)} style={{ width: "100%" }} />
    }
}