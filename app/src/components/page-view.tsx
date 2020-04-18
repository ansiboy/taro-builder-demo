import React from "react";
import { View } from "@tarojs/components";

export class PageView extends React.Component {
    render() {
        return <View>
            {this.props.children}
        </View>
    }
}