"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Taro = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const decorators_1 = require("maishu-jueying-core/decorators");
let Carousel = class Carousel extends Taro.Component {
    render() {
        return <components_1.Swiper className='test-h' indicatorColor='#999' indicatorActiveColor='#333' vertical circular indicatorDots autoplay>
            <components_1.SwiperItem>
                <components_1.View className='demo-text-1'>1</components_1.View>
            </components_1.SwiperItem>
            <components_1.SwiperItem>
                <components_1.View className='demo-text-2'>2</components_1.View>
            </components_1.SwiperItem>
            <components_1.SwiperItem>
                <components_1.View className='demo-text-3'>3</components_1.View>
            </components_1.SwiperItem>
        </components_1.Swiper>;
    }
};
Carousel = __decorate([
    decorators_1.component({ displayName: "轮播", icon: "icon-list-alt", introduce: "多张图片轮流播放" })
], Carousel);
exports.Carousel = Carousel;
//# sourceMappingURL=carousel.jsx.map