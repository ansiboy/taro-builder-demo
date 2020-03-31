import { View } from "@tarojs/components";
import { Empty } from "../../data-controls";
import React from "react";

export default class UserFavorPage extends React.Component {
    render() {
        return <View className="page">
            <Empty icon="heart" text="你还没有添加收藏哦" />
        </View>
    }
}