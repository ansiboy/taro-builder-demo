import React from "react";
import { component } from "maishu-jueying-core";
import { View } from "@tarojs/components";

export interface HtmlViewProps {
    html: string
}

@component({ displayName: "HTML", icon: "icon-text-width", introduce: "用于显示 HTML" })
export class HtmlView extends React.Component<HtmlViewProps> {
    render() {
        return <View>
            HTML
        </View>
    }
}