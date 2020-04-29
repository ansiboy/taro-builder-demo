import React from "react";
import { component } from "taro-builder-core";
import { RichText } from "@tarojs/components";

export interface HtmlViewProps {
    html: string
}


@component({ displayName: "HTML", icon: "icon-text-width", introduce: "用于显示 HTML" })
export class HtmlView extends React.Component<HtmlViewProps> {

    static defaultProps: HtmlViewProps = { html: "<div class='empty' style='text-align:center;'>请输入 HTML</div>" }

    render() {
        let html = this.props.html;
        return <RichText className="html-view" nodes={html}>

        </RichText>
    }
}