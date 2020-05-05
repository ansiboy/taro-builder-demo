import "@tarojs/taro";
import { View, Swiper, SwiperItem } from "@tarojs/components";
import { component } from "taro-builder-core";
import React from "react";

@component({ displayName: "轮播", icon: "icon-list-alt", introduce: "多张图片轮流播放", group: "common" })
export class Carousel extends React.Component {
    render() {
        return <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            vertical={false}
            circular
            indicatorDots
            autoplay>
            <SwiperItem>
                <View className='demo-text-1'>1</View>
            </SwiperItem>
            <SwiperItem>
                <View className='demo-text-2'>2</View>
            </SwiperItem>
            <SwiperItem>
                <View className='demo-text-3'>3</View>
            </SwiperItem>
        </Swiper>
    }
}