import { PageFooterProps } from "taro-builder-core";
import React from "react";
import { Menu } from "./menu";
import { View } from "@tarojs/components";

// @component({ type: "footer" })
export class PageFooter extends React.Component<PageFooterProps> {
    static typeName = "footer";
    static className = "footer";
    static id = "page-footer";

    static defaultProps: PageFooterProps = { height: 50, visible: true, id: "page-footer" };

    render() {
        // let { height, visible } = this.props;
        return <View className="footer">
            <Menu />
        </View>
    }
}
