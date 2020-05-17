import "@tarojs/taro";
import { View, Swiper, SwiperItem } from "@tarojs/components";
import { component } from "taro-builder-core";
import React from "react";
import { Product, Category, ShoppingCartItem } from "../models/models";
import { defaultProps } from "./default-props";

export interface CarouselItem {
    image: string, url: string, title: string
}

export interface Props {
    autoplay: boolean,
    items: CarouselItem[],

    // 图片的长宽比
    itemScale?: number,

    // 点图片执行的动作，showImage 显示大图，openPage 打开页面
    clickType: 'showImage' | 'openPage'
}

export type Status = "loading" | "complete" | "empty";

export interface State {
    products: Product[],
    categories: Category[],
    shoppingCartItems: ShoppingCartItem[],
    status?: Status
}

@component({ displayName: "轮播", icon: "icon-list-alt", introduce: "多张图片轮流播放", group: "common" })
export class Carousel extends React.Component {

    static defaultProps: Props = defaultProps.carousel;

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